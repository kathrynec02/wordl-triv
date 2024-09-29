import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { WordleGame } from './components/WordleGame';
import { theme } from './styles/theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.main};

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  font-size: 2.5rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Title>Wordle TypeScript</Title>
          <WordleGame />
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;