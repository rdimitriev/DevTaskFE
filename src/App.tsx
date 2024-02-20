import React from 'react';
import Header from './components/common/Header';
import Container from './components/common/Container';
import Files from './components/Files';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Files />
      </Container>
    </>
  );
}

export default App;
