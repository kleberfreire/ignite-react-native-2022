import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';
import {Routes} from '@routes/index';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </ThemeProvider>
  );
}
