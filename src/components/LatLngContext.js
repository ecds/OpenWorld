// import { Alert } from 'bootstrap';

const LatLngContext = (latlng, popup) => {
  console.log("🚀 ~ file: LatLngContext.js ~ line 4 ~ LatLngContext ~ event", popup)
  const { lat, lng } = latlng;
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary');
  button.addEventListener('click', () => toClipBoard(`${lat}, ${lng}`, popup));
  button.innerText = `${lat}, ${lng}`;
  button.setAttribute('type', 'button');
  button.setAttribute('title', 'Click to copy coordinates to your clipboard.');
  return button
}

const alertDiv = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert', 'alert-success', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x');
  alertContainer.style.zIndex = 999999;
  alertContainer.innerText = 'Coordinates copied to clipboard!';
  // return new Alert(alertContainer);
  return alertContainer;
}

const toClipBoard = async (str, popup) => {
  popup.close();
  await navigator.clipboard.writeText(str);
  const clipboardAlert = alertDiv();
  document.getElementById('root').append(clipboardAlert);
  await new Promise(resolve => setTimeout(resolve, 3000));
  clipboardAlert.remove();
  // clipboardAlert.dispose();
  // console.log("🚀 ~ file: LatLngContext.js ~ line 22 ~ toClipBoard ~ clipboardAlert", clipboardAlert)
}

export default LatLngContext;
