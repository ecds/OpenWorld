# Notes

## From GeoJSON to OSM/OHM

### City Annexations Example

Download files containing each annexation and all previous annexations:

~~~ruby
require 'json'
require 'open-uri'
require 'date'

# Method to fetch GeoJSON with features filtered by years.
def remote_url(date)
  "https://gis.atlantaga.gov/dpcd/rest/services/OpenDataService/FeatureServer/5/query?f=geojson&where=(EFF_DATE >= DATE '1840-01-01' AND EFF_DATE <= DATE '#{date}')&outFields=EFF_DATE"
end

# Fetch all annexations.
data = JSON.parse(
  URI.open(
    'https://gis.atlantaga.gov/dpcd/rest/services/OpenDataService/FeatureServer/5/query?outFields=EFF_DATE&where=1%3D1&f=geojson'
  ).read()
)

# Make a list of all the dates of annexations.
annex_dates = data['features'].map {|f| f['properties']['EFF_DATE']}.compact.uniq.sort.map do |stamp|
  Time.at(stamp/1000)
end

# Loop through the dates and fetch GeoJSON for each year and all previous years.
annex_dates.each_with_index do |annex_date, index|
  # Date to query. Add a day just to make sure it's inclusive.
  query_date = annex_date.to_date.next_day(1).strftime("%Y-%m-%d")
  # Format date for OHM.
  eff_date = annex_date.strftime("%Y-%m-%d")
  # Year for use in naming files.
  current_year = annex_date.strftime("%Y")
  # End date for annexation. Subtract one day so it does not overlap with the next.
  # Nil if it is the last/current boundary.
  next_annexation_eff_date = (index + 1) < annex_dates.count ? annex_dates[index + 1]to_date.prev_day(1).strftime("%Y-%m-%d") : nil
  next_annexation_year = (index + 1) < annex_dates.count ? annex_dates[index + 1].strftime("%Y") : nil

  # Get the data.
  features = JSON.parse(
    URI.open(
      remote_url(query_date)
    ).read()
  )

  # Skip if GeoJSON has no features.
  next if features['features'].nil?

  # Add OHM tags to the properties and save the file.
  File.open("annexations/#{eff_date}.geojson", 'w') do |geojson|
    features['features'].each do |feature|
      feature['properties']['admin_level'] = '8'
      feature['properties']['boundary'] = 'administrative'
      feature['properties']['end_date'] = next_annexation_eff_date
      feature['properties']['license'] = 'CC0-1.0'
      feature['properties']['name'] = "Atlanta (#{current_year}-#{next_annexation_year})"
      feature['properties']['source'] = 'https://dpcd-coaplangis.opendata.arcgis.com/datasets/bd6c8bc4ebfd4bbab43f3649a834fa21'
      feature['properties']['source:name'] = 'Annexations: Atlanta Planning Department'
      feature['properties']['start_date'] = eff_date
      feature['properties']['type'] = 'boundary'
      feature['properties']['wikidata'] = 'Q23556'
      feature['properties']['wikipedia'] = 'en:Atlanta'
      feature['properties'].delete('EFF_DATE')
    end
    geojson.write(features.to_json)
  end
end
~~~

Once you have all the files, each annexation is a separate shape. They need to be merged. This can be done using the QGIS Python console.

~~~python
from qgis import processing
import os

# Where I am storing files.
source_dir = '/Users/jay/annexations'
dest_dir = f'{source_dir}/dissolved'

# Take each GeoJSON file, merge/dissolve the features and keep the properties.
for file_name in os.listdir(source_dir):
    options = {
        'FIELD': [],
        'INPUT': f'{source_dir}/{file_name}',
        'OUTPUT': f'{dest_dir}/{file_name}'
    }
    if file_name.endswith('geojson'):
        processing.run('native:dissolve', options)
~~~

If some of the tag keys get messed up, fix them like so:

~~~ruby
require 'json'

Dir['annexations/dissolved/*']. each do |file_name|
  data = JSON.load(open(file_name))
  data['features'][0]['properties']['start_date'].gsub!(/\//, '-')
  data['features'][0]['properties']['end_date'].gsub!(/\//, '-')
  File.open(file_name, "w") {|fh| fh.puts data.to_json }
end
~~~

From the directory where you want to store the OSM files, use ogr2osm to convert the dissolved files.

~~~bash
for FILE in ../dissolved/*; do ogr2osm $FILE; done
~~~

The previous step can munge some of the tags. Fix them like so:

~~~ruby
require 'nokogiri'

Dir['annexations/osm/*']. each do |file_name|
  xml = open(file_name)
  doc = Nokogiri::XML(xml)
  start_d = doc.at_xpath('//*[@k="start_date"]/@v').value
  end_d = doc.at_xpath('//*[@k="end_date"]/@v').value
  source_name = doc.at_xpath('//*[@v="Annexations: Atlanta Planning Department"]/@k').value
  doc.at_xpath('//*[@k="start_date"]/@v').value = start_d.gsub!(/\//, '-')
  doc.at_xpath('//*[@k="end_date"]/@v').value = end_d.gsub!(/\//, '-')
  doc.at_xpath('//*[@v="Annexations: Atlanta Planning Department"]/@k').value = source_name.gsub!(/_/, ':')
  File.open(file_name, "w") {|fh| fh.puts doc.to_s }
end
~~~
