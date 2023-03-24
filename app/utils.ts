export const printProps = ((props) => {
  return Object.keys(props).map((prop) => {
    return `<p>${prop}: ${props[prop] ?? "nope"}</p>`;
  }).join('');
});

export const camelToTitle = (string) => {
  return string.replace(/([A-Z])/g, (match) => ` ${match}`)
               .replace(/^./, (match) => match.toUpperCase())
               .replace(/_/g, '')
               .trim();
}