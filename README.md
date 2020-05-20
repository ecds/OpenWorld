# OpenWorld Atlanta

One Paragraph of project description goes here

## Getting Started

Clone the repository onto your machine by running the following command

```
git clone https://github.com/ecds/OpenWorld.git openworld
```

### Prerequisites

You'll need Node v10.16.0 or later in order to run the app. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

### Installing

Once you've cloned the git repository, you'll need to `cd` into the directory you've cloned it into.

```
cd openworld
```

Then you'll need to install the dependencies.

```
npm install
```

This may take a few minutes. Once it is finished, you can start the development server with the following command.

```
npm start
```

## Adding a Layer to the Map

Layers are the core functionality of the OpenWorld platform, and this section details how to add them to the map.

### Data

The data should be formatted as GeoJSON in order to work with the layers that have already been developed and for sake of consistency.

### Adding to the Constants file

All of the controlling information of a layer is stored in the `constants/index.js` file in the array called `OVERLAYS`. These are the fields that should be populated:
- `desc`:   the description of the layer that appears under the label
- `attr`:   the source of the data represented in the layer
- `id`:     the unique identifier of the layer. Useful for redux actions
- `icon`:   the JSX tag of the icon to be used to represent the layer. Icons are imported at the top of the file, and more can be found at [react-icons](https://react-icons.github.io/react-icons/).
- `label`:  the title of the layer
- `type`:   determines which file will be called to construct the layer. The `switch` in the `ControlsContainer/index.js` file uses this field to call the layer constructor.
- `url`:    the location of the data.
- `options`: contains anything else that is useful or necessary to the layer, e.g. `popup_content` in the Utility Holes layer.

### If the layer needs to populate the Information tab

If interaction with the layer needs to update the information tab, a few things need to happen:
1. dispatch the `updateInfo` redux action, with a string 'type' as the first argument, and the data as the second.
2. edit the `InfoBox/index.js` file to handle the new type that you've just created. If the information should be handled like the `buildings` layer, all you need to do is add an entry to the `TAGS` object in the constants file.
3. if the interaction should make an API call, dispatch the `fetchResources` action with the string representation of the API endpoint as the argument. 

### If the layer type doesn't exist

If the types of layers currently developed aren't sufficient for the new layer you're developing, take these steps:
1. write all the relevant code to handle the layer in Leaflet
    - view one of the existing layers to see how the lifecycle is handled (e.g. initialization, etc.)
2. add type to the switch in `ControlsContainer/index.js` and return the component of the layer you've created in step 1. 

## Deployment

The files served by the development server are not optimized for a production build, and throw visible errors blocking the user's experience when something goes wrong. To get the optimized build files, run the following command.

```
npm run build
```

This will place all of the optimized files into the `build/` directory, which has subdirectories `static/media`, `static/js`, and `static/css`. On the ECDS server, `build/` is called `public/`, and all of its subdirectories are named as they are in the `build/` directory. 

Before uploading the new build files, make sure to delete the `precache-manifest.<hash>.js` file in the `public/` directory as well as all of the files in the subdirectories of `static/`, as these all have hashes unique to every subsequent build of the app that will clutter the server if left untouched.

## Built With

* [Create React App](https://github.com/facebook/create-react-app/) - Used to set up the react app without configuring a build.
* [Leaflet](https://leafletjs.com) - An open-source JavaScript library for mobile-friendly interactive maps


## Authors

* **Chris Wyllie** - *Initial work* - [crazicus](https://github.com/crazicus)

See also the list of [contributors](https://github.com/ecds/OpenWorld/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments


