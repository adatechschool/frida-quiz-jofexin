//nous avons relié ces fichiers avec questions.js
import { quiz_frida_kahlo } from './questions.js';
import { commentaires } from './comments.js';
import { updateProgressBar } from './progress.js';
import { shuffleArray } from './shuffleArray.js';

//selection des elements HTML, on fait correspondre les variables à leurs emplacements HTML
const questionText = document.querySelector("#questionText");
const options = document.querySelector(".options");
const nextButton = document.querySelector("#nextButton");
const scoreButton = document.querySelector("#scoreButton");
const showScore = document.querySelector("#showScore");
const replayButton = document.querySelector("#replayButton");
const finalPage = document.querySelector("#finalPage");
const quizContainer = document.querySelector("#quizContainer");
const illustrationContainer = document.querySelector("#illustrationContainer");
const progressContainer = document.querySelector("#progressContainer")
const comment = document.querySelector("#comment");

//parametres de base de nos fonctions
let currentQuestionIndex = 0; //permet d'afficher la question et les boutons 0 au round 0
let score = 0;
// let sec = 5; 

//afficher les réponses
function loadQuestion() { //Fonction pour afficher une question basée sur l'index actuel
    questionText.innerHTML = `<h3>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h3>`; //on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    options.innerHTML = '';// Vider le conteneur des options
    illustrationContainer.innerHTML = `<img class="image" src="${quiz_frida_kahlo.questions[currentQuestionIndex].image}" alt="illustration"/>`
    //appeler la fonction shuffleArray pour un affichage aléatoire
    shuffleArray(quiz_frida_kahlo.questions[currentQuestionIndex].options);
    for (const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
        options.innerHTML += `<button class="answerButtons">${item}</button>`;//on intègre les boutons dans le conteneur de boutons
    };//la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex

    //on modifie l'affichage en fonction de la réponse choisie.
    const answerButtons = document.querySelectorAll(".answerButtons");
    nextButton.disabled = true;

    for (const button of answerButtons) { //on crée une boucle qui isole les options pour initier l'eventlistener
        button.addEventListener("click", (event) => {
            for (const button of answerButtons) {
                button.disabled = true;
                updateProgressBar(quiz_frida_kahlo.questions, currentQuestionIndex);
            };
            nextButton.disabled = false; //on réactive le bouton suivant après un click sur les réponse
            if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
                scoreButton.disabled = false;
            }
            if (event.target.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
                button.style.backgroundColor = "#4caf50";
                score += 1;
            } else {
                button.style.backgroundColor = "#e0beb5";
                for (const button of answerButtons) {
                    if (button.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
                        button.style.backgroundColor = "#4caf50";
                    };
                };
            };
        });
    };
    //ci-dessous le setup d'un timer 
    // const startTimer = setInterval(() =>{
    // document.getElementById("timer").innerHTML = sec;
    // sec--;
    // if (sec < 0) {
    //     clearInterval(startTimer);
    //      for (const button of answerButtons) {
    //                 if (button.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
    //                     button.style.backgroundColor = "#4caf50";
    //                     nextButton.disabled=false;
    //                 };
    //             };
    //     }
    // }, 1000);
};
loadQuestion(); //on execute la fonction

//bouton "suivant"
nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1; //l'action click ajoute 1 à la page actuelle
    loadQuestion(); //on appelle la fonction pour l'executer sinon l'affichage s'actualise pas
    // sec = 5;
    if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
        nextButton.style.display = "none";
        scoreButton.style.display = "inline";
    }; //si le compteur atteint la dernière page, le bouton "suivant" disparait
});

//bouton de score
scoreButton.addEventListener("click", () => {
    quizContainer.style.display = "none";
    illustrationContainer.style.display = "none";
    progressContainer.style.display = "none";
    finalPage.style.display = "flex";
    showScore.innerHTML = `${Math.round(score * 100 / quiz_frida_kahlo.questions.length)}%`; //affiche les %ages de réussite dans finalPage
    if (Math.round(score * 6 / quiz_frida_kahlo.questions.length) <= 2) {
        comment.innerHTML = commentaires.comments[0];
    } else if (Math.round(score * 6 / quiz_frida_kahlo.questions.length) <= 4) {
        comment.innerHTML = commentaires.comments[1];
    } else if (Math.round(score * 6 / quiz_frida_kahlo.questions.length) <= 5) {
        comment.innerHTML = commentaires.comments[2];
    } else if (Math.round(score * 6 / quiz_frida_kahlo.questions.length) === 6) {
        comment.innerHTML = commentaires.comments[3];
    };
});
//bouton rejouer
replayButton.addEventListener("click", () => {
    scoreButton.style.display = "none";
    quizContainer.style.display = "block";
    illustrationContainer.style.display = "flex";
    progressContainer.style.display = "inline";
    finalPage.style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    updateProgressBar(quiz_frida_kahlo.questions, -1);
    nextButton.style.display = "inline";
});