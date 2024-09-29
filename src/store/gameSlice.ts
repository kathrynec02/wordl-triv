import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { WordleDictionary } from '../utils/WordleDictionary';
import { LetterResult } from '../utils/GuessResult';
import { isValidWord } from '../services/dictionaryApi';

export interface GameState {
  answer: string;
  guesses: string[];
  results: LetterResult[][];
  currentGuess: string;
  message: string;
  isGameOver: boolean;
  isWin: boolean;
}

const initialState: GameState = {
  answer: '',
  guesses: [],
  results: [],
  currentGuess: '',
  message: '',
  isGameOver: false,
  isWin: false,
};

export const initializeGame = createAsyncThunk(
  'game/initializeGame',
  async (forceNewWord: boolean = false, { getState }) => {
    const state = getState() as { game: GameState };

    // Always fetch a new word if forceNewWord is true or there is no current answer
    if (forceNewWord || !state.game.answer) {
      const dictionary = new WordleDictionary();
      const answer = await dictionary.getRandomWord();
      return answer;
    }

    return state.game.answer; // Use the existing answer if forceNewWord is false
  }
);

export const submitGuess = createAsyncThunk(
  'game/submitGuess',
  async (guess: string, { getState }) => {
    const state = getState() as { game: GameState };
    const answer = state.game.answer;

    if (guess.length !== 5) {
      throw new Error('Word must be 5 letters');
    }

    if (!(await isValidWord(guess))) {
      throw new Error('Not a valid word');
    }

    const result = guess.split('').map((letter, index) => {
      if (letter === answer[index]) return LetterResult.CORRECT;
      if (answer.includes(letter)) return LetterResult.PRESENT;
      return LetterResult.ABSENT;
    });

    return { guess, result };
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateCurrentGuess: (state, action: PayloadAction<string>) => {
      state.currentGuess = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    giveUp: (state) => {
      state.isGameOver = true;
      state.message = `You gave up. The word was ${state.answer}`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeGame.fulfilled, (state, action) => {
        state.answer = action.payload;  // Always set a new answer when the game is reset
        state.guesses = [];
        state.results = [];
        state.currentGuess = '';
        state.message = '';
        state.isGameOver = false;
        state.isWin = false;
      })
      .addCase(submitGuess.fulfilled, (state, action) => {
        const { guess, result } = action.payload;
        state.guesses.push(guess);
        state.results.push(result);
        
        if (guess === state.answer) {
          state.isWin = true;
          state.isGameOver = true;
          state.message = 'Congratulations! You won!';
        } else if (state.guesses.length === 6) {
          state.isGameOver = true;
          state.message = `Game over. The word was ${state.answer}`;
        }

        state.currentGuess = '';
      })
      .addCase(submitGuess.rejected, (state, action) => {
        state.message = action.error.message || 'An error occurred';
      });
  },
});

export const { updateCurrentGuess, setMessage, giveUp } = gameSlice.actions;
export default gameSlice.reducer;