import { isEmpty } from 'lodash';

import restrictedResidenceLocationsMap from './restrictedResidenceLocationsMap';

const isCountryStateRequired = countryDto => {
  if (countryDto) {
    const restrictedCountryDto = restrictedResidenceLocationsMap[countryDto.isoCode];
    return !isEmpty(restrictedCountryDto?.prohibitedStates);
  }
  return false;
};

const isUserResidenceLocationLegal = residenceLocation => {
  if (!residenceLocation) return false;

  const { country, state } = residenceLocation;
  const prohibitedLocationDto = restrictedResidenceLocationsMap[country?.isoCode];

  const isCountryInRestrictedList = Boolean(prohibitedLocationDto);
  if (!isCountryInRestrictedList) return true;

  const isEntireCountryRestricted = !prohibitedLocationDto.prohibitedStates;
  if (isEntireCountryRestricted) return false;

  return !prohibitedLocationDto.prohibitedStates.some(prohibitedState => prohibitedState.isoCode === state.isoCode);
};

export { isUserResidenceLocationLegal, isCountryStateRequired };
