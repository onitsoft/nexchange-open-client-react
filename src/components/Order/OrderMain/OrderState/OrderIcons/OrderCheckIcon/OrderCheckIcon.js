import React from 'react';
import styles from './OrderCheckIcon.scss';

const OrderCheckIcon = () => {
  return (
    <div className={styles.icon}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 40 40"
        style={{ enableBackground: 'new 0 0 50 50' }}
      >
        <g>
          <g>
            <path
              d="M11.4,20.7c-0.1-0.1-0.2-0.3-0.2-0.5s0.1-0.3,0.2-0.5l0.9-0.9c0.3-0.3,0.7-0.3,0.9,0l0.1,0.1l3.7,4
          c0.1,0.1,0.3,0.1,0.5,0l9.1-9.4h0.1l0,0c0.3-0.3,0.7-0.3,1,0l0.9,0.9c0.3,0.3,0.3,0.7,0,1l0,0L17.8,26.6c-0.1,0.1-0.3,0.2-0.5,0.2
          c-0.2,0-0.3-0.1-0.5-0.2l-5.3-5.7C11.5,20.9,11.4,20.7,11.4,20.7z"
            />
          </g>
          <g>
            <path
              d="M20,40C9,40,0,31,0,20S9,0,20,0s20,9,20,20S31,40,20,40z M20,1.9C10,1.9,1.9,10,1.9,20S10,38.1,20,38.1
          S38.1,30,38.1,20S30,1.9,20,1.9z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default OrderCheckIcon;
