const quizData = [
    {
        question: 'What is the full form of SMIU?',
        a: 'Sindh Madressatul Islam University',
        b: 'Sindh Madrassatul Islam University',
        c: 'Sui Madressatul Islam University',
        d: 'Sindh Muslim Idealogy University',
        correct: 'a'
    },
    {
        question: 'What is the most used programming language in 2021?',
        a: 'Java',
        b: 'Perl',
        c: 'Python',
        d: 'Javascript',
        correct: 'c'
    },{
        question: 'What is the full form of CPEC?',
        a: 'China Pakistan Economic Corruption',
        b: 'Corrupt Pakistanies Entrance Corridor',
        c: 'China Pakistan Economic Corridor',
        d: 'China Pakistan Earning Corporation',
        correct: 'c'
    },{
        question: 'Who is the President of Pakistan?',
        a: 'Sheikh Rasheed',
        b: 'Shafqat Mehmood',
        c: 'Imran Khan',
        d: 'Arif Alvi',
        correct: 'd'
    },{
        question: 'What is the full form of GOOGLE?',
        a: 'Global Organization of Orbital Group Language of Economic',
        b: 'Global Organization of Oriented Group Language of Earth',
        c: 'Great Organization of Oriented Graph Language of Earning',
        d: 'Global Orientation of Orient Grape Letter of Earring',
        correct: 'b'
    },{
        question: 'What does HTML stand for?',
        a: 'Hifertext Minimal Language',
        b: 'Hypertext Markup Language',
        c: 'Hint Text More Language',
        d: 'Hunter Municiple Language',
        correct: 'b',
    },{
        question: 'What does PUBG stands for?',
        a: 'PlayerUnknowns Battlegrounds',
        b: 'PlayerUnderground Battlegrounds',
        c: 'PlayerUnderwater Battle game',
        d: 'PlayerUnknowns Battlegrouds',
        correct: 'a',
    }
]
const questionEl = document.getElementById('question');
const quiz = document.getElementById('quiz');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answersEls = document.querySelectorAll('.answer');

let currentQuiz = 0;
let score = 0;
loadQuiz();

function getSelected(){
    let answer = undefined;
    answersEls.forEach((answerEl) => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
function deselectAnswers(){
    answersEls.forEach((answerEl) => {
      answerEl.checked = false;
        
    });
}

function loadQuiz(){
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}
submitBtn.addEventListener('click', ()=>{
    const answer = getSelected();
    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length){
            loadQuiz();
        }else{
            quiz.innerHTML = `<h3>You answered correctly at ${score} / ${quizData.length} questions.</h3><button onclick="location.reload()">Reload</button>`
        }
    }
});