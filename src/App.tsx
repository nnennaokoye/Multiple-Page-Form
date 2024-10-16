import React from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store/store';
import SchoolForm from './components/SchoolForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
      <SchoolForm />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
