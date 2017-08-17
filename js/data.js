var userData = { //create our userData object
    name: "Name",
    userAbility: [[10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10]], //school, home, transport, sport
    frenchCorrect: 0,
    frenchWrong: 0, //store the correct and wrong for each language, to get total but also seperate data
    spanishCorrect: 0,
    spanishWrong: 0,
    germanCorrect: 0,
    germanWrong: 0,
    quizData: { //were storing our quiz data as a sub-object to make it more understandable.
        quizLength: 10,
        currentLanguage: 0,
        currentDifficulty: 0,
        currentAnswer: "word" //the current answer.
    }
};

var docElement = { //create a collection of page elements, for enhanced control.
	userNameDisplay: document.getElementById("userNameDisplay"),
	menu: document.getElementById("menu"),
	question: document.getElementById("question"),
	userAnswer: document.getElementById("userAnswer"),
	answerFeedback: document.getElementById("answerFeedback"),
	answer: document.getElementById("answer")
}

var questions = [ //create questions in format, english word, [translations words], relevant category.
    [
        ["book", ["livre", "libro", "buch"], 0],
        ["airport", ["aeroport", "aeropuerto", "flughafen"], 2],
        ["bus", ["autobus", "autobus", "bus"], 2],
        ["computer", ["ordinateur", "computadora", "computer"], 1],
        ["football", ["le foot", "futbol", "fuball"], 3],
        ["house", ["maison", "casa", "haus"], 1],
        ["phone", ["telephone", "telefono", "telefon"], 1],
        ["plane", ["avion", "avion", "ebene"], 2],
        ["shower", ["douche", "ducha", "dusche"], 1],
        ["station", ["gare", "estacion", "bahnhof"], 2],
        ["train", ["le chariot", "tren", "zug"], 2]
    ],
    [
        ["Parents", ["parents", "Padres", "Eltern"], 1],
        ["Siblings", ["freres et soeurs", "Hermanos", "Geschwister"], 1],
        ["Dog", ["chien", "Perro", "hund"], 1],
        ["Eating", ["Enmangeant", "Comiendo", "essen"], 1],
        ["Pizza", ["Pizza", "Pizza", "Pizza"], 1],
        ["Tram", ["Tram", "Tranvia", "Tram"], 2],
        ["Motorbike", ["Moto", "Moto", "Motorrad"], 2],
        ["Maths", ["Mathematiques", "Matematicas", "mathe"], 0],
        ["Computing", ["l'informatique", "informatica", "Informatik"], 0],
        ["Basketball", ["Basketball", "baloncesto", "Basketball"], 3],
        ["Dodgeball", ["Dodgeball", "dodgeball", "Volkerball"], 3]
    ],
    [
        ["Art", ["Art", "Art", "kunst"], 0],
        ["Television", ["television", "Television", "fernsehen"], 1],
        ["Bowling", ["bowling", "bolos", "bowling"], 3],
        ["Tennis", ["tennis", "tenis", "tennis"], 3],
        ["Music", ["la musique", "musica", "musik"], 0],
        ["Door", ["porte", "puerta", "tur"], 1],
        ["Taxi", ["taxi", "taxi", "taxi"], 2],
        ["Monorail", ["monorail", "monocarri", "Einschienenbahn"], 2],
        ["Walking", ["en marchant", "para caminar", "Gehen"], 3],
        ["Driving", ["au volant", "conduccion", "Fahren"], 2],
        ["Toothbrush", ["brosse a dents", "cepillo de dientes", "Zahnburste"], 1]
    ]
];