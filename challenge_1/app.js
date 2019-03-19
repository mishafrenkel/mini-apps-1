const popup = document.getElementById('popup');
const msg = document.getElementById('msg');
const end = document.getElementById('end');
const gameOverMsg = document.getElementById('gameOverMsg');
const endGame = document.getElementById('endGame');
const choice = document.getElementById('choice');
const boxs = document.querySelectorAll('.box');
let  p1 = 'X', p2 = 'O', positions;



function chooseIcon(icon){
  p1 = icon;
  p2 = (icon === 'X' ? 'O' :'X');
  positions = Array.from(Array(9).keys());
  for (let i = 0; i < boxs.length; i++) {
    boxs[i].addEventListener('click', p1Move);
    boxs[i].textContent = '';
  }
  if (p2 === 'X') {
    makeMove(bestSpot(), p2);
  }
  choice.style.display = 'none';
  popup.style.display = 'none';
}

function startGame() {
  end.style.display = 'none';
  choice.style.display = 'block';
  popup.style.display = 'block';
  boxs.forEach(x => x.className = 'box');
}

function p1Move(pos) {
  if (typeof positions[pos.target.id] ==='number') {
    makeMove(pos.target.id, p1);
    if (!checkWin(positions, p1) && !checkTie()) makeMove(bestSpot(), p2);
  }
}

function makeMove(boxId, player) {
  positions[boxId] = player;
  document.getElementById(boxId).innerHTML = player;
  let  winGame = checkWin(positions, player);
  if (winGame) gameOver(winGame);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let  winner = null;
  for (let [index, win] of winSets.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
       winner = {index: index, player: player};
      break;
    }
  }
  return  winner;
}

function gameOver(winner){
  for (let index of winSets[winner.index]) document.getElementById(index).classList.add('win');
  for (let i=0; i < boxs.length; i++) {
    boxs[i].removeEventListener('click', p1Move, false);
  }
  declareWinner((winner.player ===  p1 ? "You win!" : winner.player + " wins. Try Again."),winner.player);
}

let repeat;
function again(){
  startGame();
  chooseIcon(p1);
}

function declareWinner(message,player) {
  end.style.display = "block";
  endGame.textContent = player;
  gameOverMsg.textContent = message;
  repeat = setTimeout(again, 2000);
}

function openBoxs() {
  return positions.filter((x, y) => y === x);
}

function bestSpot(){
  return minMax(positions, p2).index;
}

function checkTie() {
  if (openBoxs().length === 0){
    for(let i = 0; i< boxs.length; i++) {
    boxs[i].className = 'box tie';
    boxs[i].removeEventListener('click',p1Move, false);
    };
    declareWinner("Tie game");
    return true;
  } 
  return false;
}

const winSets =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

function minMax(newBoard, player) {
  let openSq = openBoxs(newBoard);

  if (checkWin(newBoard, p1)) {
    return {score: -10};
  } else if (checkWin(newBoard, p2)) {
    return {score: 10};
  } else if (openSq.length === 0) {
    return {score: 0};
  }
  let moves = [];
  for (let i = 0; i < openSq.length; i ++) {
    let move = {};
    move.index = newBoard[openSq[i]];
    newBoard[openSq[i]] = player;

    if (player === p2)
      move.score = minMax(newBoard, p1).score;
    else
       move.score =  minMax(newBoard, p2).score;
    newBoard[openSq[i]] = move.index;
    if ((player === p2 && move.score === 10) || (player === p1 && move.score === -10))
      return move;
    else
      moves.push(move);
  }

  let bestMove, bestScore;
  if (player === p2) {
    bestScore = -1000;
    for(let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
      bestScore = 1000;
      for(let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
startGame();