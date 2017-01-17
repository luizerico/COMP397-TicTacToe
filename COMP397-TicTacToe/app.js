
let answer;
let guesscount = 0;
let hint = '';

let lance = 0;
let mousePos;
let ttt_matrix = [];
let player0_points = 0, player1_points = 0;
let x_image, o_image;
let context;


function initGame() {
    context = document.getElementById("myCanvas").getContext("2d");
    resetBoard();
    

    //Preload X and O images
    x_image = new Image();
    x_image.src = "assets/x.png";

    o_image = new Image();
    o_image.src = "assets/o.png";
}

function playerLance(e) {
    let ctx = e.getContext("2d");
    let pos = mousePos;
    let player = lance % 2;
    let img_padding = 2;

    // check if the lance is even or odd
    if (player === 0) {
        img = x_image;
    } else {
        img = o_image;
    }

    // Calculate the matrix position based on the mouse click position 
    pos.x = Math.floor(mousePos.x / 200);
    pos.y = Math.floor(mousePos.y / 200); 
    console.log(pos);

    // Draw and go ahead if the position is not occupied
    // Improve this calculations to use static values instead of calculated one each time...
    if (checkMatrix(pos, player)) {
        ctx.drawImage(img, pos.x * 200 + img_padding, pos.y * 200 + img_padding, 200 - img_padding * 2, 200 - img_padding * 2);
        lance++;
    } else {
        alert("position occupied.");
    }

    if (checkWon(player)) {
        player_id = "player" + eval(player + 1) + "_score";
        document.getElementById(player_id).textContent = "1";
        setTimeout("alert('We Have a Winner');", 1);
    }
    console.log(ttt_matrix);
    console.log(checkWon(player))
}


function drawBoardLines(ctx) {
    // Temporary values to width and height
    let width = 600, height = 600;
    let w3 = width / 3;
    let h3 = height / 3;

    ctx.beginPath();
    for (x = 0; x <= 2; x++) {
        ctx.moveTo(0, w3 * x);
        ctx.lineTo(width, w3 * x);

        ctx.moveTo(h3 * x, 0);
        ctx.lineTo(h3 * x, height);
    }
    ctx.stroke();
}

/*
 * The checkMatrix function check if the position is not occupied by a previous lance
 * and fill the position with the player number. Return false if position was 
 * previously occupied by a lance.
 */
function checkMatrix(pos, player) {
    if (ttt_matrix[pos.x][pos.y] == null) {
        ttt_matrix[pos.x][pos.y] = player;
        return true;
    }
    return false;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function checkWon(player) {
    for(x=0; x<=2;x++){
        if (ttt_matrix[x][0] === player && ttt_matrix[x][1] === player && ttt_matrix[x][2] === player) {
            return true;
        }
        if (ttt_matrix[0][x] === player && ttt_matrix[1][x] === player && ttt_matrix[2][x] === player) {
            return true;
        }              
    }
    if (ttt_matrix[0][0] === player && ttt_matrix[1][1] === player && ttt_matrix[2][2] === player ||
            ttt_matrix[0][2] === player && ttt_matrix[1][1] === player && ttt_matrix[2][0] === player) {
        return true;
    }
    return false;
}

function resetBoard() {
    // Initialize the matrix with null values
    for (let x = 0; x <= 2; x++) {
        ttt_matrix[x] = [];
        for (let y = 0; y <= 2; y++) {
            ttt_matrix[x][y] = null;
        }
    }

    // Restart lance
    lance = 0;
    myCanvas.getContext('2d').clearRect(0, 0, myCanvas.width, myCanvas.height);
    drawBoardLines(context);
}

$(document).ready(() => {
    myCanvas.addEventListener('mousemove', (evt) => {
        mousePos = getMousePos(myCanvas, evt);
        //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
    }, false);

    initGame();
});