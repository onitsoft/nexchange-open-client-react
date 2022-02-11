import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';

import styles from '../../Accounts.scss';
import Select from './Select';
import { countrySelectOptions, statesCountrySelectOptionsMap } from '../../../../utils/restrictedCountires/countryAndRegion';
import { isCountryStateRequired } from '../../../../utils/restrictedCountires/restirctionCheck';

const getStateSelectOptionsDto = countryCode => {
  const statesSelectOptions = statesCountrySelectOptionsMap?.[countryCode] || [];

  return {
    statesSelectOptions,
    isCountryHasStates: !isEmpty(statesSelectOptions),
  };
};

const CountryStateSelect = ({
  value = {
    country: null,
    state: null,
    isStateRequired: false,
    isCountryHasStates: false,
  },
  setValue,
  myError,
}) => {
  const { isStateRequired, country, state } = value;
  const { isoCode: countryCode } = country || {};

  const { statesSelectOptions, isCountryHasStates } = useMemo(() => getStateSelectOptionsDto(countryCode), [countryCode]);

  const countryValue = useMemo(() => countrySelectOptions?.find(option => option.value.isoCode === country?.isoCode) || null, [
    countryCode,
  ]);

  const stateValue = useMemo(() => {
    if (!isStateRequired) return null;

    return statesSelectOptions?.find(option => option.value.isoCode === state?.isoCode) || null;
  }, [isStateRequired, countryCode, state?.isoCode, statesSelectOptions]);

  const selectCountry = countryOption => {
    const { value: countryDto } = countryOption;
    const { isoCode: newCountryCode } = countryDto;

    setValue({
      country: countryDto,
      isCountryHasStates: getStateSelectOptionsDto(newCountryCode).isCountryHasStates,
      isStateRequired: isCountryStateRequired(countryDto),
    });
  };

  const selectState = stateOption => setValue({ ...value, state: stateOption.value });

  return (
    <>
      <div className={`${styles['input-container']} ${myError('residenceLocation.country')}`}>
        <Select value={countryValue} options={countrySelectOptions} placeholder="Country" onChange={selectCountry} />
      </div>

      {isStateRequired && (
        <div className={`${styles['input-container']} ${myError('residenceLocation.state')}`}>
          <Select value={stateValue} options={statesSelectOptions} placeholder="Region / State" onChange={selectState} />
        </div>
      )}
    </>
  );
};

export default CountryStateSelect;
