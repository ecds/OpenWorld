import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

const ToggleButton = ({ toggle, children }) => {
  const toggleRef = useRef();

  useEffect(() => {
    toggleRef.current?.focus();
  }, [toggleRef]);

  return (
    <Button
      ref={toggleRef}
      onClick={() => toggle(true)}
      className="position-absolute top-50 end-0 me-5 shadow-lg"
    >
      {children}
    </Button>
  );
};

export default ToggleButton;
