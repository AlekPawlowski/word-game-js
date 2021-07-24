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
    spanHeight,
    spanWidth,
    spanTop,
    spanLeft;

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
    console.log(divCordinates)
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
    spanTop = e.offsetTop;
    spanLeft = e.offsetLeft;
    let checkElementIsInArrayTop = spanTop + spanHeight;
    let checkElementIsInArrayWidth = spanLeft + spanWidth;
    console.log(`h:${spanHeight}`,`w:${spanWidth}`,`t:${spanTop}`,`l:${spanLeft}`);
    console.log("top",checkElementIsInArrayTop)
    console.log("left", checkElementIsInArrayWidth);
    console.log(boardHeight,boardWidth);
    if (checkElementIsInArrayTop > boardHeight || checkElementIsInArrayWidth > boardWidth){
        randomizePosition(e);
    }
}

const createCordinatesFromElement = (ele) => {
    boardWidth = Math.round(ele.getBoundingClientRect().width);
    boardHeight = Math.round(ele.getBoundingClientRect().height);
    console.log(boardHeight, boardWidth)
    let array = new Array(boardHeight).fill(boardWidth);
    return array;
};
