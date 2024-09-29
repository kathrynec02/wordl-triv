import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { LetterResult } from '../utils/GuessResult';

const flipAnimation = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  margin-bottom: 20px;
`;

const Cell = styled.div<{ $status: LetterResult | null; $animated: boolean }>`
  width: ${({ theme }) => theme.sizes.cell};
  height: ${({ theme }) => theme.sizes.cell};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid ${({ theme, $status }) => 
    $status === null ? theme.colors.absent : 'transparent'
  };
  background-color: ${({ theme, $status }) => 
    $status === LetterResult.CORRECT ? theme.colors.primary :
    $status === LetterResult.PRESENT ? theme.colors.secondary :
    $status === LetterResult.ABSENT ? theme.colors.absent :
    'transparent'
  };
  color: ${({ $status }) => $status !== null ? 'white' : 'black'};
  text-transform: uppercase;
  transition: all 0.3s ease;
   animation: ${({ $animated }) => $animated ? css`${flipAnimation} 0.5s` : 'none'};
`;

interface WordleGridProps {
  guesses: string[];
  results: LetterResult[][];
}

/**
* The grid component that renders the Wordle game.
* Each cell shows a letter and its respective status (correct, present, or absent),
* with a flip animation applied when the guess is revealed.
*/
export const WordleGrid: React.FC<WordleGridProps> = ({ guesses, results }) => {
  const rows = Array(6).fill(null);

  return (
    <Grid>
      {rows.map((_, rowIndex) => (
        Array(5).fill(null).map((_, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`}
            $status={results[rowIndex] ? results[rowIndex][colIndex] : null}
            $animated={results[rowIndex] !== undefined}
          >
            {guesses[rowIndex] ? guesses[rowIndex][colIndex] : ''}
          </Cell>
        ))
      ))}
    </Grid>
  );
};