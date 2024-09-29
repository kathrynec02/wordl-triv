import { WordleDictionary } from './WordleDictionary';
import { GuessResult, LetterResult } from './GuessResult';

export interface Wordle {
  submitGuess(guess: string): Promise<LetterResult[]>;
  isGameOver(): boolean;
  isWin(): boolean;
  getGuessCount(): number;
  getAnswer(): string;
}

export class WordleImplementation implements Wordle {
  private static MAX_GUESSES = 6;
  private guesses: string[] = [];
  private gameOver: boolean = false;

  constructor(
    private answer: string,
    private dictionary: WordleDictionary
  ) {
    if (!/^[A-Z]{5}$/.test(answer)) {
      throw new Error("Invalid answer: must be 5 uppercase letters");
    }
    if (!dictionary.containsWord(answer)) {
      throw new Error("Answer must be in the dictionary");
    }
  }

  async submitGuess(guess: string): Promise<LetterResult[]> {
    if (this.gameOver) {
      throw new Error("Game is already over");
    }
    if (!(await this.dictionary.containsWord(guess))) {
      throw new Error("Not a valid word");
    }
    const result = new GuessResult(this.answer, guess);
    this.guesses.push(guess);
    if (guess === this.answer || this.guesses.length === WordleImplementation.MAX_GUESSES) {
      this.gameOver = true;
    }
    return result.getResult();
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  isWin(): boolean {
    return this.gameOver && this.guesses[this.guesses.length - 1] === this.answer;
  }

  getGuessCount(): number {
    return this.guesses.length;
  }

  getAnswer(): string {
    return this.answer;
  }
}