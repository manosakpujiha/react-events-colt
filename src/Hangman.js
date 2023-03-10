import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import {randomWord}   from './words'

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateButtons = this.generateButtons.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  resetGame(){
    this.setState(()=> {
      return{
        nWrong: 0, 
        guessed: new Set(), 
        answer: randomWord()
      }
    })
  }
  handleClick() {
    this.resetGame()
  }
  

  /** render: render game */
  render() {
    const altText = `${this.state.nWrong} of ${this.props.maxWrong} guesses`;
    console.log(this.guessedWord().join(''), this.state.answer);
    const gameover = (this.state.nWrong === this.props.maxWrong);
    const isWin =  (this.guessedWord().join('') === this.state.answer); 
    let gameState = this.generateButtons()

    if (gameover) {gameState = 'You Loose ????';}
    if (isWin) {gameState = 'You Win ????'}
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}/>
        <p >Wrong guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{gameover ? `${this.state.answer}`: this.guessedWord()}</p>
        <p className='Hangman-btns'> {gameState}</p>
        <button  id='Hangman-reset' onClick={this.handleClick}>Reset</button>
      </div>
    );
  }
}

export default Hangman;
