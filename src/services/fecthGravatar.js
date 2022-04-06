import md5 from 'crypto-js/md5';

const fetchGravatar = (email) => {
  const hash = md5(email).toString();
  console.log(hash);
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default fetchGravatar;
