
document.addEventListener("DOMContentLoaded", function() { // Lecture du JS après chargement du DOM
  const cards = document.querySelectorAll(".memory-card"); //abonnement à toutes les cards => nodelist
  const victoire = document.getElementById("victoire");

  let carteRetournee = false;
  let verrouillage = false; //verouille le clic si action en cours
  let card1, card2;
  let pairestrouvees = 0; // compteur de paires pour savoir quand l'utilisateur à gagné

  function flipCard(card) {
    if (verrouillage) return; // si le jeu est vérouillé ou si l'utilisateur clique sur la même carte, rien ne se passe
    if (card === card1) return;

    card.classList.add("flip"); // appel du flip

    if (!carteRetournee) {
      carteRetournee = true; // card1 prend la valeur de la carte cliquée
      card1 = card;
      return;
    } 

    card2 = card; // card2 prend la valeur de la carte cliquée

    verif(); 
  }
  //// vérifier les cards ////
  function verif() {
    let same = card1.dataset.name === card2.dataset.name; 

    if (same) {
      desactive(); // si victoire, cards désactivées, sinon cards se retournent
      pairestrouvees++ // incrémente le cpt de paires trouvées
  } else {
      retourne();
  }
  
  if (pairestrouvees === cards.length / 2) {// vérifie si tout à été trouvé ==> nbr cards en doubles / 2
    afficheVictoire(); // Si oui, affiche message victoire
  }
  }

  function desactive() {
    card1.removeEventListener("click", clickedCard); // supprime l'écoute sur la carte cliquée
    card2.removeEventListener("click", clickedCard);

    reinitialise(); //réinitialise les variables
  }

  function retourne() { //verouille quand les cartes sont en train de se retourner
    verrouillage = true;

    setTimeout(function() { // Tempo
      card1.classList.remove("flip"); // effet de flip quand réinitialisation
      card2.classList.remove("flip");
  
      reinitialise();
  }, 1200);
  }

  function reinitialise() {
    [carteRetournee, verrouillage] = [false, false]; //réinitialise les variables
    [card1, card2] = [null, null];
  }

  function clickedCard(event) { // capte le clic sur une carte
    flipCard(event.target.closest(".memory-card")); // trouve quelle carte doit être retournée
  }

  cards.forEach(card => card.addEventListener("click", clickedCard));

  function afficheVictoire() {
    victoire.style.display = "block"; // affiche message victoire
  }

  // Fonction pour mélanger les cartes
  function melangeCards() {
    cards.forEach(function(card) {
      let randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  }
  /// recommencer partie ///

  // Mélanger les cartes au rechargement de la page
  melangeCards();

  document.addEventListener("keydown", function(event) {
    if (event.code === "Space") { // Vérifie si la touche enfoncée est la barre d'espace
      recommencer(); // Appelle la fonction pour relancer le jeu
    }
  });

  // Fonction pour relancer le jeu
  function recommencer() {
    victoire.style.display = "none"; // Cache le message de victoire
    melangeCards(); // Mélange les cartes à nouveau
    pairestrouvees = 0; // Réinitialise le compteur de paires trouvées
    cards.forEach(card => {
      card.classList.remove("flip");
      card.addEventListener("click", clickedCard); // Retourne toutes les cartes
    });
  }
});