import { quiz_frida_kahlo } from './questions.js'; //  nous avons relié ce fichier avec questions.js

// selection des elements HTML
const quizContainer = document.querySelector("#quizContainer");//on fait correspondre la variable quizContainer à son emplacement HTML
const questionText = document.querySelector("#questionText"); //on fait correspondre la variable questionText à son emplacement HTML
const options = document.querySelector(".options"); //on fait correspondre la variable questions à son emplacement HTML
const nextButton = document.querySelector("#nextButton");

//parametres de base de nos fonctions
let currentQuestionIndex = 0; // permet d'afficher la question et les boutons 0 au round 0

//déclaration des fonctions
function loadQuestion() { // Fonction pour afficher une question basée sur l'index actuel
    questionText.innerHTML = `<h2>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h2>`; // on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    options.innerHTML = '';// Vider le conteneur des options
    for (const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
        options.innerHTML += `<button>${item}</button>`;
    }; // la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex
};
loadQuestion()
nextButton.addEventListener("click", () => { 
    currentQuestionIndex += 1;//l'action click ajoute 1 à la page actuelle
    // console.log(currentQuestionIndex);
    loadQuestion(); //on appelle la fonction pour l'executer sinon l'affichage s'actualise pas
    if (currentQuestionIndex===quiz_frida_kahlo.questions.length-1){
        nextButton.style.display = "none";
    };
});