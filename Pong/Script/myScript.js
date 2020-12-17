/* Programmed By Jey ft. Étienne Masse
Last Update : Decembre 17th 2020
Pong Game using P5.js */

// Variable for the paddles
const STARTY = 200;
let coorYP1 = 0;
let coorYP2 = 0;

// Variable for the Ball
const STARTBALLX = 240;
const STARTBALLY = 240;
let coorBallX = 0;
let coorBallY = 0;

/* Array that contains the games stats */
let stats = [];
let numBounce = 0;


/* The direction value is randomly generated so that each time that the game starts 
the ball won't always move in the same direction
I also made some tweaking to prevent some unwanted resaults */
let xSpeed = 0;
let ySpeed = (Math.floor(Math.random()*2));
let directionX = (Math.floor(Math.random()*2));

// Score element
let scoreP1 = 0;
let scoreP2 = 0;

// Variable for the restart button
let button;


// Applies setting before the game loads
function setup(){

    createCanvas(500,500);
    frameRate(25);

    coorYP1 += STARTY;
    coorYP2 += STARTY;

    coorBallX = STARTBALLX;
    coorBallY = STARTBALLY;

    // Button to reset the game
    button = createButton('Reset');
    button.position(0,0);
    button.mousePressed(reset);


    
    /* What will decide if the ball goes left or right
    This is also used so the ball never goes in a straight line */
    if (directionX === 0) {

        xSpeed = ((Math.floor(Math.random()*5) -6));
    }
    else {

        xSpeed = ((Math.floor(Math.random()*5) +6));
    } 
    
    
    /* What will decide if the ball goes up or down at the start of the game
    This is also used to make the speed constant so the ball dosen't go to slow or to fast */
    if (ySpeed === 0) {

        ySpeed = -9
    }
    else {

        ySpeed = 9
    }
}

// Game Loop 
function draw(){
    background(0);

    //Paddle for player 1
    fill('#0000ff');
    rect(20,coorYP1,20,80);

    //Paddle for player 2
    fill('#ff0000');
    rect(450,coorYP2,20,80);

    //Score for player 1
    fill('#ffffff');
    textSize(32);
    text(scoreP1, 150, 35);

    //Score for player 2
    fill("#ffffff");
    textSize(32);
    text(scoreP2, 310, 35);
    
    // Controls for the paddles and what make them stop when they touch the borders 
    if (keyIsDown(87) && coorYP1 > 0) {
        coorYP1 -= 8;
    }
    
    if (keyIsDown(83) && coorYP1 + 80 < 500) {
        coorYP1 += 8;
    }
    
    if (keyIsDown(73) && coorYP2 > 0) {
        coorYP2 -= 8;
    }
    
    if (keyIsDown(75) && coorYP2 + 80 < 500) {
        coorYP2 += 8;
    }

    // Functions
    ball();
    ballSpeed();
    bounce();
    paddleBounce();
    winCondition();
}



function ball(){

    fill('#ffffff');
    ellipse(coorBallX,coorBallY,20,20);

}


function ballSpeed(){

    coorBallX += xSpeed;
    coorBallY += ySpeed;
}


function bounce(){

    // When the ball touches the top and bottom
    if (coorBallY <20 || coorBallY > 500 -10) {

        ySpeed *= -1;
        
        numBounce ++
    }

    // When the ball touches the left side
    if (coorBallX <20 ) {

        scoreP2 ++;
        coorBallX = STARTBALLX;
        coorBallY = STARTBALLY;
        xSpeed = ((Math.floor(Math.random()*5) +6));
    }

    // When the ball touches the right side
    if (coorBallX >500 -10 ) {

        scoreP1 ++;
        coorBallX = STARTBALLX;
        coorBallY = STARTBALLY;
        xSpeed = ((Math.floor(Math.random()*5) -6));
    }

    
}    

function paddleBounce(){

        
    // When the ball hits the blue pallet
    if (coorBallY > coorYP1 && coorBallY < coorYP1 + 80 && coorBallX -30 <= 20){

        ySpeed *= 1;
        xSpeed *= -1;
    }

    // When the ball hits the red pallet
    if (coorBallY > coorYP2 && coorBallY < coorYP2 + 80 && coorBallX +10  >= 450){

        ySpeed *= 1;
        xSpeed *= -1;
    }

}

function winCondition(){

    if(scoreP1 === 11 ){
        fill('#ffffff');
        text('Player 1 Wins', 150,150);
        textSize(50);
        xSpeed = 0;
        ySpeed = 0;
        stats.push('Number of bounce ' + numBounce);

        
        
    }

    if(scoreP2 === 11){
        fill('#ffffff');
        text('Player 2 Wins', 150,150);
        textSize(50);
        xSpeed = 0;
        ySpeed = 0;
        stats.push(numBounce);
        text('Nomber of bounce' + ' ' + stats[1], 150, 250);
        
    }
}

function reset(){
    
    scoreP1 = 0;
    scoreP2 = 0;
    coorBallX = STARTBALLX;
    coorBallY = STARTBALLY;
    directionX = Math.floor(Math.random()*2);
    ySpeed = (Math.floor(Math.random()*2));

    if (directionX === 0) {

        xSpeed = ((Math.floor(Math.random()*5) -6));
    }
    else {

        xSpeed = ((Math.floor(Math.random()*5) +6));
    } 

    if (ySpeed === 0) {

        ySpeed = -6;
    }
    else {

        ySpeed = 6;
    }


}


