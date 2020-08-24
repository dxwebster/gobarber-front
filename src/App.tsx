import React from 'react';

// import SignIn from './pages/Signin';
import SignIn from './pages/Signin';
import GlobalStyle from './styles/global';
// import { isPrimitive } from 'util';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
