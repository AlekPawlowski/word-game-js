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
}]

let sections, currentSection = 0, gameStart = false, buttonsNext, userName, score = 0;

let randomGamePick = Math.round(Math.random() * (gameObject.length - 1));

window.onload = (e) => {
    section = document.querySelectorAll('section');
    buttonsNext = document.querySelector('button');
    section[0].classList.add("active");
    buttonsNext.onclick = sectionVisilityChange;
};

const sectionVisilityChange = () => {
    section[currentSection].classList.remove("active");
    currentSection++;
    section[currentSection].classList.add('active');
}