let APICall =`https://api.themoviedb.org/3/discover/movie?api_key=b332e1524f2736dabcb7c80b39ae8146`
//let Apicall2`https://api.themoviedb.org/3/discover/`
// initalizes an array to store user answers to quiz
let userAnswers = [];
let userGenres = [];
let movieData
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
genres.set(`Mystery`, `9648`);
genres.set(`ActionAndAdventure`, `10759`);

// Displays the current quiz question and answer set by taking in the question number
let displayQuiz = (num) => {
    //Gets object for current question
    let currentQuestion = userQuestions[num]
    //Displays question to user
    document.getElementById('question').innerHTML = `<h2>${currentQuestion.question}</h2>`
    //Loops through length of answers, accessing divs and inputting answer pictures and descriptions
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        document.getElementById(`ans${i}`).innerHTML = `<img class="img-thumbnail" class="answers" onClick="getAnswer(${num}, ${i})" src="assets/q${num}a${i+1}.png"></img>
        <p>${currentQuestion.answers[i]}</p>`
    }
}

//Gets called when user clicks on image, output depends on question and answer numbers
let getAnswer = (q, a) => {
    //grabs answer and pushes it to userAnswers array
    userAnswers.push(userQuestions[q].answers[a]);
    //if there's another question to be called, calls it.
    if (q < Object.keys(userQuestions).length){
        if (q == Object.keys(userQuestions).length - 1){
            document.getElementById(`answerdiv`).innerHTML = `<div id="ans0">
            </div>
            <div id="ans1">
            </div>
            <div id="ans2">
            </div>
            <div id="ans3">
            </div>
            <div id="ans4">
            </div>`
        }
        displayQuiz(q + 1)
    }
    //once there are no more userQuestions, call the function to generate recommendations and display to user.
    else if (q == Object.keys(userQuestions).length){assembleURL(userAnswers)}
}

// initializes default to first question
displayQuiz(1);

let checkMovie = (userAnswers) => {
    if (userAnswers[0] == `Movie`){
        return true
    }
}
function addMovieOrTV(){
    if(userAnswers[0]==`Movie`){return `movie?movie?api_key=b332e1524f2736dabcb7c80b39ae8146`}
    else{return `tv?movie?api_key=b332e1524f2736dabcb7c80b39ae8146`}
}

function language(){
    return `&with_original_language=en`
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
    console.log("this is movie:"+movie)
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
                userGenres = [`Comedy`];
                break;
            case `Tears`:
                userGenres = [`Drama`];
                break;
            case `Frights`:
                userGenres = [`Mystery`];      //Mystery    9648 TV does Not have horror :(
                break;
            case `Adventures`:
                userGenres = [`ActionAndAdventure`];
                break;
            case `New Ideas`:
                userGenres = [`Documentary`];
                break;
        }
    }
    return userGenres
}

let addGenres = (userGenres) => {
    console.log("this is userGenres"+userGenres)
    let genreURL = '';
    for (i = 0; i < userGenres.length; i++)
        if (i == 0) {
            genreURL = `&with_genres=${genres.get(userGenres[i])}`   
            console.log(genreURL)
        }
        else {
            genreURL = genreURL + `,${genres.get(userGenres[i])}`    
            console.log(genreURL)
        }
        return genreURL
}

let assembleURL = (userAnswers) => {
    console.log("this is userAnswers:"+userAnswers)
    movie = checkMovie(userAnswers)
    APICall = APICall +language() + addLength(userAnswers) + addRelease(userAnswers) + addGenres(getGenres(userAnswers, movie))
    getMovies(APICall)
}

let getMovies = (APICall) => {
    console.log(APICall)
    fetch(APICall)
    .then(response => {
        let movies = response.json()
        return movies
    })
    .then(data => {
        console.log(data)
        movieData = data
        displayRecommendation(data, 0)
    })
}

let getReleaseYear = (data, i) => {
    let year = ``
    array = data.results[i].release_date.split('')
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '-'){
            break
        }
        year = year + array[i]
    }
    return year
}

let displayRecommendation = (data, i) => {

    document.getElementById('question').innerHTML = ``
    document.getElementById('answerdiv').innerHTML = ``
    document.getElementById(`main`).innerHTML = `<div class="row">
    <div id="postercard" class="col-md-3">
        <img id="poster" alt="movieposter" src="https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg"
            class="img-thumbnail" />
    </div>
    <div class="col-md-8">
        <h3 id="movietitle">
            ${data.results[i].title}</h3>
        <span id="releasedYear" class="badge badge-info">${getReleaseYear(data, i)}</span><span id="movieRating"
            class="badge badge-info">PG-13</span><span id="movieGenre1"
            class="badge badge-pill badge-light">Comedy</span><span id="movieRuntime"
            class="badge badge-pill badge-light">Runtime:</span>
        <p>
            ${data.results[i].overview}
        </p>
        <button onclick="nextButton(i)">Click me</button>
        <div id="previousNext" class="btn-group" role="group">
            <button id="previousMovie" class="btn btn-secondary" onClick="previousButton(i)">
                Previous
            </button>
            <button id="nextMovie" class="btn btn-secondary" onClick="nextButton(i)">
                Next
            </button>      
        </div>
    </div>
</div>`
}
// let getFinishTime = (data, i) => {
//     let finish = daysjs().add(data.results[i].runtime, 'minute')

// }

function nextButton(i) {
    i++
    displayRecommendation(movieData, i)
}
function previousButton(i) {
    if(i <=0){return}
    else{  i--
        displayRecommendation(movieData, i)
    }
}

//    will fix in the morning this will display new api data
// function creatingApiForOMDB(movieData){
//     currentMovieTitle = movieData.results[i].title
//     detailsAPICall += OMDb_api_Key+"&"+currentMovieTitle
//     getMoviesDetails(detailsAPICall)
// }

// let getMoviesDetails = (detailsAPICall) => {
//     fetch(detailsAPICall)
//     .then(response => {
//         console.log(response.json())
//         //let movies = response.json()
//         return movies
//     })
//     .then(data => {
//         console.log(data)
//         movieData = data
//     })
// }

//TODO fix genres -Done
//TODO fix language -Done
//TODO made movie display cycle -Done
//TODO add TV Shows feature -Done
//TODO add second api to pull rotton tomato score


