
function main () {
  const grid = document.querySelector('.grid');
  const logo = document.querySelector('.logo');
  const livesCounter = document.querySelector('.lives-counter');
  const startButton = document.querySelector('.start-button');
  const gameOver = document.querySelector('.game-over');
  const resetButton = document.querySelector('.reset-button');
  const finish = document.querySelector('.finish');
  const instructions = document.querySelector('.view');
  startButton.addEventListener('click', GameStart);

  function GameStart () {
    // display front page
    startButton.classList.remove('start-button');
    startButton.style.display = 'none';
    grid.classList.add('grid');
    logo.style.display = 'none';
    livesCounter.innerHTML = 'lives: 3';
    resetButton.style.display = 'none';
    gameOver.style.display = 'none';
    finish.style.display = 'none';
    instructions.style.display = 'none';
    loadGrid();
    movementOfFrog();
    loadRiver();
    loadRoad();
    loadCars();
    loadLogs();
    loadLogsDark();
    loadGrass();
    loadSpikes();
    moveCar();
    moveLog();
    moveLog2();
    loadSpikes();
  }

  grid.classList.remove('grid');
  livesCounter.innerHTML = '';
  resetButton.style.display = 'none';
  gameOver.style.display = 'none';
  finish.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', main);

// let river = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]

let frogDirection = 'frog';

function renderGame () {
  cells.forEach(cell => {
    cell.classList.remove('frog');
    cell.classList.remove('frog-right');
    cell.classList.remove('frog-left');
    cell.classList.remove('frog-down');
  });
  switch (frogDirection) {
    case 'left': cells[frog].classList.add('frog-left'); break;
    case 'right': cells[frog].classList.add('frog-right'); break;
    case 'down': cells[frog].classList.add('frog-down'); break;
    default: cells[frog].classList.add('frog'); break;
  }
}

let lives = 3;
let frog = 280;
const cells = [];
const carsArray = [240, 245, 248, 250, 254, 255, 257, 259, 263, 265, 269, 238, 234, 233, 230, 227, 226, 224, 220, 218, 215, 213, 210, 206, 203, 200, 199, 196, 194, 190, 188, 186, 184, 180, 176, 175, 173, 170];
const leftWall = [255, 238, 221, 204, 187, 170];
const widthOfGrid = 17;
const gridCellCount = widthOfGrid * widthOfGrid;
const logArray = [69, 70, 74, 75, 79, 80, 36, 37, 42, 43, 48, 49];
const logArrayDark = [51, 52, 56, 57, 61, 62, 16, 17, 21, 22, 26, 27];
const rightWall = [33, 50, 67, 84];
let movedFrog = false;

function loadRiver () {
  for (let i = 17; i < 85; i++) {
    cells[i].classList.add('river');
  }
}

function loadRoad () {
  for (let i = 170; i < 272; i++) {
    cells[i].classList.add('road');
  }
}

function loadCars () {
  for (let i = 0; i < 273; i++) {
    if (carsArray.includes(i)) {
      cells[i].classList.add('car');
    }
  }
}
function loadLogs () {
  for (let i = 0; i < 273; i++) {
    if (logArray.includes(i)) {
      cells[i].classList.add('log');
    }
  }
}
function loadLogsDark () {
  for (let i = 0; i < 273; i++) {
    if (logArrayDark.includes(i)) {
      cells[i].classList.add('log1');
    }
  }
}

function loadGrass () {
  for (let i = 272; i < 289; i++) {
    cells[i].classList.add('grass');
  }
  for (let i = 0; i < 8; i++) {
    cells[i].classList.add('grass');
  }
  for (let i = 9; i < 17; i++) {
    cells[i].classList.add('grass');
  }
  cells[8].classList.add('grass-finish');

  for (let i = 85; i < 170; i++) {
    cells[i].classList.add('grass');
  }
}

function loadSpikes () {
  cells[153].classList.add('spike');
  cells[157].classList.add('spike');
  cells[162].classList.add('spike');
  cells[168].classList.add('spike');
  cells[121].classList.add('spike');
  cells[139].classList.add('spike');
  cells[119].classList.add('spike');
  cells[90].classList.add('spike');
  cells[110].classList.add('spike');
  cells[131].classList.add('spike');
  cells[117].classList.add('spike');
  cells[142].classList.add('spike');
}

// function loadLilypad() {
//   cells[12].classList.add('lilypad')
//   cells[8].classList.add('lilypad')
//   cells[4].classList.add('lilypad')
// }

function loadGrid () {
  const grid = document.querySelector('.grid');

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if (i === frog) {
      cell.classList.add('frog');
    }
    cell.id = i;

    grid.appendChild(cell);
    cells.push(cell);
  }
}

function movementOfFrog () {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (frog === cells.length - 1) {
        return;
      }
      frogDirection = 'right';
      frog += 1;
    } else if (event.key === 'ArrowLeft') {
      if (frog === 0) {
        return;
      }
      frogDirection = 'left';
      frog -= 1;
    } else if (event.key === 'ArrowUp') {
      if (frog < widthOfGrid) {
        return;
      }
      frogDirection = 'frog';
      frog -= widthOfGrid;
    } else if (event.key === 'ArrowDown') {
      if (frog > cells.length - widthOfGrid - 1) {
        return;
      }
      frogDirection = 'down';
      frog += widthOfGrid;
    }
    renderGame();
    FrogFinish();
    frogDie();
    frogDieOnSpike();
    frogDieInWater();
  });
}

function moveCar () {
  setInterval(() => {
    for (let i = 0; i < carsArray.length; i++) {
      if (leftWall.includes(carsArray[i])) {
        cells[carsArray[i]].classList.remove('car');
        carsArray[i] += widthOfGrid;
        cells[carsArray[i]].classList.add('car');
      }
      cells[carsArray[i]].classList.remove('car');
      carsArray[i]--;
      cells[carsArray[i]].classList.add('car');
    }
    frogDie();
    const grid = document.querySelector('.grid');
    const gameOver = document.querySelector('.game-over');
    const resetButton = document.querySelector('.reset-button');
    const livesCounter = document.querySelector('.lives-counter');
    if (lives === 0) {
      grid.style.display = 'none';
      gameOver.style.display = 'block';
      livesCounter.style.display = 'none';
      resetButton.style.display = 'block';
    }
  }, 1000);
}

function moveLog () {
  setInterval(() => {
    movedFrog = false;
    for (let i = 0; i < logArray.length; i++) {
      if (rightWall.includes(logArray[i])) {
        cells[logArray[i]].classList.remove('log');
        cells[logArray[i]].classList.add('river');
        cells[logArray[i] - 1].classList.remove('log');
        cells[logArray[i] - 1].classList.add('river');
        logArray[i] -= widthOfGrid - 1;
      }

      logArray[i]++;

      cells[logArray[i]].classList.remove('river');
      cells[logArray[i]].classList.add('log');
      if ((cells[logArray[i] - 1].classList.contains('frog')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArray[i] - 1].classList.contains('frog-left')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-left');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArray[i] - 1].classList.contains('frog-right')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-right');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArray[i] - 1].classList.contains('frog-down')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-down');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      }

      cells[logArray[i] - 1].classList.remove('river');
      cells[logArray[i] - 1].classList.add('log');

      cells[logArray[i] - 2].classList.remove('log');
      cells[logArray[i] - 2].classList.add('river');
      cells[logArray[i] - 2].classList.remove('frog');
    }
  }, 1300);
}

function moveLog2 () {
  setInterval(() => {
    movedFrog = false;
    for (let i = 0; i < logArrayDark.length; i++) {
      if (rightWall.includes(logArrayDark[i])) {
        cells[logArrayDark[i]].classList.remove('log1');
        cells[logArrayDark[i]].classList.add('river');
        cells[logArrayDark[i] - 1].classList.remove('log1');
        cells[logArrayDark[i] - 1].classList.add('river');
        logArrayDark[i] -= widthOfGrid - 1;
      }

      logArrayDark[i]++;

      cells[logArrayDark[i]].classList.remove('river');
      cells[logArrayDark[i]].classList.add('log1');
      if ((cells[logArrayDark[i] - 1].classList.contains('frog')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArrayDark[i] - 1].classList.contains('frog-left')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-left');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArrayDark[i] - 1].classList.contains('frog-right')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-right');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      } else if ((cells[logArrayDark[i] - 1].classList.contains('frog-down')) && !movedFrog) {
        frog++;
        cells[frog].classList.add('frog-down');
        cells[frog - 1].classList.remove('frog', 'frog-left', 'frog-right', 'frog-down');
        movedFrog = true;
      }

      cells[logArrayDark[i] - 1].classList.remove('river');
      cells[logArrayDark[i] - 1].classList.add('log1');

      cells[logArrayDark[i] - 2].classList.remove('log1');
      cells[logArrayDark[i] - 2].classList.add('river');
      cells[logArrayDark[i] - 2].classList.remove('frog');
    }
  }, 1000);
}

function frogDie () {
  const livesCounter = document.querySelector('.lives-counter');
  const cellWithFrogAndCar = cells.find((element) => {
    return element.className.includes('frog') && element.className.includes('car');
  });
  if (cellWithFrogAndCar) {
    cellWithFrogAndCar.classList.remove('frog');
    cellWithFrogAndCar.classList.remove('frog-left');
    cellWithFrogAndCar.classList.remove('frog-right');
    cellWithFrogAndCar.classList.remove('frog-down');
    frog = 280;
    cells[frog].classList.add('frog');
    livesCounter.innerHTML = `lives: ${lives -= 1}`;
  }
}

function frogDieOnSpike () {
  const livesCounter = document.querySelector('.lives-counter');
  const cellWithFrogAndSpike = cells.find((element) => {
    return element.className.includes('frog') && element.className.includes('spike');
  });
  if (cellWithFrogAndSpike) {
    cellWithFrogAndSpike.classList.remove('frog');
    cellWithFrogAndSpike.classList.remove('frog-left');
    cellWithFrogAndSpike.classList.remove('frog-right');
    cellWithFrogAndSpike.classList.remove('frog-down');
    frog = 280;
    cells[frog].classList.add('frog');
    livesCounter.innerHTML = `lives: ${lives -= 1}`;
  }
}

function frogDieInWater () {
  const livesCounter = document.querySelector('.lives-counter');
  const cellWithFrogAndRiver = cells.find((element) => {
    if (element.className.includes('frog') && element.className.includes('river')) {
      console.log('element classname ', element.className, element);
    }
    return element.className.includes('frog') && element.className.includes('river');
  });
  if (cellWithFrogAndRiver) {
    cellWithFrogAndRiver.classList.remove('frog');
    cellWithFrogAndRiver.classList.remove('frog-left');
    cellWithFrogAndRiver.classList.remove('frog-right');
    cellWithFrogAndRiver.classList.remove('frog-down');
    frog = 280;
    cells[frog].classList.add('frog');
    livesCounter.innerHTML = `lives: ${lives -= 1}`;
  }

  const grid = document.querySelector('.grid');
  const gameOver = document.querySelector('.game-over');
  const resetButton = document.querySelector('.reset-button');
  if (lives === 0) {
    grid.style.display = 'none';
    gameOver.style.display = 'block';
    livesCounter.style.display = 'none';
    resetButton.style.display = 'block';
  }
}

function FrogFinish () {
  const livesCounter = document.querySelector('.lives-counter');
  const resetButton = document.querySelector('.reset-button');
  const grid = document.querySelector('.grid');
  const finish = document.querySelector('.finish');
  cells.find((element) => {
    if (element.className.includes('frog') && element.className.includes('grass-finish')) {
      console.log('hello you bastard');
      grid.style.display = 'none';
      livesCounter.style.display = 'none';
      resetButton.style.display = 'none';
      finish.style.display = 'block';
    }
  });
}
