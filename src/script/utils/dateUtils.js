/**
 * output GMT+7 : 'yyyy-mm-dd'
 * */

function convertISODateToLocalString(date) {
  return new Date(date).toLocaleString('en-CA', {
    hour12: false,
    dateStyle: 'short',
    timeZone: 'Asia/Jakarta',
  });
}

export default convertISODateToLocalString;
