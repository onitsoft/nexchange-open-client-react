import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import cx from 'classnames';
import { connect } from 'react-redux';

import config from 'Config';

const Container = styled.div`
  position: fixed;
  top: 0%;
  left: -100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  pointer-events: none;
  height: 100%;
  width: 100%;
  transition: left 0.5s ease-out;

  @media (min-width: 769px) {
    left: 0%;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &.show {
    left: 0;
    @media (min-width: 769px) {
      opacity: 1;
    }
    pointer-events: all;
  }
`;

const Content = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  height: 100%;
  width: 100%;
  padding: 4rem 2rem;

  @media (min-width: 769px) {
    height: auto;
    width: 100rem;
    padding: 4rem 8rem;
  }

  h3 {
    padding-bottom: 2rem;
    font-weight: 600;

    @media (min-width: 769px) {
      padding-bottom: 4rem;
    }
  }
`;

const AddressInput = styled.div`
  #withdrawal_address,
  #withdrawal_extra_id {
    input {
      width: 100%;
      border: 1px solid #e0e5ea;
      border-radius: 100px;
      height: 5rem;
      font-size: 1.5rem;
      padding: 0 2.5rem;
    }
  }

  /* TODO: Start here */
  .withdrawal_address_error {
    display: none;
  }

  /* if address is invalid */
  .address_invalid {
    .withdrawal_address_error {
      display: block;
      text-align: right;
      padding: 1rem 2rem;
    }
    input {
      border: 1px solid #d9534f !important;
    }
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
    max-height: 22rem;
    overflow-y: auto;
  }
`;

const SingleAddress = styled.div`
  padding: 0 0 0.5rem 0.5rem;
  color: #000000;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e0e5ea;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const Button = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column-reverse;

  #close_modal {
    padding: 1rem 0;
    border: none;
    background: none;
    margin-top: 2rem;

    @media (min-width: 769px) {
      visibility: hidden;
    }
  }

  #submit_address {
    color: #ffffff;
    background-color: #2cc5bd;
    padding: 1.2rem 3rem;
    border: none;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 600;
  }

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;

    #close_modal {
      margin-top: 0;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: none;
  background: none;
`;

const WalletAddress = ({ coin, modalState, setModalState, setAddress, coinsInfo, order, kyc }) => {
  const [walletAddress, setWalletAddress] = useState({});
  const [prevAddresses, setPrevAddresses] = useState([]);
  const [addressValid, setAddressValid] = useState();
  const [modalForced, setModalForced] = useState(false);
  const { unique_reference, withdraw_address, status_name, deposit_address } = order;
  const extraId = coinsInfo.find(e => e.code === coin)?.extra_id;
  const extraName = extraId
    ? extraId
        .split('_')
        .map(e => e.charAt(0).toUpperCase() + e.slice(1, e.length))
        .join(' ')
    : null;

  const enterPressed = e => {
    if (e.keyCode === 13 && showModal === true) {
      handleSubmitWalletAddress();
    }
  };

  useEffect(() => {
    if (modalState) {
      document.querySelector('#walletAddressModal').classList.add('show');
      document.querySelector('body').style.overflowY = 'hidden';
      window.addEventListener('keyup', enterPressed);
    } else {
      document.querySelector('#walletAddressModal').classList.remove('show');
      document.querySelector('body').style.overflowY = 'auto';
      window.removeEventListener('keyup', enterPressed);
    }

    return () => {
      document.querySelector('#walletAddressModal').classList.remove('show');
    };
  }, [modalState]);

  useEffect(() => {
    const orderHistory = window.localStorage.orderHistory ? JSON.parse(window.localStorage.orderHistory) : null;

    if (orderHistory) {
      const addresses = [];

      orderHistory.forEach(({ quote, withdraw_address }) => {
        if (quote === coin && withdraw_address) {
          if (!addresses.includes(withdraw_address)) addresses.push(withdraw_address);
        }
        setPrevAddresses(addresses);
      });
    }
  }, [coin]);

  // force modal
  useEffect(() => {
    if (!withdraw_address && status_name[0][0] === 12 && !modalForced) {
      // crypto order
      if (deposit_address) {
        setModalState(true);
        setModalForced(true);
      } else if (kyc) {
        // fiat order
        const { out_of_limit, is_verifed } = kyc;
        if (out_of_limit && is_verifed) {
          setModalState(true);
          setModalForced(true);
        }
      }
    }
  }, [status_name, withdraw_address, modalForced, kyc]);

  const handleAddressChange = e => {
    if (addressValid === false) setAddressValid();
    setWalletAddress({ ...walletAddress, address: e.target.value });
  };

  const handleExtraIdChange = e => {
    setWalletAddress({ ...walletAddress, [extraId]: e.target.value });
  };

  const handleAddressClick = e => {
    if (addressValid === false) setAddressValid();
    const selectedAddress = e.target.getAttribute('data-addr');
    setWalletAddress({ ...walletAddress, address: selectedAddress });
  };

  const handleSubmitWalletAddress = () => {
    if (walletAddress.address) {
      axios
        .patch(
          `${config.API_BASE_URL}/orders/${unique_reference}`,
          {
            withdraw_address: {
              ...walletAddress,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
        )
        .then(res => {
          setAddress(walletAddress.address);

          // set withdraw address in order history
          const orderHistory = JSON.parse(window.localStorage.orderHistory);
          const orderIndex = orderHistory.findIndex(e => e.id === unique_reference);
          orderHistory[orderIndex].withdraw_address = walletAddress.address;
          window.localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

          setModalState(false);
        })
        .catch(err => {
          const { data } = err.response;

          const invalidAddressRegex = new RegExp(`has invalid characters`);

          // address is invalid
          if (invalidAddressRegex.test(data.non_field_errors?.[0])) setAddressValid(false);
        });
    } else setAddressValid(false);
  };

  return (
    <Container id="walletAddressModal">
      <Content>
        <CloseButton onClick={() => setModalState(false)}>
          <img src="/img/icons/close.png" alt="close modal" />
        </CloseButton>
        <h3>What is your {coin} wallet address?</h3>
        <AddressInput>
          <div id="withdrawal_address" className={cx(addressValid === false && 'address_invalid')}>
            <div className="withdrawal_address_error text-danger">Address Invalid</div>
            <label htmlFor="withdrawal_address" className="sr-only">
              Enter your {coin} wallet address
            </label>
            <input
              type="text"
              value={walletAddress.address}
              placeholder={`Enter your ${coin} wallet address`}
              onChange={handleAddressChange}
            />
          </div>
          {extraId ? (
            <div id="withdrawal_extra_id">
              <label htmlFor="withdrawal_address" className="sr-only">
                Enter {extraName} (optional)
              </label>
              <input
                type="text"
                value={walletAddress.extraId}
                placeholder={`Enter ${extraName} (optional)`}
                onChange={handleExtraIdChange}
              />
            </div>
          ) : null}
        </AddressInput>
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
        <Button>
          <button type="button" id="close_modal" onClick={() => setModalState(false)}>
            Close this window
          </button>
          <button type="button" id="submit_address" onClick={handleSubmitWalletAddress}>
            Submit address
          </button>
        </Button>
      </Content>
    </Container>
  );
};

const mapStateToProps = ({ coinsInfo, order, kyc }) => ({ coinsInfo, order, kyc });

export default connect(mapStateToProps)(WalletAddress);
