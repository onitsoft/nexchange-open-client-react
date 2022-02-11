import { Country, State } from 'country-state-city';

const { getAllCountries } = Country;
const { getStatesOfCountry } = State;

const countryList = getAllCountries();

const getCountrySelectOptions = () =>
  countryList.map(countryDto => {
    const { flag, name, phonecode } = countryDto;

    return {
      label: name,
      value: countryDto,
      icon: flag,
      phoneCode: phonecode,
    };
  });

const getStateOption = stateDto => ({
  label: stateDto.name,
  value: stateDto,
});

const getStateSelectOptionsMap = () =>
  countryList.reduce((countryStatesOptionsMap, countryDto) => {
    const { isoCode } = countryDto;
    const stateDtoList = getStatesOfCountry(isoCode);

    countryStatesOptionsMap[isoCode] = stateDtoList.map(stateDto => getStateOption(stateDto));

    return countryStatesOptionsMap;
  }, {});

const countrySelectOptions = getCountrySelectOptions();
const statesCountrySelectOptionsMap = getStateSelectOptionsMap();

export { countrySelectOptions, statesCountrySelectOptionsMap };
