//initializes base urls for API calls
let APICall =`https://api.themoviedb.org/3/discover/movie?api_key=b332e1524f2736dabcb7c80b39ae8146`
let DogAPI = `https://dog.ceo/api/breeds/image/random`
// initalizes an array to store user answers to quiz
let userAnswers = [];
// initializes an array to store genres from user answers
let userGenres = [];
//sets an empty string to contain dogpic url
let dogPic = ``;
//creates object to store userQuestions and answer sets for each part of the quiz
let userQuestions = {
    1: {
        question : `How much time do you have?`,
        answers : [`Not a lot`, `Too much`]
    },
    2: {
        question : `Something old or something new?`,
        answers : [`Classic`, `Modern`]
    },
    3: {
        question : `What are you in the mood for?`,
        answers : [`Laughter`, `Tears`, `Frights`, `Adventures`, `New Ideas`]
    },
}

//creates a map to equate genres with their ids for API call
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
    let currentQuestion = userQuestions[num]
    //Displays question to user
    document.getElementById('question').innerHTML = `<h2>${currentQuestion.question}</h2>`
    //Loops through length of answers, accessing divs and inputting answer pictures and descriptions
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        document.getElementById(`ans${i}`).innerHTML = `<img class="img-thumbnail" class="answers" onClick="getAnswer(${num}, ${i})" src="assets/q${num + 1}a${i+1}.png"></img>
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

// adds language to API
function language(){
    return `&with_original_language=en`
}

// filters shorter movies for people without a lot of time
let addLength = (userAnswers) => {
    if (userAnswers[0] == `Not a lot`){return '&with_runtime.lte=120'}
    else{return ``}
}

//sets window for release dates
let addRelease = (userAnswers) => {
    if (userAnswers[1] == `Classic`) {return '&primary_release_date.gte='+1980+'&primary_release_date.lte='+2006}
    else {return '&primary_release_date.gte='+2006+'&primary_release_date.lte='+2022}
}

//converts user input to genre lists
let getGenres = (userAnswers) => {
        switch (userAnswers[2]) {
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
    return userGenres
}

// adds genres to API  call
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

//assembles the URL for API call using above functions
let assembleURL = (userAnswers) => {
    console.log("this is userAnswers:"+userAnswers)
    APICall = APICall +language() + addLength(userAnswers) + addRelease(userAnswers) + addGenres(getGenres(userAnswers))
    getMovies(APICall)
}

//calls the API to get a list of movies with required specifications
let getMovies = (APICall) => {
    console.log(APICall)
    fetch(APICall)
    //converts to JSON
    .then(response => {
        let movies = response.json()
        return movies
    })
    //uses JSON to choose a random movie from list and display
    .then(data => {
        console.log(data)
        movieData = data
        index = Math.floor(Math.random() * 20)
        displayRecommendation(movieData, index)
    })
}

//takes in release date from API object and returns just the year
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

//sets up function to generate random dog picture
let getDog = (DogAPI) => {
    fetch(DogAPI)
    .then(response => {
        let dogs = response.json()
        return dogs
    })
    .then(dogs => {
        dogPic = dogs.message
        console.log(dogPic)
    })
}

//calls the getDog function to save dogPic url
getDog(DogAPI)

//changes innerHTML of page to load the display screen. Uses variables to display movie info and displays a random dog image for fun.
let displayRecommendation = (data, index) => {
    document.getElementById('question').innerHTML = ``
    document.getElementById('answerdiv').innerHTML = ``
    document.getElementById(`main`).innerHTML = `<div class="row">
    <div id="postercard" class="col-md-3">
        <img id="poster" alt="movieposter" src="https://www.themoviedb.org/t/p/w1280${data.results[index].poster_path}"
            class="img-thumbnail" />
    </div>
    <div id="movieinfo" class="col-md-8">
        <h3 id="movietitle">
            ${data.results[index].title}</h3>
        <span id="releasedYear" class="badge badge-info">${getReleaseYear(data, index)}</span>
        <p>
            ${data.results[index].overview}
        </p>
    </div>
    <div id='dogDiv'><img src='${dogPic}' id='dogPic'></div>`
 }