const residenceLocationKeyInStorage = 'residenceLocation';

const getUserFiscalLocationMap = () => {
  if (!localStorage) return null;
  return JSON.parse(localStorage.getItem(residenceLocationKeyInStorage));
};

const getResidenceLocation = username => {
  if (!username) return null;
  const userFiscalLocationMap = getUserFiscalLocationMap();
  return userFiscalLocationMap ? userFiscalLocationMap[username] : null;
};

const setResidenceLocation = (username, residenceLocation) => {
  const currentFiscalLocationsMap = getUserFiscalLocationMap();

  localStorage.setItem(
    residenceLocationKeyInStorage,
    JSON.stringify({
      ...currentFiscalLocationsMap,
      [username]: residenceLocation,
    })
  );
};

export { getResidenceLocation, setResidenceLocation };
