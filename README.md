# Wordle Game - React + TypeScript + Redux + Vite

This project is a clone of the popular game **Wordle**, built using **React**, **Redux**, and **TypeScript**, powered by **Vite** for fast development. The game allows users to guess a 5-letter word in 6 attempts or less, with keyboard interaction from both physical and virtual keyboards.

## Features

- **React** and **Redux** for component-based UI and state management
- **TypeScript** for type safety and clean code
- **Styled Components** for component-scoped styles and theming
- **Custom Keyboard** supporting both physical and virtual keypresses
- **Game Grid** with flip animations indicating correct, present, or absent letters
- **Dynamic Wordle Dictionary** with support for adding new word sources in the future (e.g., Merriam-Webster API)
- **Reset Game** functionality to start a new game without refreshing the page

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the Repository**
   
   ```bash
   git clone https://github.com/your-username/wordle-clone.git
   cd wordle-clone

2. **Install Dependencies**
  This project uses npm for dependency management. Install the required packages using:
  npm install

3. **Start the Development Server**
  Start the Vite development server to serve the app locally:
  npm run dev

4. **Open the Application**
  Once the development server is running, open your browser and navigate to:
  http://localhost:5173

## How to Play
1. You are given 6 attempts to guess a 5-letter word.
2. Each time you submit a guess, the game grid will show:
  - Green tiles for correct letters in the correct position
  - Yellow tiles for correct letters in the wrong position
  - Gray tiles for incorrect letters
3. You can use the virtual keyboard or type on your physical keyboard.
4. Press ENTER to submit a guess and BACKSPACE to delete a letter.
5. If you give up, press the Give Up button to reveal the answer.

## Key Components
- WordleGrid: Displays the 6 rows for the player’s guesses and highlights each letter based on its correctness.
- Keyboard: Handles both virtual and physical keypresses for guessing.
- GameOverModal: Displays when the game is over or if the player wins, with an option to play again.
- Redux Store: Manages the game state, including current guess, results, and whether the game is over.

## Theming and Styling
This project uses Styled Components to handle the styles for each component in a modular way. The color themes for correct/present/absent letters, keyboard hover effects, and grid cell animations are handled through a central theme object located in /src/styles/theme.ts.

## Future Improvements
1. API Integration: Future versions will integrate with the Merriam-Webster Dictionary API to validate guesses and dynamically source the word of the day.

2. Trivia Wordle Expansion: This project will eventually evolve into a trivia-based Wordle game, where players can solve word-based puzzles related to trivia questions.

3. Additional Features:
  - Dark mode support
  - Leaderboard functionality
  - Timed challenges

## Project Structure
The project is organized as follows:
- /public
  - dictionary.txt        # List of valid 5-letter words
- /src
  - /components           # React components like WordleGrid, Keyboard, etc.
  - /services             # API or utility services, including dictionaryApi.ts
  - /store                # Redux slice and store configuration
  - /styles               # Global theme and styling configurations
  - /utils                # Utility functions for evaluating guesses and managing the game state
  - App.tsx               # Main React app component
  - index.tsx             # Entry point for the React app
- /types                  # TypeScript type definitions (if needed)

## Running Tests
Currently, there are no unit or integration tests implemented. In future versions, we plan to use Jest for testing key components and logic.

## Build and Deploy
To build the project for production: 
npm run build

This will generate a dist folder with optimized assets.

To serve the production build locally:
npm run serve

## Technology Stack
- React: JavaScript library for building user interfaces
- Redux: State management library for predictable state
- TypeScript: Typed superset of JavaScript for type safety
- Styled Components: CSS-in-JS library for component-level styles
- Vite: Next-generation frontend tooling for fast development

## License
This project is licensed under the MIT License.