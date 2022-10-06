import React from 'react';
import { useParams } from 'react-router-dom';
import StoryMap from '../components/Layers/StoryMap/StoryMap';


const StoryMapRoute = (props) => {

  let { story } = useParams();

  return (
    <StoryMap storyMap={story} {...props} />
  )
}

export default StoryMapRoute;
