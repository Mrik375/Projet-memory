
///////////////////////// Définition méga chiante ////////////////////////////

const solarOpposites = document.getElementById("solarOpposites"); // Récupération de la span "solarOpposites"

solarOpposites.addEventListener("mousemove", function(event) { // Affiche la section au survol de la span
    let definition = document.getElementById("definition");
    if (!definition) {
        definition = document.createElement("section");
        definition.id = "definition";
        definition.className = "definition";
        definition.innerText = "Solar Opposites est une série animée écrite par les réalisateurs de Rick & Morty, dans un esprit très similaire et un univers à la hauteur de leur imagination...";
        document.body.appendChild(definition);
    }
    definition.style.display = "block"; // Affiche la section
    definition.style.position = "fixed"; // Utilise "position: fixed" pour que la position soit par rapport à la fenêtre
    definition.style.left = event.pageX + "px"; // Position horizontale de la section à la position du curseur
    definition.style.top = (event.pageY - window.scrollY)+ "px"; // Position verticale
});

solarOpposites.addEventListener('mouseleave', function() { // Cache la section lorsque le curseur quitte la span
    const definition = document.getElementById("definition");
    if (definition) {
        definition.style.display = "none";
    }
});
