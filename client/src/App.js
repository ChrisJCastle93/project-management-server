import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { ProjectsList } from './components/ProjectsList';
import NewProject from './components/NewProject';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import { apiService } from './api/service';

function App() {
  let [errors, setErrors] = useState('');
  let [user, setUser] = useState({ user: null, isLoggedIn: false });

  // const navigate = useNavigate();

  const setUserStateLogin = async ({ email, password }) => {
    const result = await apiService.login(email, password);
    // console.log(result.data)
    setUser({ user: result.data, isLoggedIn: true });
    // navigate('/');
  };

  const setUserStateSignup = async ({ email, password }) => {
    const result = await apiService.signup({ email, password });
    setUser({ user: result.data, isLoggedIn: false });
    // navigate('/');
  };

  useEffect(() => {
    console.log(user);
    const fetchIsLoggedIn = async () => {
      try {
        const res = await apiService.isLoggedIn();
        setUser({ user: res.data, isLoggedin: true });
      } catch (e) {
        setUser({ user: null, isLoggedin: false });
      }
    };

    if (!user.isLoggedin) {
      fetchIsLoggedIn();
    }
  }, [user.isLoggedin]);

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" flexDirection="column" minH="100vh">
        <NavBar></NavBar>
        <Grid flexGrow="1">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/signup"
              element={
                <Signup
                  setUserStateSignup={setUserStateSignup}
                  errors={errors}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Login setUserStateLogin={setUserStateLogin} errors={errors} />
              }
            ></Route>
            <Route path="/projects" element={<ProjectsList />}></Route>
            <Route path="/projects/new" element={<NewProject />}></Route>
            <Route path="/projects/:id" element={<ProjectDetails />}></Route>
          </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
