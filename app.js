let word, remainingBlankLetters, guessCount, wrongGuesses, correctGuesses, winCount = 0, loseCount = 0, answerArray = [];
const xmasString = "On the first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth day of Christmas my true love sent to me: Twelve Drummers Drumming, Eleven Pipers Piping, Ten Lords a Leaping, Nine Ladies Dancing, Eight Maids a Milking, Seven Swans a Swimming, Six Geese a Laying, Five Golden Rings, Four Calling Birds, Three French Hens, Two Turtle Doves, and a Partridge in a Pear Tree!"

let wrongGuessRegex = />/
let correctGuessRegex = />/

const randomWordFromStr = (string) => {
    const notLetter = /[0123456789!#%',.:?]/g;
    let words = string.toLowerCase().replace(notLetter, '').split(' ');
    return words[Math.floor(Math.random() * words.length)]
}

const createWord = () => {
    word = randomWordFromStr(xmasString).split('')
    answerArray = word.map(index => index = "_")
    guessCount = 0
    remainingBlankLetters = word.length
    console.log(word.join(''))
    return word
}

const buildPage = () => {
    createWord()
    const wordDiv = document.querySelector('#wordDiv')
    wordDiv.innerHTML = ''
    wordDiv.appendChild(document.createTextNode(`${answerArray.join(' ')}`))
    document.querySelector('#guess-count').innerHTML = `${12 - guessCount}`
    document.querySelector('#Ellipse_1').style.visibility = 'hidden'
    document.querySelector('#Ellipse_3').style.visibility = 'hidden'
    document.querySelector("#Ellipse_2").style.visibility = 'hidden'
    document.querySelector("#Group_2").style.visibility = 'hidden'
    document.querySelector("#Group_4").style.visibility = 'hidden'
    document.querySelector("#Ellipse_11").style.visibility = 'hidden'
    document.querySelector("#Ellipse_13").style.visibility = 'hidden'
    document.querySelector("#Ellipse_12").style.visibility = 'hidden'
    document.querySelector("#Ellipse_4").style.visibility = 'hidden'
    document.querySelector("#Ellipse_5").style.visibility = 'hidden'
    document.querySelector("#Group_5").style.visibility = 'hidden'
    document.querySelector("#Polygon_1").style.visibility = 'hidden'
    document.querySelector("#Path_1").style.visibility = 'hidden'
    document.querySelector("#Group_6").style.visibility = 'hidden'
    document.querySelector('#wrong').innerHTML = ''
    document.querySelector('#user-guess').readOnly = false
    document.querySelector('#user-guess').focus()
}

buildPage()

const resetGame = () => {
    if (confirm("Are you sure? Resetting the game will count as a loss")){
        loseCount++
        document.querySelector('#lose-ticker').innerHTML = `${loseCount}`
        buildPage()
    }
}




const checkGuess = (guess) => {
    if (guess.length !== 1 || /[A-Za-z]/.test(guess) === false) {
        alert('Please enter a single letter')
    } else if (wrongGuessRegex.test(guess) === true || correctGuessRegex.test(guess) === true) {
        alert('Please enter a new letter')
    } else {
        let currentRemainingLetters = remainingBlankLetters
        for(let i = 0; i < word.length; i ++) {
            if(word[i] === guess) {
                answerArray[i] = guess
                remainingBlankLetters --
            }
        }
        if(currentRemainingLetters === remainingBlankLetters) {
            guessCount++
            document.querySelector('#wrong').innerHTML += ` ${guess} `
            if(guessCount === 1){
                document.querySelector('#Ellipse_1').style.visibility = 'visible'
            } else if (guessCount === 2){
                document.querySelector('#Ellipse_3').style.visibility = 'visible'
            } else if (guessCount === 3){
                document.querySelector('#Ellipse_2').style.visibility = 'visible'
            } else if (guessCount === 4){
                document.querySelector('#Group_2').style.visibility = 'visible'
            } else if (guessCount === 5){
                document.querySelector('#Group_4').style.visibility = 'visible'
            } else if (guessCount === 6){
                document.querySelector('#Ellipse_11').style.visibility = 'visible'
                document.querySelector('#Ellipse_12').style.visibility = 'visible'
                document.querySelector('#Ellipse_13').style.visibility = 'visible'
            } else if (guessCount === 7){
                document.querySelector('#Ellipse_4').style.visibility = 'visible'
            } else if (guessCount === 8){
                document.querySelector('#Ellipse_5').style.visibility = 'visible'
            } else if (guessCount === 9){
                document.querySelector('#Group_5').style.visibility = 'visible'
            } else if (guessCount === 10){
                document.querySelector('#Polygon_1').style.visibility = 'visible'
            } else if (guessCount === 11){
                document.querySelector('#Path_1').style.visibility = 'visible'
            } else if (guessCount === 12){
                document.querySelector('#Group_6').style.visibility = 'visible'
            } 
        }
        }
        document.querySelector('#user-guess').value = ''
}

const checkForEnd = () => {
    wrongGuesses = document.getElementById('wrong').textContent.split(" ").join("")
    wrongGuessRegex = new RegExp(`[${wrongGuesses}]`);
    
    correctGuesses = answerArray.join()
    correctGuessRegex = new RegExp(`[${correctGuesses}]`);

    if(answerArray.join() === word.join()){
        document.querySelector('#user-guess').readOnly = true
        setTimeout(()=>{
            alert(`You win! The answer was "${word.join('')}"`)
            buildPage()
        })
        wrongGuessRegex = />/
        correctGuessRegex = />/
        winCount++
        // document.querySelector('#win-ticker').innerHTML = ` `
        document.querySelector('#win-ticker').innerHTML = `${winCount}`
    } else if (guessCount === 12) {
        document.querySelector('#user-guess').readOnly = true
        setTimeout(()=>{
            alert(`You lose! The answer was "${word.join('')}"`)
            buildPage()
        }, 500)
        wrongGuessRegex = />/
        correctGuessRegex = />/
        loseCount++
        document.querySelector('#lose-ticker').innerHTML = `${loseCount}`
    }
}

const snowPerson = (guess) => {
    guess = document.querySelector('#user-guess').value.toLowerCase()
    checkGuess(guess)
    document.querySelector('#guess-count').innerHTML = `${12 - guessCount}`
    const wordDiv = document.querySelector('#wordDiv')
    wordDiv.innerHTML = ''
    wordDiv.appendChild(document.createTextNode(`${answerArray.join(' ')}`))
    checkForEnd()
}