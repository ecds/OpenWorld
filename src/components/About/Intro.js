import React from 'react';
import Container from 'react-bootstrap/Container';

const Intro = () => {
  return (
    <Container>
      <p>
        OpenWorld Atlanta seeks to provide public access to historical information through engaging 3D
        and dynamic interfaces to the wealth of data extracted by the Emory Center for Digital
        Scholarship (ECDS) from historic maps, city directories, and archival collections from 1920s
        Atlanta. Between 1870 and 1930, Atlanta went through many changes and experienced rapid
        growth due to the influences of new economic investments and the development of heavy rail
        and the electric streetcar which by the 1940s made way for the commuter automobile which
        transformed Atlanta into the sprawling landscape it is today.
      </p>
      <p>
        The project utilizes geodatabases of historical geographic features that are appended with
        information acquired from historical geocoders to create data rich and engaging interfaces for
        community and educational exploration. A team of interdisciplinary staff members, researchers,
        and graduate and undergraduate students work together to foster innovative methods and creative
        ideas to accomplish the dissemination of an existing body of work.
      </p>
    </Container>
  );
}

export default Intro;
