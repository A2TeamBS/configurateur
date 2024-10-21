function changeColor1(color) {
    try {
        const topSquare3 = document.querySelector('.div-block-3');
        if (topSquare3) {
            topSquare3.style.backgroundColor = color;
            localStorage.setItem('selectedColor1', color);
            console.log("1 : good");
        } else {
            console.error("up square not found.");
        }
    } catch (error) {
        console.error("Error during 1st color setting :", error);
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
            console.error("middle square not found.");
        }
    } catch (error) {
        console.error("Error during 2nd color setting :", error);
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
            console.error("low square not found.");
        }
    } catch (error) {
        console.error("Error during 3nd color setting :", error);
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
        console.log('Data correctly send to make :', result);
    })
    .catch(error => {
        console.error('Error during data send to make:', error);
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
