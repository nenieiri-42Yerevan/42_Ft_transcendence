import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';

class Engine extends React.Component {
    constructor(props) {
        super(props);

        this.divRef = React.createRef();
        this.canvasRef = React.createRef();
        this.state = InitialState();
    }

    componentDidMount(): void {
        const div = this.divRef.current; 
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        this.animationId = requestAnimationFrame(loop.bind(this));
        window.addEventListener('keydown', this.keyInput);
        function loop() {
            canvas.width = div.offsetWidth;
            canvas.height = div.offsetHeight;
            this.draw(ctx, canvas);
            this.animationId = requestAnimationFrame(loop.bind(this));
        }
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.animationId);
    }
    /* reset the game */
    resetGame = () => { this.setState({
            ballX : 0.5,
            ballY : 0.5,

            deltaY:         0, // change ball in Y AXIS
            deltaX:         Math.random() > 0.5 ? 0.01 : -0.01, // change ball in  X AXIS

            pause:          true, // pause the game

            paddleL :       0.5,
            paddleR :       0.5,
        });
    }

    /* check if we can move the player or opponent board */
    moveBoard = (playerBoard, isUp) => {
        }
     
    /* check if ball is touching the edge of board*/
    touchingEdge = () => {} 

    /* check if ball is touching the player or opponent paddle */
    touchingPaddle = () => {
            if (
                this.state.ballX >= 1 - this.state.paddleWidth * 2 &&
                this.state.ballY <= this.state.paddleR + this.state.paddleHeight &&
                this.state.ballY >= this.state.paddleR - this.state.paddleHeight
                ) { 
                this.setState({
                    deltaX : -0.01,
                    deltaY : -1 * this.state.deltaY,
                    });
            } else if (
                this.state.ballX <= this.state.paddleWidth * 2 &&
                this.state.ballY <= this.state.paddleL + this.state.paddleHeight &&
                this.state.ballY >= this.state.paddleL - this.state.paddleHeight
                ) {
                this.setState({
                    deltaX : 0.01,
                    deltaY : -1 * this.state.deltaY,
                    });
            } else if ( this.state.ballX > 1 ) {
                this.resetGame();
                this.setState({
                    scoreL : this.state.scoreL + 1
                });
            } else if ( this.state.ballX < 0 ) {
                this.resetGame();
                this.setState({
                    scoreR : this.state.scoreR + 1
                });
            }
            
        }
    
    /* check if ball is touching the botom or top of paddle */
    touchingPaddleEdge = () => {}
    
    /* check if ball made a score */

    /* score render */
    drawScore = (ctx, canvas) => {
            var text = `${this.state.scoreL} : ${this.state.scoreR}`;
            ctx.font = '42px Arial';
            const textWidth = ctx.measureText(text).width;
            const textX = (canvas.width - textWidth) / 2;
            const textY = (canvas.height * 0.1);
            ctx.fillText(text, textX, textY);
        }
    
    /* bounce the  ball */
    bounceBall = (ctx, canvas) => {
        if (!this.state.pause) {
            this.setState({
                ballX : this.state.ballX + this.state.deltaX,
                ballY : this.state.ballY + this.state.deltaY
            });
        } else {
            var text = `PAUSE`;
            ctx.font = '42px Arial';
            const textWidth = ctx.measureText(text).width;
            const textX = (canvas.width - textWidth) / 2;
            const textY = (canvas.height * 0.45);
            ctx.fillText(text, textX, textY);
        }
        const ballWidth = canvas.width * 0.01;
        const ballX = canvas.width * this.state.ballX;
        const ballY = canvas.height * this.state.ballY;
        ctx.fillRect(ballX - ballWidth/2, ballY - ballWidth/2, ballWidth, ballWidth);
    }
    
    paddles = (ctx, canvas) => {
        const paddleH = this.state.paddleHeight * canvas.height;
        const paddleW = this.state.paddleWidth * canvas.width;
        const paddleL = this.state.paddleL * canvas.height - paddleH;
        const paddleR = this.state.paddleR * canvas.height - paddleH;
        ctx.fillRect(0, paddleL, paddleW * 2, paddleH * 2);
        ctx.fillRect(canvas.width - paddleW * 2, paddleR, paddleW * 2, paddleH * 2);
    }

    draw = (ctx, canvas) => {
        ctx.fillStyle = 'white';
        this.drawScore(ctx, canvas);
        this.bounceBall(ctx, canvas);
        this.touchingPaddle();
        this.paddles(ctx, canvas);
    }
    /* handle the keyinput */ 
    keyInput = ({keyCode}) => {
        const PLAYER_UP   = 73;  // i
        const PLAYER_DOWN = 75;  // k
        const OPPONENT_UP    = 87; /* w */
        const OPPONENT_DOWN    = 83; /* s */
        const PAUSE    = 32; /* space */
        
        console.log(keyCode);
        switch (keyCode) {
            case PLAYER_UP: {
                if (this.state.paddleL > 0.1) 
                    this.setState({ paddleL : this.state.paddleL - 0.025 });
                break;
            }
            case PLAYER_DOWN: {
                if (this.state.paddleL < 0.95) 
                    this.setState({ paddleL : this.state.paddleL + 0.025 });
                break;
            }
            case OPPONENT_UP: {
                if (this.state.paddleR > 0.1) 
                    this.setState({ paddleR : this.state.paddleR - 0.025 });
                break;
            }
            case OPPONENT_DOWN:{
                if (this.state.paddleR < 0.95) 
                    this.setState({ paddleR : this.state.paddleR + 0.025 });
                break;
            }
            case PAUSE:
                this.setState({pause: !this.state.pause});
                    break;
        }   
    }

    /* render the jsx */
    render() {
        return (
                <div className="w-full md:w-4/5 h-screen bg-black" ref={this.divRef}>
                <canvas ref={this.canvasRef}>
                </ canvas>
                </div>
               );
    }

}

const InitialState = () => {
    return { 

        /* Paddle Array */
        paddleHeight :  0.05,
        paddleWidth :   0.005,
        paddleL :       0.5,
        paddleR :       0.5,
        /* ball */
        ballX:          0.5,
        ballY:          0.5,
        ballSpeed:      0.1,   // speed of ball
        deltaY:         0, // change ball in Y AXIS
        deltaX:         0.01, // change ball in  X AXIS
        /* pause */
        pause:          true, // pause the game
        /* Score */
        scoreL:         0,
        scoreR:         0,
    }
}

export default Engine;
