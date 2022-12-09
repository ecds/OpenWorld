
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

interface Props {
  children: string;
  toggle(show: boolean): boolean;
  show: boolean;
}

const ToggleButton = ({ children, toggle, show }: Props) => {
  const toggleButtonRef = useRef<any>();

  useEffect(() => {
    if (show && toggleButtonRef.current) toggleButtonRef.current?.focus();
  });

  if (show) {
    return (
      <Button
        className="end-0 position-absolute top-50 mx-3 owa-detail-toggle"
        onClick={() => toggle(true)}
        tabIndex={0}
        ref={toggleButtonRef}
      >
        <FontAwesomeIcon icon={faCaretLeft} /> {children}
      </Button>
    )
  }
  return ( <></> )
}

export default ToggleButton;
