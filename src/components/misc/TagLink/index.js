import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const TagLink = styled.a`
  display: inline-block;
  background: #2cc5bd;
  border-radius: 6px;
  border: none;
  color: #fff;
  min-width: 96px;
  min-height: 18px;
  line-height: 18px;
  font-size: 10px;
  text-align: center;
  padding: 1px 6px 0;
  text-decoration: none;
  &:hover {
    color: #000;
    text-decoration: none;
  }
`
const TagNavLink = TagLink.withComponent(NavLink)


export default TagLink
export { TagLink, TagNavLink }
