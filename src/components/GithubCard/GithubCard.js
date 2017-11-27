import React from 'react'
import { number, string } from 'prop-types'

import Button from 'components/Button'
import Card from 'components/Card'
import Icon from 'components/Icon'
import './GithubCard.css'

const baseClass = 'github-card'

const GithubCard = ({ description, name, starCount, url }) => {
  return (
    <Card.Wrapper>
      <Card.Header>
        <p className={`${baseClass}__name`}>{name}</p>
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
          View on GitHub
        </Button>
      </Card.Footer>
    </Card.Wrapper>
  )
}

GithubCard.propTypes = {
  description: string.isRequired,
  name: string.isRequired,
  starCount: number,
  url: string.isRequired,
}

export default GithubCard
