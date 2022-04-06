const fetchQuestions = async (token) => {
  const numberOfQuestions = 5;
  const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`);
  const data = await response.json();
  return data;
};

export default fetchQuestions;
