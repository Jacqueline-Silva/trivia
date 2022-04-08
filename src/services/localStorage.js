import fetchGravatar from './fecthGravatar';

export const getRanking = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};

export function storageSize() {
  return localStorage.ranking ? JSON.parse(localStorage.ranking) : {};
}

const Picture = (object) => {
  if (object.gravatarEmail) {
    const { name, score, gravatarEmail, assertions } = object;
    const picture = fetchGravatar(gravatarEmail);
    return { name, score, picture, assertions };
  } return object;
};

export const saveRanking = async (object) => {
  const checkStorage = await storageSize();
  const newObject = Picture(object);
  const lastIndex = checkStorage.length - 1;
  if (checkStorage[0]) { // Conferindo se já há objetos no Storage "Ranking";
    if (checkStorage[lastIndex].picture === newObject.picture) { // Se há objetos, confere se é um jogador novo ou não, através do GravatarEmail;
      checkStorage[lastIndex] = JSON.stringify(newObject); // Sendo um usuário q já jogou antes, ele apenas atualiza o seu Ranking, ao invés de criar um novo;
    } else {
      localStorage.setItem('ranking', JSON.stringify([...checkStorage, newObject])); // sendo um jogador novo ele adiciona mais um objeto dentro Storage "ranking";
    }
  } else {
    localStorage.setItem('ranking', JSON.stringify([newObject]));
  }
};

export const getRankings = () => {
  const result = localStorage.getItem('ranking');
  return JSON.parse(result);
};
