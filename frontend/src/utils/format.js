export const formatVotes = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return Math.round(num / 1000) + "k";
  return num;
};
