require("dotenv").config();

let APICall =`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API}`
// initalizes an array to store user answers to quiz
let userAnswers = [];
let userGenres = [];
//creates object to store userQuestions and answer sets for each part of the quiz
let userQuestions = {
    1: {
        question : `Are you looking for a movie or TV series?`,
        answers : [`Movie`, `TV Series`]
    },
    2: {
        question : `How much time do you have?`,
        answers : [`Not a lot`, `Too much`]
    },
    3: {
        question : `Something old or something new?`,
        answers : [`Classic`, `Modern`]
    },
    4: {
        question : `What are you in the mood for?`,
        answers : [`Laughter`, `Tears`, `Frights`, `Adventures`, `New Ideas`]
    },
}

let genres = new Map();
genres.set(`Drama`, `18`);
genres.set(`Action`, `28`);
genres.set(`Thriller`, `53`);
genres.set(`Comedy`, `35`);
genres.set(`Horror`, `27`);
genres.set(`Adventure`, `12`);
genres.set(`Documentary`, `99`);

// Displays the current quiz question and answer set by taking in the question number
let displayQuiz = (num) => {
    //Gets object for current question
    currentQuestion = userQuestions[num]
    //Displays question to user
    document.getElementById('question').innerHTML = `<h2>${currentQuestion.question}</h2>`
    //Loops through length of answers, accessing divs and inputting answer pictures and descriptions
    for (i = 0; i < currentQuestion.answers.length; i++) {
        document.getElementById(`ans${i}`).innerHTML = `<img class="answers" onClick="getAnswer(${num}, ${i})" src="assets/q${num}a${i+1}.png"></img>
        <p>${currentQuestion.answers[i]}</p>`
    }
}

//Gets called when user clicks on image, output depends on question and answer numbers
let getAnswer = (q, a) => {
    //grabs answer and pushes it to userAnswers array
    userAnswers.push(userQuestions[q].answers[a]);
    //if there's another question to be called, calls it.
    if (q < Object.keys(userQuestions).length){displayQuiz(q + 1)}
    //once there are no more userQuestions, call the function to generate recommendations and display to user.
    else if (q == Object.keys(userQuestions).length){assembleURL(userAnswers)}
}

// initializes default to first question
displayQuiz(1);

let checkMovie = (userAnswers) => {
    if (userAnswers[0] == `Movie`){return true} 
}

let addLength = (userAnswers) => {
    if (userAnswers[1] == `Not a lot`){return '&with_runtime.lte=120'}
    else{return ``}
}

let addRelease = (userAnswers) => {
    if (userAnswers[2] == `Classic`) {return '&primary_release_date.gte='+1980+'&primary_release_date.lte='+2006}
    else {return '&primary_release_date.gte='+2006+'&primary_release_date.lte='+2022}
}

let getGenres = (userAnswers, movie) => {
    if (movie) {
        switch (userAnswers[3]) {
            case `Laughter`:
                userGenres = [`Comedy`];
                break;
            case `Tears`:
                userGenres = [`Drama`];
                break;
            case `Frights`:
                userGenres = [`Horror`, `Thriller`];
                break;
            case `Adventures`:
                userGenres = [`Action`, `Adventure`];
                break;
            case `New Ideas`:
                userGenres = [`Documentary`];
                break;
        }
    }
    else {
        switch (userAnswers[3]) {
            case `Laughter`:
                userGenres = [];
                break;
            case `Tears`:
                userGenres = [];
                break;
            case `Frights`:
                userGenres = [];
                break;
            case `Adventures`:
                userGenres = [];
                break;
            case `New Ideas`:
                userGenres = [];
                break;
        }
    }
    return userGenres
}

let addGenres = (userGenres) => {
    let genreURL = '';
    for (i = 0; i < userGenres.length; i++)
        if (i == 0) {
            genreURL = `&with_genres=${genres[userGenres[i]]}`
        }
        else {
            genreURL = genreURL + `,${genres[userGenres[i]]}`
        }
        return genreURL
}

let assembleURL = (userAnswers) => {
    movie = checkMovie(userAnswers)
    APICall = APICall + addLength(userAnswers) + addRelease(userAnswers) + addGenres(getGenres(userAnswers, movie))
    getMovies(APICall)
}

let getMovies = (APICall) => {
    let i = 0
    fetch(APICall)
    .then(response => {
        let movies = response.json()
        return movies
    })
    .then(data => {
        console.log(data)
        displayRecommendation(data, i)
    })
}

let displayRecommendation = (data, i) => {
    document.getElementById('question').innerHTML = `<h2>${data.results[i].title}</h2>`
    document.getElementById('answerdiv').innerHTML = `<img style="width:300px; height:350px;" src='https://image.tmdb.org/t/p/original${data.results[i].poster_path}'>`
}