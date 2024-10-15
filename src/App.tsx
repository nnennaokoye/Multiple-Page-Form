import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/SchoolForm'; 
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
