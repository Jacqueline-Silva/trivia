export const saveRanking = (objeto) => localStorage
  .setItem('ranking', JSON.stringify(objeto));

export const getRanking = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};
