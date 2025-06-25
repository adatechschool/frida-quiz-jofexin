import { quiz_frida_kahlo } from './questions.js'; //nous avons relié ce fichier avec questions.js

//selection des elements HTML //on fait correspondre les variables à leurs emplacements HTML
const questionText = document.querySelector("#questionText");
const options = document.querySelector(".options");
const nextButton = document.querySelector("#nextButton");
const replayButton = document.querySelector("#replayButton");
const showScore = document.querySelector("#showScore");

//parametres de base de nos fonctions
let currentQuestionIndex = 0; //permet d'afficher la question et les boutons 0 au round 0
let score = 0;
showScore.innerHTML = score;
//1. déclaration des fonctions
//a. afficher les réponses
function loadQuestion() { //Fonction pour afficher une question basée sur l'index actuel
    questionText.innerHTML = `<h2>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h2>`; //on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    options.innerHTML = '';// Vider le conteneur des options
    for (const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
        options.innerHTML += `<button class="answerButtons" >${item}</button>`; //on intègre les boutons dans le conteneur de boutons
    }; //la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex
    //a2. on modifie l'affichage en fonction de la réponse choisie.
    const answerButtons = document.querySelectorAll(".answerButtons");
    nextButton.disabled = true;
    replayButton.disabled = true;
    for (const clickedButton of answerButtons) { //on crée une boucle qui isole les options
        clickedButton.addEventListener("click", (event) => {
            for (const clickedButton of answerButtons) {
                clickedButton.disabled = true;
            };
            nextButton.disabled=false; //on réactive le bouton suivant après un click sur les réponses
            replayButton.disabled=false;
            if (event.target.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
                clickedButton.style.backgroundColor = "lightgreen";
                score += 1;
                showScore.innerHTML = score;
            } else { clickedButton.style.backgroundColor = "lightpink"; };
        });
    };
};

loadQuestion(); //on execute la fonction


//b. bouton "suivant"
nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1; //l'action click ajoute 1 à la page actuelle
    loadQuestion(); //on appelle la fonction pour l'executer sinon l'affichage s'actualise pas
    if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
        nextButton.style.display = "none";
        replayButton.style.display = "inline";
    }; //si le compteur atteint la derniière page, le bouton "suivant" disparait
});

//c. bouton "rejouer"
replayButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    loadQuestion();
    replayButton.style.display = "none";
    nextButton.style.display = "inline";
    score = 0;
    showScore.innerHTML = score;
})