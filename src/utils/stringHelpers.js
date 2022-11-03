export const camelToTitle = (string) => {
  return string.replace(/([A-Z])/g, (match) => ` ${match}`)
               .replace(/^./, (match) => match.toUpperCase())
               .replace(/_/g, '')
               .trim();
}