import { Header } from '../containers/header/header';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../core/store/store';
import { darkTheme, lightTheme } from '../theme';
import WidgetList from '../containers/widgetList';
import Hourly from '../containers/hourly/hourly';
import { Daily } from '../containers/daily/daily';

const Main = styled.main`
  background: url(${({ theme }) => theme.backgroundImage}) no-repeat center 120%,
    linear-gradient(
      ${({ theme }) => theme.backgroundGradient.color1} 0%,
      ${({ theme }) => theme.backgroundGradient.color2} 100%
    );
`;

export function App() {
  const darkMode = useSelector((state: RootState) => state.app.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Main className="h-screen w-screen overflow-y-scroll">
        <div className="container contents">
          <div className="max-w-screen-2xl px-6 mx-auto">
            <Header />
            <WidgetList />
            <Hourly />
            <Daily />
          </div>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
