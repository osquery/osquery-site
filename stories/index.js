import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '../src/components/Icon';

storiesOf('Icon', module)
  .add('apple', () => (
    <Icon name="apple" />
  ))
  .add('centos', () => (
    <Icon name="centos" />
  ))
  .add('githubMark', () => (
    <Icon name="githubMark" />
  ))
  .add('linux', () => (
    <Icon name="linux" />
  ))
  .add('ubuntu', () => (
    <Icon name="ubuntu" />
  ))
  .add('windows', () => (
    <Icon name="windows" />
  ))
  .add('octocat', () => (
    <Icon name="octocat" />
  ))
  .add('slack', () => (
    <Icon name="slack" />
  ));
