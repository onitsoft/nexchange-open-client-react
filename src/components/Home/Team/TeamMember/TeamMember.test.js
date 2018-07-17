import React from 'react';
import { shallow } from 'enzyme';
import TeamMember from './TeamMember';

describe('TeamMember', () => {
  it('renders correctly', () => {
    const wrapShallow = shallow(
      <TeamMember
        id="vit"
        name="Vít Jedlička"
        description="President of the Free Republic of Liberland. Former Czech politician, publicist and activist."
        social={{
          linkedin: 'https://www.linkedin.com/in/vit-jedlicka-9115aa2/',
          rss: 'http://www.google.com',
          blog: 'https://www.linkedin.com/in/vit-jedlicka-9115aa2/',
        }}
      />
    );
    expect(wrapShallow).toMatchSnapshot();
  });
});
