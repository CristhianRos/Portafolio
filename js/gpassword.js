(function () {
    var app = document.getElementById('app');
    var inputCharacters = document.getElementById('numCharacters');

    var config = {
        characters: parseInt(inputCharacters.value),
        symbol: true,
        number: true,
        mayus: true,
        minusc: true
    }

    var characters = {
        numbers: '0 1 2 3 4 5 6 7 8 9',
        symbol: '! @ # $ % & * ( ) _ - + = : ; < > , . ? /',
        mayus: 'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z',
        minusc: 'a b c d e f g h i j k l m n ñ o p q r s t u v x y z'
    }
    //prevenir el evento enviar
    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    app.elements.namedItem('btn-plus').addEventListener('click', function () {
        config.characters++;
        inputCharacters.value = config.characters;
    });

    app.elements.namedItem('btn-minus').addEventListener('click', function () {
        if (config.characters > 8) {
            config.characters--;
            inputCharacters.value = config.characters;
        }

    });

    app.elements.namedItem('btn-trigger').addEventListener('click', function () {
        makePassword();
    });

    app.elements.namedItem('input-password').addEventListener('click', function () {
        copyPassword();
    });

    //funciones


    for (let i = 0; i < app.elements.length; i++) {
        if (app.elements[i].id == 'btn-symbol' || app.elements[i].id == 'btn-number' ||
            app.elements[i].id == 'btn-mayus') {
            app.elements[i].addEventListener('click', function () {
                this.classList.toggle('false');
                this.childNodes[0].classList.toggle('fa-check');
                this.childNodes[0].classList.toggle('fa-times');
                config.symbol = !config.symbol;
                config.number = !config.number;
                config.mayus = !config.mayus;
            })
        }
    }



    function makePassword() {
        var finalCharacters = '';
        var password = '';

        for (propiety in config) {

            if (config[propiety] == true) {
                finalCharacters += characters[propiety] + ' ';
            }

        }

        finalCharacters = finalCharacters.trim();
        finalCharacters = finalCharacters.split(' ');

        for (var i = 0; i < config.characters; i++) {
            password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
        }
        app.elements.namedItem('input-password').value = password;
    }



    function copyPassword() {
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alert-copy').classList.add('active');

        setTimeout(function () {
            document.getElementById('alert-copy').classList.remove('active');
        }, 2000);
    }

    makePassword();
}()) 