import React from 'react'
import classnames from 'classnames'

import GithubCard from 'components/GithubCard'
import Icon from 'components/Icon'
import './DownloadCard.css'

const baseClass = 'download-card'
const iconName = {
  macOS: 'darwin',
  Linux: 'linux',
  RPM: 'centos',
  Debian: 'ubuntu',
}

const NameSection = ({ packageName, type }) => {
  return (
    <div>
      <div className={`${baseClass}__name-wrapper`}>
        <Icon name={iconName[type]} />
        <span className={`${baseClass}__download-type`}>{type}</span>
      </div>
      <span className={`${baseClass}__package-name`}>{packageName}</span>
    </div>
  )
}

const DownloadCard = ({ className, downloadData }) => {
  const wrapperClassName = classnames(baseClass, className)

  return (
    <GithubCard
      className={wrapperClassName}
      description={downloadData.content}
      name={<NameSection packageName={downloadData.package} type={downloadData.type} />}
      url={downloadData.url}
      urlText={`Download for ${downloadData.type}`}
    />
  )
}

export default DownloadCard
