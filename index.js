var articlesShown = []; // Permet de memoriser les elements deja affichés
var boxElement = document.querySelectorAll("#productList div[data-pid]"); // elements observés

// creation de l'observeur
createObserver();

function handleIntersect(entries) {
    entries.forEach(function(entry) {
        // creation des données à inserer dans le tableau
        var thisPid = entry.target.getAttribute('data-pid'),
            nom     = entry.target.querySelector('.ProductCard__content div .ProductCard__subtitle div').innerText,
            price   = entry.target.querySelector('.ProductCard__content div .ProductCard__price strong').innerText;
        const isSamePid = (element) => element.pid === thisPid;

        if (entry.isIntersecting) { // si l'element deviens visible
            if (articlesShown.findIndex(isSamePid) === -1) { // si l'element n'est pas encore dans le tableau
                articlesShown.push({ pid: thisPid, nom:  nom, price: price });
                // affichage du produit
                console.log("%cElément affiché", "color: red; font-weight: bold;font-style: underline;padding: 2px", "\n nom: " + nom + "\n prix: " + price);
            }
        }
    });
}

function createObserver() {
    var observer;

    var options = {
        root: null, // utilisation du viewport comme conteneur
        rootMargin: "0px", // marge du conteneur
        threshold: 1.0 // quand l'element est visible à 100%
    };

    // l'api va declencher le callback handleIntersect
    observer = new IntersectionObserver(handleIntersect, options);
    // chaque elements est observé
    boxElement.forEach(elem => {
        observer.observe(elem);
    });
}
