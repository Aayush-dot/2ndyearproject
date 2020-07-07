const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


const words = [
    'laugh',
    'computer',
    'cricket',
    'chess',
    'breakfast',
    'lunch',
    'dinner',
    'bad',
    'good',
    'swift',
    'fearless',
    'speaknow',
    'red',
    'reputation',
    'lover',
    'thirteen',
    'jalandhar',
    'javascript',
    'jquery',
    'coronavirus',
  ];

text.focus();
  let randomWord;
  let time=10;
  let score=0;
  let difficulty= localStorage.getItem('difficulty')!==null ? localStorage.getItem('difficulty') : 'medium' ;
  difficultySelect.value=difficulty;


  const updateTime =  () => {
    time--;
    timeEl.innerHTML = time + 's';
    if(time==0){
         clearInterval(timeInterval);
         gameOver();
    }
  }

  const timeInterval = setInterval(updateTime,1000);


  const gameOver = () => {
    endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
  }

 const getRandomWord = () =>{
     return words[Math.floor(Math.random()*words.length)];
 }


 const addWord = () =>{
    console.log('hi');
     randomWord=getRandomWord();
     word.innerHTML=randomWord
 }



 addWord();

 text.addEventListener('input', entered => {
    const enteredC= entered.target.value;
    if(enteredC===randomWord){
        entered.target.value='';
        addWord();
        score++;
        scoreEl.innerHTML=score;
       console.log(difficulty)
        if(difficulty==='easy')
        time+=5;
        else if(difficulty==='medium')
        time+=3;
        else if(difficulty==='hard')
        time+=1;

        else if(difficulty==='insane')
        time+=0;

        updateTime();
    }
 }) ;

 settingsForm.addEventListener('change',e => {
   difficulty=e.target.value;
   localStorage.setItem('difficulty',difficulty);
 })
