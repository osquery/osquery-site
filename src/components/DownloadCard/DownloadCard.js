import React from 'react'
import classnames from 'classnames'

import GithubCard from 'components/GithubCard'
import Icon from 'components/Icon'
import './DownloadCard.css'

const baseClass = 'download-card'
const iconName = {
  macOS: 'darwin',
  darwin: 'darwin',
  Linux: 'linux',
  linux: 'linux',
  RPM: 'centos',
  rpm: 'centos',
  Debian: 'ubuntu',
  deb: 'ubuntu',
  Windows: 'windows',
  windows: 'windows',
}

const NameSection = ({ packageName, type, url, platform }) => {
  return (
    <div>
      <div className={`${baseClass}__name-wrapper`}>
        <Icon name={iconName[platform]} />
        <span className={`${baseClass}__download-type`}>{type}</span>
      </div>

      <a className={`${baseClass}__package-name`} href={url}>
        {packageName}
      </a>
    </div>
  )
}

const DownloadCard = ({ className, downloadData, urlBase }) => {
  const wrapperClassName = classnames(baseClass, className)
  // FIXME: allow URL to be explit, which will make everything better
  const url = `${urlBase}/${downloadData.platform}/${downloadData.package}`

  return (
    <GithubCard
      className={wrapperClassName}
      description={downloadData.content}
      name={
        <NameSection
          packageName={downloadData.package}
          type={downloadData.type}
          url={url}
          platform={downloadData.platform}
        />
      }
      url={url}
      urlText={`Download for ${downloadData.type}`}
    />
  )
}

export default DownloadCard
