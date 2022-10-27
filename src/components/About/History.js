import React from 'react';
import Button from "react-bootstrap/Button";

const History = () => {
  return (
    <>
      <p>
        Urban Spatial History represents a consortium of international
        scholars and practitioners who seek to transform
        historical-geographical data and knowledge of urban
        settlements, including their development and morphology, into
        innovative and accessible digital resources. This website
        provides a venue for sharing the methodologies that transform
        archival maps, data, and research into visualizations,
        interfaces, and interpretive commentaries. The members of the
        Urban Spatial History consortia engage in each other's
        projects from consultation to production to sharing resources
        with the aim of producing platforms and data sets that are
        open-access and open-source.
      </p>
      <Button
        size="sm"
        className="owa-btn"
        href="https://www.urbanspatialhistory.org/"
      >
        Visit Site
      </Button>
    </>
  );
}

export default History;
