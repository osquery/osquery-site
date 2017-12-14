import React from 'react'
import classnames from 'classnames'
import { node, number, oneOfType, string } from 'prop-types'

import Button from 'components/Button'
import Card from 'components/Card'
import Icon from 'components/Icon'
import './GithubCard.css'

const baseClass = 'github-card'

const GithubCard = ({ className, description, name, starCount, url, urlText }) => {
  const wrapperClassName = classnames(baseClass, className)

  return (
    <Card.Wrapper className={wrapperClassName}>
      <Card.Header>
        <span className={`${baseClass}__name`}>{name}</span>
        {starCount && (
          <p className={`${baseClass}__star-count`}>
            <Icon name="star" /> {starCount}
          </p>
        )}
      </Card.Header>

      <Card.Body className={`${baseClass}__description`}>
        <span>{description}</span>
      </Card.Body>

      <Card.Footer className={`${baseClass}__footer`}>
        <Button className={`${baseClass}__button`} href={url}>
          {urlText}
        </Button>
      </Card.Footer>
    </Card.Wrapper>
  )
}

GithubCard.propTypes = {
  description: string,
  name: oneOfType([node, string]).isRequired,
  starCount: number,
  url: string,
  urlText: string,
}

GithubCard.defaultProps = {
  urlText: 'View on GitHub',
}

export default GithubCard
