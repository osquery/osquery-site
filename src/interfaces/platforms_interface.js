import { shape, bool } from 'prop-types'

export default shape({
  darwin: bool,
  freebsd: bool,
  linux: bool,
  windows: bool,
})
