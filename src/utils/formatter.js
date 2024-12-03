//post
export function formatDateTime(datetime) {
  const padZero = (num) => (num < 10 ? "0" : "") + num;
  const year = datetime.getFullYear();
  const month = padZero(datetime.getMonth() + 1);
  const day = padZero(datetime.getDate());
  const hours = padZero(datetime.getHours());
  const minutes = padZero(datetime.getMinutes());
  const seconds = padZero(datetime.getSeconds());
  const formatDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formatDateTime;
}
