import {quiz_frida_kahlo} from './questions.js';

const quizContainer = document.querySelector("#quizContainer");//on fait correspondre la variable quizContainer à son emplacement HTML
const questionText = document.querySelector("#questionText"); //on fait correspondre la variable questionText à son emplacement HTML
const options = document.querySelector(".options"); //on fait correspondre la variable questions à son emplacement HTML

let currentQuestionIndex = 0; // permet d'afficher la question et les boutons 0 au round 0

//const firstQuestion = quiz_frida_kahlo.questions[0].text;

function loadQuestion () { // Fonction pour afficher une question basée sur l'index actuel
    options.innerHTML = '';// Vider le conteneur des options
    questionText.innerHTML = `<h2>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h2>`; // on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    for(const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
    options.innerHTML += `<button>${item}</button>`;
}; // la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex
};

loadQuestion(); //on appelle la fonction pour l'executer