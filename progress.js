export function updateProgressBar (array, index){//on utilise les paramètres pour utiliser les variables globales dans le game.js
    //en occurence, array = quiz.question ; index = currentPageIndex
    let progressPercent = ((index + 1) / array.length) * 100;
    const progressBar = document.querySelector("#progressBar");
    progressBar.style.width = progressPercent + "%";
};