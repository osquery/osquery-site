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
  Windows: 'windows',
}

const NameSection = ({ packageName, type, url }) => {
  return (
    <div>
      <div className={`${baseClass}__name-wrapper`}>
        <Icon name={iconName[type]} />
        <span className={`${baseClass}__download-type`}>{type}</span>
      </div>

      <a className={`${baseClass}__package-name`} href={url}>
        {packageName}
      </a>
    </div>
  )
}

const DownloadCard = ({ className, downloadData, urlBase }) => {
  console.log('downloadData', downloadData)
  const wrapperClassName = classnames(baseClass, className)
  const url = `${urlBase}/${downloadData.platform}/${downloadData.package}`

  return (
    <GithubCard
      className={wrapperClassName}
      description={downloadData.content}
      name={<NameSection packageName={downloadData.package} type={downloadData.type} url={url} />}
      url={url}
      urlText={`Download for ${downloadData.type}`}
    />
  )
}

export default DownloadCard
