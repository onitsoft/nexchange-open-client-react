const minutesInDay = 24 * 60 * 60 * 1000;

export default date => {
  date = new Date(date);
  const today = new Date();
  date.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  var diff = (+today - +date)/minutesInDay;
  return diff;
};
