import React from 'react';
import ReactSelect from 'react-select';

const selectStyles = {
  placeholder: (base, state) => ({
    ...base,
    color: '#a09f9f',
  }),
  control: (base, state) => ({
    ...base,
    height: '4.5rem',
    border: 'none',
    borderRadius: '0',
    boxShadow: null,
    background: 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black'
  }),
};

const Select = (props) => {
  return <ReactSelect styles={selectStyles} {...props} />;
};

export default Select;
