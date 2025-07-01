import { quiz_frida_kahlo } from './questions.js'; //nous avons relié ce fichier avec questions.js
import { commentaires } from './comments.js';

//selection des elements HTML //on fait correspondre les variables à leurs emplacements HTML
const questionText = document.querySelector("#questionText");
const options = document.querySelector(".options");
const nextButton = document.querySelector("#nextButton");
const scoreButton = document.querySelector("#scoreButton");
const showScore = document.querySelector("#showScore");
const replayButton = document.querySelector("#replayButton");
const finalPage = document.querySelector("#finalPage");
const quizContainer = document.querySelector("#quizContainer");
const illustrationContainer = document.querySelector("#illustrationContainer");
const comment = document.querySelector("#comment");

//parametres de base de nos fonctions
let currentQuestionIndex = 7; //permet d'afficher la question et les boutons 0 au round 0
let score = 0;

// showScore.innerHTML = `${score}/${quiz_frida_kahlo.questions.length}`;
//1. déclaration des fonctions
//a. afficher les réponses
function loadQuestion() { //Fonction pour afficher une question basée sur l'index actuel
    questionText.innerHTML = `<h3>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h3>`; //on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    options.innerHTML = '';// Vider le conteneur des options
    illustrationContainer.innerHTML = `<img class="image" src="${quiz_frida_kahlo.questions[currentQuestionIndex].image}" alt="illustration"/>`
    //fonction pour mélanger le tableau des réponses
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; //échange les éléments
        }
    }
    shuffleArray(quiz_frida_kahlo.questions[currentQuestionIndex].options);// mélange le tableau des options

    //affiche les boutons dans l'ordre aléatoire
    for (const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
        options.innerHTML += `<button class="answerButtons">${item}</button>`;//on intègre les boutons dans le conteneur de boutons
    } //la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex

    //a2. on modifie l'affichage en fonction de la réponse choisie.
    const answerButtons = document.querySelectorAll(".answerButtons");
    nextButton.disabled = true;

    for (const clickedButton of answerButtons) { //on crée une boucle qui isole les options
        clickedButton.addEventListener("click", (event) => {
            for (const clickedButton of answerButtons) {
                clickedButton.disabled = true;
            };
            nextButton.disabled = false; //on réactive le bouton suivant après un click sur les réponse
            if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
                scoreButton.style.display = "inline";
            }
            if (event.target.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
                clickedButton.style.backgroundColor = "#4caf50";
                score += 1;
                //showScore.innerHTML = `${score}/${quiz_frida_kahlo.questions.length}`;
            } else {
                clickedButton.style.backgroundColor = "#e0beb5";
                for (const button of answerButtons) {
                    if (button.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer) {
                        button.style.backgroundColor = "#4caf50";
                    };
                }
            };
        });
    };
      updateProgressBar();
};

function updateProgressBar() {
    const totalQuestions = quiz_frida_kahlo.questions.length;
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    
    if (progressBar) {
        progressBar.style.width = progressPercent + "%";
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestionIndex + 1} sur ${totalQuestions}`;
    }
}
 

loadQuestion(); //on execute la fonction




//bouton "suivant"
nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1; //l'action click ajoute 1 à la page actuelle
    loadQuestion(); //on appelle la fonction pour l'executer sinon l'affichage s'actualise pas
    if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
        nextButton.style.display = "none";
    }; //si le compteur atteint la dernière page, le bouton "suivant" disparait
});

//bouton de score
scoreButton.addEventListener("click", () => {
    quizContainer.style.display = "none";
    finalPage.style.display = "flex";
    illustrationContainer.style.display = "none";
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
    finalPage.style.display = "none";
    currentQuestionIndex = 0; // /!\ à déplacer dans replayButton
    score = 0;
    loadQuestion();
    nextButton.style.display = "inline";
});


