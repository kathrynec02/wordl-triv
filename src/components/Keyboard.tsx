import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LetterResult } from '../utils/GuessResult';

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

// Styled-component for each key on the virtual keyboard
const Key = styled.button<{ $wide?: boolean; $isPressed?: boolean }>`
  width: ${({ $wide, theme }) => $wide ? '70px' : theme.sizes.keyboardKey};
  height: ${({ theme }) => theme.sizes.keyboardKey};
  margin: 0 2px;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme, $isPressed }) => $isPressed ? theme.colors.keyboard.hover : theme.colors.keyboard.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;  /* Increased font size */
  font-weight: bold;
  padding: 0;  /* Added padding reset to ensure proper fit */
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.keyboard.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: { [key: string]: LetterResult };
}

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedLetters }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    /**
    * Handles the action when "Play Again" is clicked.
    * This will reset the game and force a new word to be selected.
    */
    const handlePhysicalKeyPress = (event: KeyboardEvent) => {
      const physicalKey = event.key.toUpperCase();
      if (/^[A-Z]$/.test(physicalKey) && usedLetters[physicalKey] !== LetterResult.ABSENT) {
        setPressedKey(physicalKey);
        onKeyPress(physicalKey);
        // Reset the key highlight after 200ms
        setTimeout(() => setPressedKey(null), 200);  // Reset the pressed key after 200ms
      }
    };

    // Add event listener for physical keyboard
    window.addEventListener('keydown', handlePhysicalKeyPress);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  }, [onKeyPress, usedLetters]);

  return (
    <KeyboardContainer>
      {KEYBOARD_LAYOUT.map((row, index) => (
        <KeyboardRow key={index}>
          {row.map((key) => (
            <Key
              key={key}
              onClick={() => onKeyPress(key)}
              $wide={key === 'ENTER' || key === 'BACKSPACE'}
              disabled={usedLetters[key] === LetterResult.ABSENT}
              $isPressed={pressedKey === key}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </Key>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardContainer>
  );
};
