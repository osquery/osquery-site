export default text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with a dash
    .replace(/[^\w-]+/g, '') // remove all non-word characters
    .replace(/--+/g, '-') // replace multiple dashes with a single dash
    .replace(/^-+/, '') // remove any starting dashes
    .replace(/-+$/, '') // remove any ending dashes
}
