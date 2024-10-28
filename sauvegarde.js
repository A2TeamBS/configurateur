// Function to change the color of the top square
function changeColor1(color) {
    try {
        const topSquare3 = document.querySelector('.div-block-3');
        if (topSquare3) {
            topSquare3.style.backgroundColor = color;
            localStorage.setItem('selectedColor1', color);
            console.log("1 : good");
            updateTotalPrice();
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
            updateTotalPrice();
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
            updateTotalPrice();
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

function updateTotalPrice() {
    const colorPrices = {
        'rgb(0, 255, 0)': 5,
        'rgb(255, 0, 0)': 10,
        'rgb(0, 0, 255)': 15
    };

    const selectedColor1 = localStorage.getItem('selectedColor1');
    const selectedColor2 = localStorage.getItem('selectedColor2');
    const selectedColor3 = localStorage.getItem('selectedColor3');

    let totalPrice = 0;
    if (selectedColor1 && colorPrices[selectedColor1]) {
        totalPrice += colorPrices[selectedColor1];
    }
    if (selectedColor2 && colorPrices[selectedColor2]) {
        totalPrice += colorPrices[selectedColor2];
    }
    if (selectedColor3 && colorPrices[selectedColor3]) {
        totalPrice += colorPrices[selectedColor3];
    }

    document.getElementById('total-price').textContent = totalPrice;
}

function sendColorsToMake() {
    const selectedColor1 = localStorage.getItem('selectedColor1');
    const selectedColor2 = localStorage.getItem('selectedColor2');
    const selectedColor3 = localStorage.getItem('selectedColor3');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const webhookURL = 'https://hook.eu2.make.com/3eyq9bbvpt7m3ybg4rtqfslk6q6pqtb3';

    const data = {
        color1: selectedColor1,
        color2: selectedColor2,
        color3: selectedColor3,
        name: name,
        email: email
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data successfully sent to Make:', result);
    })
    .catch(error => {
        console.error('Error sending data to Make:', error);
    });
}

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
    updateTotalPrice();
};

document.getElementById('email-form').addEventListener('submit', function(event) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.style.display !== 'none') {
                sendColorsToMake();
                observer.disconnect();
            }
        });
    });

    observer.observe(document.getElementById('form-success'), { attributes: true, attributeFilter: ['style'] });
});