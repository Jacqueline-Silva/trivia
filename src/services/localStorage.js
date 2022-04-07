export const saveRanking = (objeto) => localStorage
  .setItem('ranking', JSON.stringify(objeto));

export const getRanking = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};

export function storageSize() {
  return localStorage.rankings ? JSON.parse(localStorage.rankings) : {};
}

export const saveRankings = async (object) => {
  const checkStorage = await storageSize();
  if (checkStorage[0]) {
    localStorage.setItem('rankings', JSON.stringify([...checkStorage, object]));
  } else {
    localStorage.setItem('rankings', JSON.stringify([object]));
  }
};

export const getRankings = () => {
  const result = localStorage.getItem('rankings');
  return JSON.parse(result);
};
