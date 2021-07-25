const gameObject = [{
    question: 'select animals',
    all_words: [
        "hole",
        "sofa",
        "pear",
        "tiger",
        "oatmeal",
        "square",
        "nut",
        "cub",
        "shirt",
        "tub",
        'passenger',
        'co'
    ],
    good_words: [
        "tiger",
        "cow",
    ]
},
{
    question: 'select colors',
    all_words: [
        "jeans",
        "existence",
        "ink",
        "red",
        "blue",
        "yellow",
        "laugh",
        "behavior",
        "expansion",
        "white",
        'black',
        'cake'
    ],
    good_words: [
        "red",
        'blue',
        'yellow',
        'white',
        'black'
    ]
},
{
    question: 'select vehicles',
    all_words: [
        "belief",
        "wire",
        "car",
        "bus",
        "star",
        "river",
        "hat",
        "skirt",
        "train",
    ],
    good_words: [
        "car",
        'bus',
        'train'
    ]
}];


//init variables
let sections,
    currentSection = 0,
    userName,
    userNameInput,
    errorMessage,
    gameGoal;

//boarGame variables
let scoreParagraph,
    boardGame,
    gameStart = false,
    gameDetails,
    newGameSpan,
    randomGamePick,
    boardWidth,
    boardHeight,
    divCordinates = [],
    spanCordinates = [],
    currentFilledX = [],
    currentFilledY = [],
    spanHeight,
    spanWidth,
    startPostionX,
    startPostionY,
    checkElementIsInArrayWidth,
    checkElementIsInArrayHeight,
    resetPostionNeed,
    iteratorY,
    iteratorX,
    correctAnswers = [];

//game variables
let boardSpans,
    score = 0,
    activeAnswers = [];

window.onload = (e) => {
    section = document.querySelectorAll('section');
    playButton = document.getElementById('play');
    finishButton = document.getElementById('finish');
    checkButton = document.getElementById('check');
    boardGame = document.getElementById("board");
    gameGoal = document.getElementById("game_title");
    scoreParagraph = document.getElementById("score");
    userNameInput = document.getElementById("nameInput");
    errorMessage = document.getElementsByClassName("error-message");
    section[0].classList.add("active");

    playButton.onclick = () => {
        // if(userNameInput.value == ''){
        //     userNameInput.classList.add("error-input");
        //     errorMessage[0].style.display = 'block';
        // }else{
        // errorMessage[0].style.display = 'none';
        // userNameInput.classList.remove("error-input");
        userName = userNameInput.value;
        console.log(userName);
        sectionVisilityChange();
        divCordinates = createCordinatesFromElement(boardGame);
        gameInit();
        boardSpans = document.querySelectorAll("#board span");
        gameHandler(boardSpans);
        // }
    };
    checkButton.onclick = () => {
        gameCheck();
    };
    finishButton.onclick = sectionVisilityChange;
};

// buttonsNext.onclick = sectionVisilityChange;
const sectionVisilityChange = () => {
    section[currentSection].classList.remove("active");
    currentSection++;
    section[currentSection].classList.add('active');
};

const gameInit = () => {
    gameStart = true;
    randomGamePick = Math.round(Math.random() * (gameObject.length - 1));
    gameDetails = gameObject[randomGamePick];
    gameGoal.innerHTML = gameDetails.question;
    for (let i in gameDetails.good_words) {
        correctAnswers.push(gameDetails.good_words[i]);
    }
    fillBoard(gameDetails.all_words);

    // startGame();

};

const gameCheck = () => {
    checkAnwsersCorrection();
    checkButton.style.display = 'none';
    finishButton.style.display = 'block';
};


// ██████╗  █████╗ ███╗   ██╗██████╗  ██████╗ ███╗   ███╗██╗███████╗███████╗    ██████╗  ██████╗ ███████╗██╗████████╗██╗ ██████╗ ███╗   ██╗     ██████╗ ███╗   ██╗    ██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
// ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔═══██╗████╗ ████║██║╚══███╔╝██╔════╝    ██╔══██╗██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔═══██╗████╗  ██║    ██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
// ██████╔╝███████║██╔██╗ ██║██║  ██║██║   ██║██╔████╔██║██║  ███╔╝ █████╗      ██████╔╝██║   ██║███████╗██║   ██║   ██║██║   ██║██╔██╗ ██║    ██║   ██║██╔██╗ ██║    ██████╔╝██║   ██║███████║██████╔╝██║  ██║
// ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██║   ██║██║╚██╔╝██║██║ ███╔╝  ██╔══╝      ██╔═══╝ ██║   ██║╚════██║██║   ██║   ██║██║   ██║██║╚██╗██║    ██║   ██║██║╚██╗██║    ██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
// ██║  ██║██║  ██║██║ ╚████║██████╔╝╚██████╔╝██║ ╚═╝ ██║██║███████╗███████╗    ██║     ╚██████╔╝███████║██║   ██║   ██║╚██████╔╝██║ ╚████║    ╚██████╔╝██║ ╚████║    ██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝    ╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 


const fillBoard = (words) => {
    words.forEach((word, index) => {
        newGameSpan = document.createElement('span');
        newGameSpan.innerHTML = word;
        newGameSpan.id = `option-${index}`;
        newGameSpan.style.display = 'inline-block';
        newGameSpan.style.position = 'absolute';
        boardGame.append(newGameSpan);
        randomizePosition(newGameSpan);
    });
};

const randomizePosition = (elementToPlace) => {
    e = elementToPlace;
    spanWidth = Math.round(e.getBoundingClientRect().width);
    spanHeight = Math.round(e.getBoundingClientRect().height);
    e.style.top = Math.round(Math.random() * boardHeight);
    e.style.left = Math.round(Math.random() * boardWidth);
    startPostionY = e.offsetTop;
    startPostionX = e.offsetLeft;
    endPositionY = startPostionY + spanHeight;
    endPositionX = startPostionX + spanWidth;
    // console.log(e.id);
    // console.log(`h:${spanHeight}`,`w:${spanWidth}`,`t:${startPostionX}`,`l:${startPostionY}`);
    // console.log("top",endPositionY);
    // console.log("left", endPositionX);
    // console.log(boardHeight,boardWidth);
    if (endPositionY + 10 >= boardHeight || endPositionX + 10 >= boardWidth) {
        randomizePosition(e);
    } else {
        putToEmptyPostition(divCordinates, startPostionX, startPostionY, spanWidth, spanHeight, e);
    }
};

const createCordinatesFromElement = (ele) => {
    boardWidth = Math.round(ele.getBoundingClientRect().width);
    boardHeight = Math.round(ele.getBoundingClientRect().height);
    let array = [];
    for (let i = 0; i < boardHeight; i++) {
        array[i] = [];
        for (let j = 0; j < boardWidth; j++) {
            array[i][j] = 0;
        }
    }
    return array;
};

const putToEmptyPostition = (array, leftPosition, topPosition, width, height, element) => {
    // console.log(`w: ${width}`, `h: ${height}`, `t:${topPosition}`, `l:${leftPosition}`, element.id);
    iteratorY = topPosition + height;
    iteratorX = leftPosition + width;
    // console.log(`yS:${topPosition} yE:${iteratorY}`, `xS:${leftPosition} xE:${iteratorX}`);
    currentFilledY = [];
    currentFilledX = [];
    resetPostionNeed = false;
    for (let i = topPosition; i < iteratorY; i++) {
        currentFilledY.push(i);
        for (let j = leftPosition; j < iteratorX - 1; j++) {
            if (i == topPosition) {
                currentFilledX.push(j);
            }
            if (array[i][j] != 0) {
                // console.log(`y:${currentFilledY}, X:${currentFilledX}`);
                resetPostionNeed = true;
                break;
            } else {
                array[i][j] = 1;
            }
        }
    }
    if (resetPostionNeed) {
        resetPostionInContainer(array, currentFilledX, currentFilledY, element);
    }
};

const resetPostionInContainer = (array, filledY, filledX, element) => {
    // console.log(filledY, filledX);
    // console.log(`y:${filledY[0]} x:${filledX[0]}`);
    // console.log(`lastY:${filledY[filledY.length - 1]} x:${filledX[filledX.length - 1]}`);
    // console.log(array[filledY[filledY.length - 1]]);
    if (array[filledY[filledY.length - 1]] == undefined) {
        randomizePosition(element);
    } else {
        for (let i = filledY[0]; i < filledY[filledY.length - 1]; i++) {
            for (let j = filledX[0]; j < filledX[filledX.length - 1]; j++) {
                array[i][j] = 0;
            }
        }
        // console.log("endloop",element.id);
        randomizePosition(element);
    }

};


//  ██████╗  █████╗ ███╗   ███╗███████╗    ██╗  ██╗ █████╗ ███╗   ██╗██████╗ ██╗     ███████╗██████╗ 
// ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██║  ██║██╔══██╗████╗  ██║██╔══██╗██║     ██╔════╝██╔══██╗
// ██║  ███╗███████║██╔████╔██║█████╗      ███████║███████║██╔██╗ ██║██║  ██║██║     █████╗  ██████╔╝
// ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██╔══██║██╔══██║██║╚██╗██║██║  ██║██║     ██╔══╝  ██╔══██╗
// ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ██║  ██║██║  ██║██║ ╚████║██████╔╝███████╗███████╗██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝


const gameHandler = (elements) => {
    elements.forEach(e => {
        e.onclick = () => {
            e.classList.contains("active-answer") ? e.classList.remove("active-answer") : e.classList.add("active-answer");
            activeAnswers = updateAnswersArray(elements, activeAnswers);
        };
    });
};

const updateAnswersArray = (ele, array) => {
    array = [];
    ele.forEach(e => {
        if (e.classList.contains("active-answer")) {
            array.push(e.innerHTML);
        }
    });
    return array;
};

const checkAnwsersCorrection = () => {
    boardSpans.forEach(e => {
        
    })
    console.log(activeAnswers, correctAnswers);
};