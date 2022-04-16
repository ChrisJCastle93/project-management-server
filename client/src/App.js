import React from 'react';
import { ChakraProvider, Box, Grid, theme, HStack } from '@chakra-ui/react';
import { Link, Routes, Route } from 'react-router-dom';
import { ProjectsList } from './components/ProjectsList';
import NewProject from './components/NewProject';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        bg=""
        textAlign="center"
        minH="100vh"
        p={3}
        fontSize="xl"
      >
        <nav>
          <HStack>
            <h1>PROJECT MGMT APP</h1>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/projects/new">New Project</Link>
          </HStack>
        </nav>
        <Grid flexGrow="1" bg="">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/projects" element={< ProjectsList />}></Route>
            <Route path="/projects/new" element={< NewProject />}></Route>
            <Route path="/projects/:id" element={< ProjectDetails />}></Route>
          </Routes>
        </Grid>
        <footer>
          <h1>This is made by Chris Castle</h1>
        </footer>
      </Box>
    </ChakraProvider>
  );
}

export default App;
