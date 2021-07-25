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
        'blac'
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

let sections, 
    boardGame,
    currentSection = 0, 
    gameStart = false, 
    userName, 
    score = 0,
    gameGoal,
    scoreParagraph,
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
    iteratorX;

window.onload = (e) => {
    section = document.querySelectorAll('section');
    playButton = document.getElementById('play');
    finishButton = document.getElementById('finish');
    checkButton = document.getElementById('check');
    boardGame = document.getElementById("board");
    gameGoal = document.getElementById("game_title");
    scoreParagraph = document.getElementById("score");
    
    section[0].classList.add("active");
    
    playButton.onclick = () =>{
        sectionVisilityChange();
        divCordinates = createCordinatesFromElement(boardGame);
        gameInit();
        // console.log(divCordinates);
    };
    checkButton.onclick = () =>{
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
    fillBoard(gameDetails.all_words);
    
    // startGame();
    
};

const gameCheck = () => {
    checkButton.style.display = 'none';
    finishButton.style.display = 'block';
}

const fillBoard = (words) => {
    let style;
    words.forEach((word, index) =>{
        newGameSpan = document.createElement('span');
        newGameSpan.innerHTML = word;
        newGameSpan.id = `option-${index}`;
        newGameSpan.style.display= 'inline-block';
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
    console.log(e.id);
    // console.log(`h:${spanHeight}`,`w:${spanWidth}`,`t:${startPostionX}`,`l:${startPostionY}`);
    // console.log("top",endPositionY);
    // console.log("left", endPositionX);
    // console.log(boardHeight,boardWidth);
    if (endPositionY > boardHeight || endPositionX > boardWidth){
        randomizePosition(e);
    }else{
        putToEmptyPostition(divCordinates, startPostionX, startPostionY, spanWidth, spanHeight, e);
    }
    // console.log(startPostionX)
    // console.log(`t:${startPostionX}`, `l:${startPostionY}`);
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

const putToEmptyPostition= (array, leftPosition, topPosition, width, height, element)=>{
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
            if(i == topPosition){
                currentFilledX.push(j);
            }
            if(divCordinates[i][j] != 0){
                // console.log(`y:${currentFilledY}, X:${currentFilledX}`);
                resetPostionNeed = true;
                console.log("wtf");
                break;
            }else{
                divCordinates[i][j] = 1;
            }
        }
    }
    if(resetPostionNeed){
        resetPostionInContainer(array, currentFilledX, currentFilledY, element);
    }
};

const resetPostionInContainer = (array, filledY, filledX, element) =>{
    // console.log(filledY, filledX);
    // console.log(`y:${filledY[0]} x:${filledX[0]}`);
    // console.log(`lastY:${filledY[filledY.length - 1]} x:${filledX[filledX.length - 1]}`);
    for (let i = filledY[0]; i <= filledY[filledY.length - 1]; i++) {
        for (let j = filledX[0]; j <= filledX[filledX.length - 1]; j++) {
            divCordinates[i][j] = 0;
        }
    }
    console.log("endloop",element.id);
    randomizePosition(element);

};