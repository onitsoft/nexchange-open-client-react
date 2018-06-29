import React from 'react';
import { storiesOf } from '@storybook/react';
import TeamMember from '../components/Home/Team/TeamMember/TeamMember';
import '../css/index.scss';

storiesOf('Team', module)
  .addDecorator(story => (
    <div class="container">
      <div id="team-members" class="row">
        {story()}
      </div>
    </div>
  ))
  .add('member', () => (
    <TeamMember
      id="oleg"
      name="Oleg Belousov"
      country="IL"
      fullCountryName="Israel"
      description="Multidisciplinary coder. Aspiring innovator with a deep passion
    for open source and making the world better, step by step, every single day."
      social={{
        linkedin: 'https://www.linkedin.com/in/oleg-belousov-b4112145/',
        twitter: 'https://twitter.com/iooleg',
        medium: 'https://medium.com/@IoOleg',
        github: 'https://github.com/BeOleg',
      }}
    />
  ));
