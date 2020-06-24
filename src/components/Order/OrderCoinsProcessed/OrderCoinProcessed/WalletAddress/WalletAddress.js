import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-out;

  &.show {
    opacity: 1;
    pointer-events: all;
  }
`;

const Content = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  background: #ffffff;
  width: calc(100% - 2rem);
  padding: 4rem 2rem;

  @media (min-width: 769px) {
    width: 80%;
    padding: 4rem 8rem;
  }

  h3 {
    padding-bottom: 2rem;
    font-weight: 600;

    @media (min-width: 769px) {
      padding-bottom: 6rem;
    }
  }

  #withdrawal_address {
    width: 100%;
    border: 1px solid #e0e5ea;
    border-radius: 100px;
    height: 5rem;
    font-size: 1.5rem;
    padding: 0 2.5rem;
  }
`;

const PrevAddress = styled.div`
  color: #8a8e92;
  padding-top: 4rem;
  h4 {
    font-size: 1.6rem;
    font-weight: 600;
  }

  > div {
    margin-top: 2.5rem;
  }
`;

const SingleAddress = styled.div`
  padding: 0 0 1rem 0.5rem;
  color: #000000;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e5ea;
  cursor: pointer;
`;
const WalletAddress = ({ coin, showModal, hideModal }) => {
  const [walletAddress, setWalletAddress] = useState({});
  const [prevAddresses, setPrevAddresses] = useState([]);

  useEffect(() => {
    if (showModal) document.querySelector('#walletAddressModal').classList.add('show');
    else document.querySelector('#walletAddressModal').classList.remove('show');

    return () => {
      document.querySelector('#walletAddressModal').classList.remove('show');
    };
  }, [showModal]);

  useEffect(() => {
    document.querySelector('body').style.overflowY = 'hidden';
    const orderHistory = window.localStorage.orderHistory ? JSON.parse(window.localStorage.orderHistory) : null;

    if (orderHistory) {
      const addresses = [];

      orderHistory.forEach(({ base, withdraw_address }) => {
        if (base === coin) {
          if (!addresses.includes(withdraw_address)) addresses.push(withdraw_address);
        }
        setPrevAddresses(addresses);
      });
    }

    return () => {
      document.querySelector('body').overflowY = 'auto';
    };
  }, [coin]);

  const handleAddressChange = e => {
    setWalletAddress({ ...walletAddress, address: e.target.value });
  };

  const handleAddressClick = e => {
    const selectedAddress = e.target.getAttribute('data-addr');
    setWalletAddress({ ...walletAddress, address: selectedAddress });
  };

  return (
    <Container id="walletAddressModal">
      <Content>
        <h3>What is your wallet address?</h3>
        <div>
          <input
            type="text"
            id="withdrawal_address"
            value={walletAddress.address}
            placeholder={`Your ${coin} wallet address`}
            onChange={handleAddressChange}
          />
        </div>
        {prevAddresses.length > 0 ? (
          <PrevAddress>
            <h4>PREVIOUSLY USED ADDRESSES</h4>
            <div>
              {prevAddresses.map(address => (
                <SingleAddress key={address} data-addr={address} onClick={handleAddressClick}>
                  {address}
                </SingleAddress>
              ))}
            </div>
          </PrevAddress>
        ) : null}
        <button type="button" onClick={hideModal}>
          Close
        </button>
      </Content>
    </Container>
  );
};

export default WalletAddress;
