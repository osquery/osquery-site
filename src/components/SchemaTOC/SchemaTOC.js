import React, { Component } from 'react'
import { arrayOf, bool, func, shape, string } from 'prop-types'

import TOCEntry from './TOCEntry'
import './SchemaTOC.css'

const baseClass = 'schema-toc'

class SchemaTOC extends Component {
  static propTypes = {
    activeEntry: string,
    onEntryClick: func.isRequired,
    tables: arrayOf(
      shape({
        name: string,
        new: bool,
      })
    ).isRequired,
  }

  handleClick = tableName => {
    const { onEntryClick } = this.props
    return () => onEntryClick(tableName)
  }

  preventBodyScroll = () => document.body.classList.add('noscroll')
  allowBodyScroll = () => document.body.classList.remove('noscroll')

  componentDidMount() {
    this.toc.addEventListener('mouseenter', this.preventBodyScroll)
    this.toc.addEventListener('mouseleave', this.allowBodyScroll)
  }

  componentWillUnmount() {
    this.toc.removeEventListener('mouseenter', this.preventBodyScroll)
    this.toc.removeEventListener('mouseleave', this.allowBodyScroll)
  }

  render() {
    const { handleClick } = this
    const { activeEntry, tables } = this.props

    return (
      <ol className={baseClass} id={`${baseClass}__list`} ref={el => (this.toc = el)}>
        {tables &&
          tables.map((table, index) => {
            return (
              <TOCEntry
                active={activeEntry === table.name}
                index={index}
                key={table.name}
                onClick={handleClick(table.name)}
                table={table}
              >
                {table.name}
              </TOCEntry>
            )
          })}
      </ol>
    )
  }
}

export default SchemaTOC
