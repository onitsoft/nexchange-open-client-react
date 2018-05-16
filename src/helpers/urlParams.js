export default () => {
  let url = window.location.search.substring(1),
    params = url.split('&'),
    obj = {};

  if (params[0] === '') return null;

  for (let i = 0; i < params.length; i++) {
    let param = params[i].split('=');
    obj[param[0]] = param[1];
  }

  return obj;
};
