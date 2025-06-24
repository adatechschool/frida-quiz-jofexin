import { quiz_frida_kahlo } from './questions.js'; //  nous avons relié ce fichier avec questions.js

// selection des elements HTML
const quizContainer = document.querySelector("#quizContainer");//on fait correspondre la variable quizContainer à son emplacement HTML
const questionText = document.querySelector("#questionText"); //on fait correspondre la variable questionText à son emplacement HTML
const options = document.querySelector(".options"); //on fait correspondre la variable questions à son emplacement HTML
const nextButton = document.querySelector("#nextButton");

//parametres de base de nos fonctions
let currentQuestionIndex = 0; // permet d'afficher la question et les boutons 0 au round 0
const currentQuestionPage = quiz_frida_kahlo.questions[currentQuestionIndex];
//const firstQuestion = quiz_frida_kahlo.questions[0].text;

//déclaration des fonctions


nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1;
});

// function loadQuestion() { // Fonction pour afficher une question basée sur l'index actuel
//     options.innerHTML = '';// Vider le conteneur des options
//     questionText.innerHTML = `<h2>${currentQuestionPage.text}</h2>`; // on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
//     for (const item of currentQuestionPage.options) {
//         options.innerHTML += `<button>${item}</button>`;
//     }; // la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex
// };

// loadQuestion(); //on appelle la fonction pour l'executer
console.log(currentQuestionIndex);