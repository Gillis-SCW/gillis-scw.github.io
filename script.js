const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const informationElement = document.getElementById('information');
const explanationElement = document.getElementById('explanation');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
var count = 0;
var total = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

async function loadQuestions(dir = './questions/') {
  const response = await fetch(dir);
  const text = await response.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(text, 'text/html');
  const yamlFiles = Array.from(html.querySelectorAll('a[href$=".yaml"]')).map(a => `${dir}${a.href.split('/').pop()}`);
 
  const yamlDataPromises = yamlFiles.map(file => fetch(file).then(response => response.text()));
  const yamlData = await Promise.all(yamlDataPromises);
  
  let questions = [];
  for (const data of yamlData) {
  const questionsInFile = jsyaml.loadAll(data);
  questions.push(...questionsInFile);
  }
  
  const subdirectories = Array.from(html.querySelectorAll('a[href$="/"]')).map(a => `${dir}${a.href.split('/').reverse()[1]}/`);
  for (const subdir of subdirectories) {
  const subquestions = await loadQuestions(subdir);
  questions.push(...subquestions);
  }
  
  return questions;
}

async function startGame() {
  startButton.classList.add('hide');
  explanationElement.classList.add('hide');
  const questions = await loadQuestions();
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }

  // Clear explanation
  explanationElement.classList.add('hide');
  explanationElement.innerText = '';
}

function showQuestion(question) {
  informationElement.innerText = question.topic + " - " + question.category + " - " + question.level + " - [" + (currentQuestionIndex + 1) + "]/[" + shuffledQuestions.length + "]";
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerText = Object.values(answer)[0];
    button.classList.add('btn');
    button.dataset.answer = Object.keys(answer)[0]; // assign answer id to button

    //check which value is correct
    if (Object.keys(answer)[0] == question.correct_answer) {
      button.dataset.correct = true;
    }
    
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  // Display explanation
  const explanations = shuffledQuestions[currentQuestionIndex].explanations;
  const getKeyDescription = (key) => {
    const answer = explanations.find(answer => answer[key]);
    return answer ? answer[key] : undefined;
  }
  //const explanationText = explanations[0][selectedButton.dataset.answer];
  const explanationText = getKeyDescription(selectedButton.dataset.answer);
  explanationElement.innerText = explanationText;
  explanationElement.classList.remove('hide');

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}
