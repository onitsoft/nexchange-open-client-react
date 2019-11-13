import React, { Component } from 'react';
import Ellipse from './Ellipse';
import ellipseBg from './assets/ellipse.svg';
import ellipse2 from './assets/ellipse-2.svg';
import styled from '@emotion/styled';


class Ellipses extends Component {
  state = {
    loaded: false,
  };

  render() {
    return (
      <StyledEllipses className="Ellipses">
        <div className="Ellipses__bg">
          <img
            src={ellipseBg}
            alt="Ellipse bg"
            onLoad={() => {
              this.setState({ loaded: true });
            }}
          />

          {this.state.loaded && (
            <div>
              <Ellipse coin="ltc" style={{ left: 0, top: '20%', width: 120, height: 120 }} />
              <Ellipse coin="dash" style={{ left: -140, top: '45%', width: 85, height: 85 }} />
              <Ellipse coin="eos" style={{ left: 80, top: '50%', width: 64, height: 64 }} />
              <Ellipse coin="btc" style={{ left: -50, top: '70%', width: 183, height: 183 }} />
              <Ellipse coin="coss" style={{ right: -140, top: '25%', width: 90, height: 90 }} />
              <Ellipse coin="ltc" style={{ right: -50, top: '43%', width: 104, height: 104 }} />
              <Ellipse coin="eos" style={{ right: -160, top: '60%', width: 64, height: 64 }} />
              <Ellipse coin="eth" style={{ right: -280, top: '80%', width: 280, height: 280 }} />
            </div>
          )}
        </div>
      </StyledEllipses>
    );
  }
}

const StyledEllipses = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: -moz-linear-gradient(45deg, rgba(2, 3, 31, 1) 0%, rgba(2, 3, 31, 1) 44%, rgba(26, 157, 139, 1) 100%); /* ff3.6+ */
  background: -webkit-gradient(
    linear,
    left bottom,
    right top,
    color-stop(0%, rgba(2, 3, 31, 1)),
    color-stop(44%, rgba(2, 3, 31, 1)),
    color-stop(100%, rgba(26, 157, 139, 1))
  ); /* safari4+,chrome */
  background: -webkit-linear-gradient(
    45deg,
    rgba(2, 3, 31, 1) 0%,
    rgba(2, 3, 31, 1) 44%,
    rgba(26, 157, 139, 1) 100%
  ); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(45deg, rgba(2, 3, 31, 1) 0%, rgba(2, 3, 31, 1) 44%, rgba(26, 157, 139, 1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(45deg, rgba(2, 3, 31, 1) 0%, rgba(2, 3, 31, 1) 44%, rgba(26, 157, 139, 1) 100%); /* ie10+ */
  background: linear-gradient(45deg, rgba(2, 3, 31, 1) 0%, rgba(2, 3, 31, 1) 44%, rgba(26, 157, 139, 1) 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1A9D8B', endColorstr='#02031f',GradientType=1 ); /* ie6-9 */


  .Ellipses__bg {
    position: absolute;
    display: inline-block;
    width: auto;
    top: 80px;
    left: 0;
    right: 0;

    & > img, & > svg {
      width: auto;
      height: 120%;
      margin-top: -4%;
    }

  }

  .Ellipse {

    position: absolute;
    border-radius: 100%;
    z-index: 1;
    margin-top: -100%;

    &__inner {
      display: inline-block;
      position: relative;
      background-image: url('${ellipse2}');
      background-repeat: no-repeat;
      background-size: cover;

      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
      backface-visibility: hidden;

      -webkit-perspective: 1000;
      -moz-perspective: 1000;
      -ms-perspective: 1000;
      perspective: 1000;

      transition: all 11000ms linear;
    }

    img, svg {
      * {
        fill: #FFF;
      }
      width: 43%;
      height: 43%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }


`

export default Ellipses;
