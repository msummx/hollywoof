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