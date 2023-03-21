export const printProps = ((props) => {
  return Object.keys(props).map((prop) => {
    return `<p>${prop}: ${props[prop] ?? "nope"}</p>`;
  }).join('');
});