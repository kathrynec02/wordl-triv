import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateCurrentGuess, submitGuess, setMessage, initializeGame } from '../store/gameSlice';
import { WordleGrid } from './WordleGrid';
import { Keyboard } from './Keyboard';
import { LetterResult } from '../utils/GuessResult';
import { GameOverModal } from './GameOverModal';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* Increased width for proper layout */
  width: 100%;
`;

const Message = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  height: 1.5em;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const WordleGame: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { guesses, results, currentGuess, message, isGameOver } = useSelector((state: RootState) => state.game);

  /**
  * Creates a map of used letters with their status (CORRECT, PRESENT, ABSENT)
  * This is used for disabling keys and providing visual feedback.
  */
  const usedLetters = guesses.reduce((acc, guess) => {
    guess.split('').forEach((letter, index) => {
      if (!acc[letter] || results[guesses.indexOf(guess)][index] > acc[letter]) {
        acc[letter] = results[guesses.indexOf(guess)][index];
      }
    });
    return acc;
  }, {} as { [key: string]: LetterResult });

  useEffect(() => {
    dispatch(initializeGame(false));  // Start the game without forcing a new word
  }, [dispatch]);

  // Handle physical keyboard inputs
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const physicalKey = event.key.toUpperCase();
      if (isGameOver || usedLetters[physicalKey] === LetterResult.ABSENT) return;

      if (event.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (event.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[A-Za-z]$/.test(physicalKey)) {
        handleKeyPress(physicalKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, isGameOver, usedLetters]);

  /**
  * Handles key presses from both physical and virtual keyboards.
  * The function processes three key types: ENTER, BACKSPACE, and letter inputs.
  * It ensures that no more than 5 letters are entered and validates the word on ENTER.
  */
  const handleKeyPress = (key: string) => {
    if (isGameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        dispatch(setMessage('Word must be 5 letters'));
        return;
      }
      dispatch(submitGuess(currentGuess));
    } else if (key === 'BACKSPACE') {
      dispatch(updateCurrentGuess(currentGuess.slice(0, -1)));
    } else if (currentGuess.length < 5 && usedLetters[key] !== LetterResult.ABSENT) {
      dispatch(updateCurrentGuess(currentGuess + key));
    }
  };

  return (
    <GameContainer>
      <WordleGrid 
        guesses={[...guesses, currentGuess]}
        results={results}
      />
      <Keyboard 
        onKeyPress={handleKeyPress}
        usedLetters={usedLetters}
      />
      <Message>{message}</Message>
      <GameOverModal />
    </GameContainer>
  );
};