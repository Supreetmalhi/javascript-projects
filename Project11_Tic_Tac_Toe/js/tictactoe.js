let activePlayer = 'x'; //keeps track of who's turn it is
let selectedSquares = []; //stores an array of moves

/* the main function that plays the game */
function placeXOr0(squareNumber) {
  if (!selectedSquares.some(element => element.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);
    if (activePlayer === 'x') {
      select.style.backgroundImage = 'url("images/x.png")';
    } else {
      select.style.backgroundImage = 'url("images/o.png")';
    }
    selectedSquares.push(squareNumber + activePlayer);
    checkWinConditions();
    if (activePlayer === 'x') {
      activePlayer = 'o';
    } else {
      activePlayer = 'x';
    }
    audio('./media/place.mp3');
    if(activePlayer === 'o') {
      disableClick();
      setTimeout(function() { computersTurn(); }, 1000);
    }
    return true;
  }

  /* this is the automated random response from computer */
  function computersTurn() {
    let success = false;
    let pickASquare;
    while(!success) {
      pickASquare = String(Math.floor(Math.random()*9));
      if(placeXOr0(pickASquare)) {
        placeXOr0(pickASquare);
        success = true;
      }
    }
  }
  
  /* this function checks if somone won the game */
  function checkWinConditions() {
    /* first player winning condition */
    if (arrayIncludes('0x', '1x', '2x')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3x', '4x', '5x')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6x', '7x', '8x')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0x', '3x', '6x')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1x', '4x', '7x')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2x', '5x', '8x')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6x', '4x', '2x')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0x', '4x', '8x')) { drawWinLine(100, 100, 520, 520); }

    /* second player winning condition */
    else if (arrayIncludes('0o', '1o', '2o')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3o', '4o', '5o')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6o', '7o', '8o')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0o', '3o', '6o')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1o', '4o', '7o')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2o', '5o', '8o')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6o', '4o', '2o')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0o', '4o', '8o')) { drawWinLine(100, 100, 520, 520); }
    
    /* game tie condition */
    else if (selectedSquares.length >= 9) {
      audio('./media/tie.mp3');
      setTimeout(function() { resetGame(); }, 1000);
    }
  }

  function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    return (a && b && c);
  }

  /* disables click on comuter's turn */
  function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {
      body.style.pointerEvents = 'auto';
    }, 1000);
  }

  /* plays audio */
  function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
  }

  /* draws the lines */
  function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1;
    let y1 = coordY1;
    let x2 = coordX2;
    let y2 = coordY2;
    let x = x1;
    let y = y1;

    function animateLineDrawing() {
      const animationLoop = requestAnimationFrame(animateLineDrawing);
      c.clearRect(0, 0, 608, 608);
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineWidth = 10;
      c.strokeStyle = 'rgba(70, 255, 33, 0.8)';
      c.stroke();
      if(x1<=x2 && y1<=y2) {
        if(x<x2) { x+= 10; }
        if(y<y2) { y+= 10; }
        if(x>=x2 && y<=y2) { cancelAnimationFrame(animationLoop); }
      }
    }

    function clear() {
      const animationLoop = requestAnimationFrame(clear);
      c.clearRect(0, 0, 608, 608);
      cancelAnimationFrame(animationLoop);
    }

    /* disable clicks when someone wins the game */
    disableClick();
    audio('./media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function() { clear(); resetGame(); }, 1000);
  }

  /* reset and restart the game */
  function resetGame() {
    for (let i=0; i<9; i++) {
      let square = document.getElementById(String(i));
      square.style.backgroundImage = '';
    }
    selectedSquares = [];
  }
}
