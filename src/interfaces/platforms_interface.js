import { shape, bool } from 'prop-types'

export default shape({
  darwin: bool,
  linux: bool,
  windows: bool,
})
