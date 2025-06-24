import { quiz_frida_kahlo } from './questions.js'; //  nous avons relié ce fichier avec questions.js

// selection des elements HTML // on fait correspondre les variables à leurs emplacements HTML
const quizContainer = document.querySelector("#quizContainer");
const questionText = document.querySelector("#questionText");
const options = document.querySelector(".options");
const nextButton = document.querySelector("#nextButton");

//parametres de base de nos fonctions
let currentQuestionIndex = 0; // permet d'afficher la question et les boutons 0 au round 0

//déclaration des fonctions
function loadQuestion() { // Fonction pour afficher une question basée sur l'index actuel
    questionText.innerHTML = `<h2>${quiz_frida_kahlo.questions[currentQuestionIndex].text}</h2>`; // on fait apparaitre l'intitulé de question, variant à chaque currentQuestionIndex
    options.innerHTML = '';// Vider le conteneur des options
    for (const item of quiz_frida_kahlo.questions[currentQuestionIndex].options) {
        options.innerHTML += `<button class="answerButtons" >${item}</button>`; //on intègre les boutons dans le conteneur de boutons
    }; //la boucle fait apparaitre 4 éléments, à chaque currentQuestionIndex
    const answerButtons = document.querySelectorAll(".answerButtons");
    console.log(answerButtons); // answerButtons est un tableau
    for (const clickedButton of answerButtons) { // on crée une boucle qui isole les options
        clickedButton.addEventListener("click", (event) => {
            console.log('debug event', event.target.innerHTML);
            if (event.target.innerHTML === quiz_frida_kahlo.questions[currentQuestionIndex].correct_answer)
                clickedButton.style.backgroundColor = "lightgreen";
        })
    };
};

loadQuestion(); // on execute la fonction

nextButton.addEventListener("click", () => {
    currentQuestionIndex += 1;//l'action click ajoute 1 à la page actuelle
    // console.log(currentQuestionIndex);
    loadQuestion(); //on appelle la fonction pour l'executer sinon l'affichage s'actualise pas
    if (currentQuestionIndex === quiz_frida_kahlo.questions.length - 1) {
        nextButton.style.display = "none";
    }; // si le compteur atteint la derniière page, le bouton "suivant" disparait
});



// answerButtons.innerHTML = `<button class="" onclick="changeColor('vert')">`