/*
Lorsque l‘utilisateur·ice arrive sur la page d‘accueil de votre site, iel voit la première question de cette série, avec plusieurs réponses possibles parmi lesquelles iel doit choisir.
L'utilisateur·ice clique sur l'une des options de réponse à cette question.
Le bouton "Suivant" reste désactivé tant que l'utilisateur·ice n'a pas sélectionné une réponse.
Lorsque l'utilisateur·ice sélectionne une option, les autres options ne peuvent plus être sélectionnées.
Le résultat (bonne réponse ou mauvaise réponse) est affiché immédiatement.
Le bouton "Suivant" est de nouveau actif, quand il est cliqué par l'utilisateur·ice, il passe à la question suivante.
Le score est calculé et affiché à la fin du quiz. Un message personnalisé est affiché en fonction du score.
Une fois le quiz terminé, l'utilisateur·ice a la possibilité de cliquer un bouton pour rejouer.
*/

import {quiz_frida_kahlo} from './questions.js';


console.log(quiz_frida_kahlo);

/*
const option_btn = document.createElement('button');

const list = querySelector("");
const list = querySelector("");
const list = querySelector("");

list.innerHTML(`<ul id="list">
  <li>Item 1</a></li>
  <li>Item 2</a></li>
  <li>Item 3</a></li>
  <li>Item 4</a></li>
</ul>`);

*/