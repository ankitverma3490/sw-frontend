// import 'react-native-gesture-handler';
// import Navigation from './src/navigation/Navigation';
// import React from 'react';

// const App = () => {
//   return <Navigation />;
// };

// export default App;
import 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    // Wrapping the app in GestureHandlerRootView
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
