import { useRouteError } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Alert
      variant="danger"
      className="text-center"
      id="error-page"
      dismissible
      onClose={() => window.location = "/"}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Alert>
  );
}