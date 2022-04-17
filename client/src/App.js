import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { ProjectsList } from './components/ProjectsList';
import NewProject from './components/NewProject';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';
import NavBar from './components/NavBar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" flexDirection="column" minH="100vh">
        <NavBar></NavBar>
        <Grid flexGrow="1">
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
