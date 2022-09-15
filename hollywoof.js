let currentbaseApiCall ='https://api.themoviedb.org/3/discover/movie?api_key='
//let currentbaseApiCall =`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API}`
let configuration = 'https://api.themoviedb.org/3/configuration?api_key='
let moreThanOneCatagory = false;
let currentPage = 0;
let columnNumber = 1;
let movieList1 = document.getElementById('listResults1');

const horrorBox = document.querySelector('#horrorCheck');
const comedyBox = document.querySelector('#comedyCheck');
const dramaBox = document.querySelector('#dramaCheck');
const crimeBox = document.querySelector('#crimeCheck');
const fantasyBox = document.querySelector('#fantasyCheck');
const thrillerBox = document.querySelector('#thrillerCheck');
const scienceFictionBox = document.querySelector('#scienceFictionCheck');
const actionBox = document.querySelector('#actionCheck');
const adventureBox = document.querySelector('#adventureCheck');
const animationBox = document.querySelector('#animationCheck');
const mysteryBox = document.querySelector('#mysteryCheck');
const romanceBox = document.querySelector('#romanceCheck');
const warBox = document.querySelector('#warCheck');
const documentaryBox = document.querySelector('#documentaryCheck');
const westernBox = document.querySelector('#westernCheck');
const historyBox = document.querySelector('#historyCheck');
const tvBox = document.querySelector('#tvCheck');

//these below are TV only
// const actionAndAdventureTVBox = document.querySelector('#actionAndAdventureTVCheck');
// const addWarAndPoliticsTVBox = document.querySelector('#addWarAndPoliticsTVCheck');
// const NewsTVBox = document.querySelector('#NewsTVCheck');
// const realityTVBox = document.querySelector('#realityTVCheck');
// const addSciFiAndFantasyTVBox = document.querySelector('#addSciFiAndFantasyTVCheck');
// const soapTVBox = document.querySelector('#SoapTVCheck');
// const kidsTVBox = document.querySelector('#kidsTVCheck');
// const talkTVBox = document.querySelector('#talkTVCheck');
// these above are TV only

function getMoviesOrTVShows(){
    tvShows = 'tv'
    currentbaseApiCall ='https://api.themoviedb.org/3/discover/'+ tvShows +'?api_key=55825d24c64a739bb6707335b1645b0c'
}
function getMoviesByMPAARating(){//Motion Picture Association of America (MPAA)
    //certification.gte  -string only include movies that have a certification that is greater than or equal to the specified value.
    //certification.lte  -string Filter and only include movies that have a certification that is less than or equal to the specified value.
    //certification      -string Filter results with a valid certification from the 'certification_country' field.
    //include_video      -boolean
    //include_adult      -boolean A filter and include or exclude adult movies.
    ratingSystem = '&certification_country=en&include_adult=false'
    currentbaseApiCall = currentbaseApiCall + ratingSystem 
    console.log("this is the movie MPAA rating:")
}
function getMoviesbyLanguage(){
    Language = '&with_original_language=en'
    currentbaseApiCall = currentbaseApiCall + Language
}
function movieLength(){
    //not alot of time <less than 2hr
    shortTime = '&with_runtime.lte=120'
    //if you want short and long movies dont call shortTime
    currentbaseApiCall = currentbaseApiCall + shortTime
}
function yearOfMovies(fromYear,toYear){//old dog = old movies, new dog =last 10years
    oldDog ='&primary_release_date.gte='+1980+'&primary_release_date.lte='+2006
    newDog = '&primary_release_date.gte='+2012+'&primary_release_date.lte='+2022
    theDates = '&primary_release_date.gte='+fromYear+'&primary_release_date.lte='+toYear
    currentbaseApiCall = currentbaseApiCall + theDates
}
function addingCategoriesToApiCall(){
    if(tvBox.checked){getMoviesOrTVShows()}
    if(dramaBox.checked){addDrama()};
    if(horrorBox.checked){addHorror()};
    if(comedyBox.checked){addComedy()};
    if(actionBox.checked){addAction()};
    if(thrillerBox.checked){addThriller()};
    if(fantasyBox.checked){addFantasy()};
    if(crimeBox.checked){addCrime()};
    if(scienceFictionBox.checked){addScienceFiction()};
    if(adventureBox.checked){addAdventure()};
    if(animationBox.checked){addAnimation()};
    if(mysteryBox.checked){addMystery()};
    if(romanceBox.checked){addRomance()};
    if(warBox.checked){addWar()};
    if(documentaryBox.checked){addDocumentary()}
    if(westernBox.checked){addWestern()}
    if(historyBox.checked){addHistory()}
    yearOfMovies(1980,2006)
    getMoviesbyLanguage()
    getMoviesByMPAARating()
}
// function addActionAndAdventureTV(){
//     if(moreThanOneCatagory){
//         actionAndAdventure = ',10759'
//         currentbaseApiCall = currentbaseApiCall + actionAndAdventure
//         return currentbaseApiCall
//     }
//     else{
//         actionAndAdventure = '&with_genres=10759'
//         currentbaseApiCall = currentbaseApiCall + actionAndAdventure
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addWarAndPoliticsTV(){
//     if(moreThanOneCatagory){
//         warAndPolitics = ',10768'
//         currentbaseApiCall = currentbaseApiCall + warAndPolitics
//         return currentbaseApiCall
//     }
//     else{
//         warAndPolitics = '&with_genres=10768'
//         currentbaseApiCall = currentbaseApiCall + warAndPolitics
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addNewsTV(){
//     if(moreThanOneCatagory){
//         news = ',10763'
//         currentbaseApiCall = currentbaseApiCall + news
//         return currentbaseApiCall
//     }
//     else{
//         news = '&with_genres=10763'
//         currentbaseApiCall = currentbaseApiCall + news
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addrealityTV(){
//     if(moreThanOneCatagory){
//         reality = ',10764'
//         currentbaseApiCall = currentbaseApiCall + reality
//         return currentbaseApiCall
//     }
//     else{
//         reality = '&with_genres=10764'
//         currentbaseApiCall = currentbaseApiCall + reality
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addSciFiAndFantasyTV(){
//     if(moreThanOneCatagory){
//         sciFiAndFantasy = ',10765'
//         currentbaseApiCall = currentbaseApiCall + sciFiAndFantasy
//         return currentbaseApiCall
//     }
//     else{
//         sciFiAndFantasy = '&with_genres=10765'
//         currentbaseApiCall = currentbaseApiCall + sciFiAndFantasy
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addSoapTV(){
//     if(moreThanOneCatagory){
//         soap = ',10766'
//         currentbaseApiCall = currentbaseApiCall + soap
//         return currentbaseApiCall
//     }
//     else{
//         soap = '&with_genres=10766'
//         currentbaseApiCall = currentbaseApiCall + soap
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addKidsTV(){
//     if(moreThanOneCatagory){
//         kids = ',10762'
//         currentbaseApiCall = currentbaseApiCall + kids
//         return currentbaseApiCall
//     }
//     else{
//         kids = '&with_genres=10762'
//         currentbaseApiCall = currentbaseApiCall + kids
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addTalk(){
//     if(moreThanOneCatagory){
//         talk = ',10767'
//         currentbaseApiCall = currentbaseApiCall + talk
//         return currentbaseApiCall
//     }
//     else{
//         talk = '&with_genres=10767'
//         currentbaseApiCall = currentbaseApiCall + talk
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
// function addFamily(){
//     if(moreThanOneCatagory){
//         family = ',10751'
//         currentbaseApiCall = currentbaseApiCall + family
//         return currentbaseApiCall
//     }
//     else{
//         family = '&with_genres=10751'
//         currentbaseApiCall = currentbaseApiCall + family
//         return currentbaseApiCall, moreThanOneCatagory = true
//     }
// }
function addDrama(){
    if(moreThanOneCatagory){
        drama = ',18'
        currentbaseApiCall = currentbaseApiCall + drama
        return currentbaseApiCall
    }
    else{
        drama = '&with_genres=18'
        currentbaseApiCall = currentbaseApiCall + drama
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addCrime(){
    if(moreThanOneCatagory){
        crime = ',80'
        currentbaseApiCall = currentbaseApiCall + crime
        return currentbaseApiCall
    }
    else{
        crime = '&with_genres=80'
        currentbaseApiCall = currentbaseApiCall + crime
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addAction(){
    if(moreThanOneCatagory){
        action = ',28'
        currentbaseApiCall = currentbaseApiCall + action
        return currentbaseApiCall
    }
    else{
        action = '&with_genres=28'
        currentbaseApiCall = currentbaseApiCall + action
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addThriller(){
    if(moreThanOneCatagory){
        thiller = ',53'
        currentbaseApiCall = currentbaseApiCall + thiller
        return currentbaseApiCall
    }
    else{
        thiller = '&with_genres=53'
        currentbaseApiCall = currentbaseApiCall + thiller
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addScienceFiction(){
    if(moreThanOneCatagory){
        scienceFiction = ',878'
        currentbaseApiCall = currentbaseApiCall + scienceFiction
        return currentbaseApiCall
    }
    else{
        scienceFiction = '&with_genres=878'
        currentbaseApiCall = currentbaseApiCall + scienceFiction
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addComedy(){
    if(moreThanOneCatagory){
        comedy = ',35'
        currentbaseApiCall = currentbaseApiCall + comedy
        return currentbaseApiCall
    }
    else{
        comedy = '&with_genres=35'
        currentbaseApiCall = currentbaseApiCall + comedy
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addFantasy(){
    if(moreThanOneCatagory){
        fantasy = ',14'
        currentbaseApiCall = currentbaseApiCall + fantasy
        return currentbaseApiCall
    }
    else{
    fantasy = '&with_genres=14'
    currentbaseApiCall = currentbaseApiCall + fantasy
    return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addHorror(){
    if(moreThanOneCatagory){
        horror = ',27'
        currentbaseApiCall = currentbaseApiCall + horror
        return currentbaseApiCall
    }
    else{
        horror = '&with_genres=27'
        currentbaseApiCall = currentbaseApiCall + horror
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addAdventure(){
    if(moreThanOneCatagory){
        adventure = ',12'
        currentbaseApiCall = currentbaseApiCall + adventure
        return currentbaseApiCall
    }
    else{
        adventure = '&with_genres=12'
        currentbaseApiCall = currentbaseApiCall + adventure
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addAnimation(){
    if(moreThanOneCatagory){
        animation = ',16'
        currentbaseApiCall = currentbaseApiCall + animation
        return currentbaseApiCall
    }
    else{
        animation = '&with_genres=16'
        currentbaseApiCall = currentbaseApiCall + animation
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addMystery(){
    if(moreThanOneCatagory){
        mystery = ',9648'
        currentbaseApiCall = currentbaseApiCall + mystery
        return currentbaseApiCall
    }
    else{
        mystery = '&with_genres=9648'
        currentbaseApiCall = currentbaseApiCall + mystery
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addRomance(){
    if(moreThanOneCatagory){
        horror = ',10749'
        currentbaseApiCall = currentbaseApiCall + horror
        return currentbaseApiCall
    }
    else{
        horror = '&with_genres=10749'
        currentbaseApiCall = currentbaseApiCall + horror
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addWar(){
    if(moreThanOneCatagory){
        war = ',10752'
        currentbaseApiCall = currentbaseApiCall + war
        return currentbaseApiCall
    }
    else{
        war = '&with_genres=10752'
        currentbaseApiCall = currentbaseApiCall + war
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addDocumentary(){
    if(moreThanOneCatagory){
        documentary = ',99'
        currentbaseApiCall = currentbaseApiCall + documentary
        return currentbaseApiCall
    }
    else{
        documentary = '&with_genres=99'
        currentbaseApiCall = currentbaseApiCall + documentary
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addHistory(){
    if(moreThanOneCatagory){
        history = ',36'
        currentbaseApiCall = currentbaseApiCall + history
        return currentbaseApiCall
    }
    else{
        history = '&with_genres=36'
        currentbaseApiCall = currentbaseApiCall + history
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function addWestern(){
    if(moreThanOneCatagory){
        western = ',37'
        currentbaseApiCall = currentbaseApiCall + western
        return currentbaseApiCall
    }
    else{
        western = '&with_genres=37'
        currentbaseApiCall = currentbaseApiCall + western
        return currentbaseApiCall, moreThanOneCatagory = true
    }
}
function movieOverView(movieData){
    console.log(movieData.overview)
}
function turnGenreIdIntoWords(genreIDs){
    let genreNames=''
    for (let index = 0; index < genreIDs.length; index++) {
        if(genreIDs[index]==27){genreNames = genreNames + "/horror"}
        if(genreIDs[index]==14){genreNames = genreNames + "/fantasy"}
        if(genreIDs[index]==35){genreNames = genreNames + "/comedy"}
        if(genreIDs[index]==878){genreNames = genreNames + "/scienceFiction"}
        if(genreIDs[index]==80){genreNames = genreNames + "/crime"}
        if(genreIDs[index]==18){genreNames = genreNames + "/Drama"}
        if(genreIDs[index]==28){genreNames = genreNames + "/action"}
        if(genreIDs[index]==53){genreNames = genreNames + "/thiller"}
        if(genreIDs[index]==12){genreNames = genreNames + "/adventure"}
        if(genreIDs[index]==16){genreNames = genreNames + "/animation"}
        if(genreIDs[index]==9648){genreNames = genreNames + "/mystery"}
        if(genreIDs[index]==10749){genreNames = genreNames + "/romance"}
        if(genreIDs[index]==10752){genreNames = genreNames + "/war"}
    }
    return genreNames
}
function forDeveloperDisplayNotes(dataToDisplay){
    let genreName = ''
    for (let index = 0; index < dataToDisplay.results.length; index++) {
        movieOverView(dataToDisplay.results[index])
        console.log(dataToDisplay.results[index].title +' /'+dataToDisplay.results[index].release_date+"/movie Id:"+ dataToDisplay.results[index].id)
        genreName = turnGenreIdIntoWords(dataToDisplay.results[index].genre_ids)
        console.log("%cgenres include:"+ genreName, 'background: #222; color: #bada55');
    }
}
function displayMoviePoster(movieData, index,movieList){
    let baseUrlImage = 'https://image.tmdb.org/t/p/original' 
    let moviePath = movieData.results[index].poster_path
    let newPoster = document.createElement("img")
    newPoster.width = 300
    newPoster.height = 350
    newPoster.src = baseUrlImage + moviePath
    movieList.append(newPoster)
}
function displayMovieTitle(movieData,movieList){
    for (let index = 0; index < movieData.results.length; index++) {
        const newMovie = document.createElement("li")
        newMovie.innerText = movieData.results[index].title
        movieList.append(newMovie)
        displayMoviePoster(movieData,index,movieList)
    }
}
const getMovies = () => {
    addingCategoriesToApiCall()
    fetch(currentbaseApiCall)
    .then(response => {
        let movies = response.json()
        return movies
    })
    .then(data => {
        console.log(data)
        displayMovieTitle(data,movieList1)
        forDeveloperDisplayNotes(data)
    })
}

// initalizes an array to store user answers to quiz
let userAnswers = [];

//creates object to store questions and answer sets for each part of the quiz
let questions = {
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

// Displays the current quiz question and answer set by taking in the question number
let displayQuiz = (num) => {
    //Gets object for current question
    currentQuestion = questions[num]
    //Displays question to user
    document.getElementById('question').innerHTML = `${currentQuestion.question}`
    //Loops through length of answers, accessing divs and inputting answer pictures and descriptions
    for (i = 0; i < currentQuestion.answers.length; i++) {
        document.getElementById(`ans${i}`).innerHTML = `<img class="answers" onClick="getAnswer(${num}, ${i})" src="assets/q${num}a${i+1}.png"></img>
        <p>${currentQuestion.answers[i]}</p>`
    }
}

//Gets called when user clicks on image, output depends on question and answer numbers
let getAnswer = (q, a) => {
    //grabs answer and pushes it to userAnswers array
    userAnswers.push(questions[q].answers[a]);
    //if there's another question to be called, calls it.
    if (q < Object.keys(questions).length){
        displayQuiz(q + 1);
    }
    //once there are no more questions, call the function to generate recommendations and display to user.
    else if (q == Object.keys(questions).length){
        console.log('Will move on to movie generation/display.')
    }
}

// initializes default to first question
displayQuiz(1);
