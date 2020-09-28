import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const TagLink = styled.a`
  display: inline-block;
  background: #2cc5bd;
  border-radius: 6px;
  border: none;
  color: #fff;
  min-width: 96px;
  min-height: 18px;
  line-height: 18px;
  font-size: 11px;
  text-align: center;
  padding: 2px 6px 1px;
  text-decoration: none;
  transition: all 80ms ease-out;
  &:hover {
    color: #222;
    text-decoration: none;
  }
  &:focus {
    color: #222;
  }
`;
const TagNavLink = TagLink.withComponent(NavLink);

export default TagLink;
export { TagLink, TagNavLink };
