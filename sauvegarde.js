// Fonction pour changer la couleur du carré en haut
function changeColor1(color) {
    try {
        const topSquare3 = document.querySelector('.div-block-3');
        if (topSquare3) {
            topSquare3.style.backgroundColor = color;
            localStorage.setItem('selectedColor1', color);
            console.log("1 : good");
        } else {
            console.error("Le carré du haut n'a pas été trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors du changement de 1ere couleur :", error);
    }
}

function changeColor2(color) {
    try {
        const topSquare4 = document.querySelector('.div-block-4');
        if (topSquare4) {
            topSquare4.style.backgroundColor = color;
            localStorage.setItem('selectedColor2', color);
            console.log("2 : good");
        } else {
            console.error("Le carré du milieu n'a pas été trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors du changement de 2eme couleur :", error);
    }
}

function changeColor3(color) {
    try {
        const topSquare5 = document.querySelector('.div-block-5');
        if (topSquare5) {
            topSquare5.style.backgroundColor = color;
            localStorage.setItem('selectedColor3', color);
            console.log("3 : good");
        } else {
            console.error("Le carré du bas n'a pas été trouvé.");
        }
    } catch (error) {
        console.error("Erreur lors du changement de 3eme couleur :", error);
    }
}

document.querySelectorAll('.color1').forEach(square => {
    square.addEventListener('click', function() {
        const color = window.getComputedStyle(square).backgroundColor;
        changeColor1(color);
    });
});

document.querySelectorAll('.color2').forEach(square => {
    square.addEventListener('click', function() {
        const color = window.getComputedStyle(square).backgroundColor;
        changeColor2(color);
    });
});

document.querySelectorAll('.color3').forEach(square => {
    square.addEventListener('click', function() {
        const color = window.getComputedStyle(square).backgroundColor;
        changeColor3(color);
    });
});

// Au chargement de la page, récupérer la couleur sauvegardée et l'appliquer
window.onload = function() {
    const savedColor1 = localStorage.getItem('selectedColor1');
    const savedColor2 = localStorage.getItem('selectedColor2');
    const savedColor3 = localStorage.getItem('selectedColor3');
    if (savedColor1) {
        document.querySelector('.div-block-3').style.backgroundColor = savedColor1;
    }
    if (savedColor2) {
        document.querySelector('.div-block-4').style.backgroundColor = savedColor2;
    }
    if (savedColor3) {
        document.querySelector('.div-block-5').style.backgroundColor = savedColor3;
    }
};

