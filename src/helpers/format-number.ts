export default (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
  } else {
    return num.toString();
  }
};
