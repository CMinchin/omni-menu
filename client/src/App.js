import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/home';
import Restaurant from './pages/restaurant';
import User from './pages/user';
import NotFound from './pages/home';

import "./index.css"
import "./style.css"

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const title = 'Omni Menu';
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav>
          {/* This is not exactly professional but it is functional */}
          <Routes>
            <Route path='/'/>
            <Route path="*" element={
              <h2>Omni Menu</h2>
            }/>
          </Routes>
          <a href='/'>Home</a>
          <a href='/user'>User</a>
          <a href='/restaurant'>Restaurant</a>
        </nav>
        <div className='superPage'>
          <div className='page'>
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/restaurant" 
                element={<Restaurant />}
              />
              <Route 
                path="/user" 
                element={<User />}
              />
              <Route 
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
