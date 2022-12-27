// import {Groups} from '@screens/Groups';
import {Players} from '@screens/Players';
// import {NewGroup} from '@screens/NewGroup';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';

import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Players />
      {/* <Groups /> */}
      {/* <NewGroup /> */}
    </ThemeProvider>
  );
}
