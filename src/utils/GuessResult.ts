export enum LetterResult {
    CORRECT,
    PRESENT,
    ABSENT
  }
  
  export class GuessResult {
    private result: LetterResult[];
  
    constructor(private answer: string, private guess: string) {
      this.result = this.evaluateGuess();
    }
  
    getResult(): LetterResult[] {
      return this.result;
    }
  
    private evaluateGuess(): LetterResult[] {
      const result: LetterResult[] = new Array(5).fill(LetterResult.ABSENT);
      const answerLetters = this.answer.split('');
      const guessLetters = this.guess.split('');
      const usedLetters = new Array(5).fill(false);
  
      // First pass: mark correct letters
      for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === answerLetters[i]) {
          result[i] = LetterResult.CORRECT;
          usedLetters[i] = true;
        }
      }
  
      // Second pass: mark present letters
      for (let i = 0; i < 5; i++) {
        if (guessLetters[i] !== answerLetters[i] && answerLetters.includes(guessLetters[i])) {
          const index = answerLetters.findIndex((letter, idx) => letter === guessLetters[i] && !usedLetters[idx]);
          if (index !== -1) {
            result[i] = LetterResult.PRESENT;
            usedLetters[index] = true;
          }
        }
      }
  
      return result;
    }
  }