import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { initializeGame } from '../store/gameSlice';

// Modal overlay for the game over screen
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal content container
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  margin-bottom: 20px;
`;

const PlayAgainButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const GameOverModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
   // Pulling game state values from Redux store
  const { isGameOver, isWin, guesses, answer } = useSelector((state: RootState) => state.game);

  // Hide modal if the game is not over
  if (!isGameOver) {
    return null;
  }

  /**
  * Handles the action when "Play Again" is clicked.
  * This will reset the game and force a new word to be selected.
  */
  const handlePlayAgain = () => {
    // Passing true to force a new word
    dispatch(initializeGame(true));  
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>{isWin ? 'Congratulations!' : 'Game Over'}</ModalTitle>
        <ModalMessage>
          {isWin 
            ? `You guessed the word in ${guesses.length} tries!` 
            : `The word was ${answer}.`}
        </ModalMessage>
        <PlayAgainButton onClick={handlePlayAgain}>Play Again</PlayAgainButton>
      </ModalContent>
    </ModalOverlay>
  );
};
