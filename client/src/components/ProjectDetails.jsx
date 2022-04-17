import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../api/service';
import TaskItem from './TaskItem';
import {
  VStack,
  FormControl,
  Input,
  Button,
  FormLabel,
  Heading,
  useColorModeValue,
  Box,
  chakra,
  Grid,
  GridItem,
  Textarea,
} from '@chakra-ui/react';

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState({});
  const [newTaskTitle, setnewTaskTitle] = useState('');
  const [newTaskDescription, setnewTaskDescription] = useState('');

  useEffect(() => {
    apiService
      .getOneProject(id)
      .then(response => setProject(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleTitleChange = e => {
    const { value } = e.target;
    setnewTaskTitle(value);
  };

  const handleDescriptionChange = e => {
    const { value } = e.target;
    setnewTaskDescription(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    apiService
      .createNewTask(id, newTaskTitle, newTaskDescription)
      .then(response => setProject(response.data))
      .catch(err => console.log(err));
    setnewTaskDescription('');
    setnewTaskTitle('');
  };

  const deleteItem = updatedProject => {
    setProject(updatedProject);
  };

  const tasksList = project.tasks ? (
    project.tasks.map((task, index) => {
      return <TaskItem key={task._id} task={task} deleteItem={deleteItem} />;
    })
  ) : (
    <p>NO TASKS</p>
  );

  return (
    <div>
      <Box px={4} py={10} mx="auto">
        <Box
          w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }}
          textAlign={{ base: 'left', md: 'center' }}
          mx="auto"
        >
          <chakra.h1
            mb={3}
            fontSize={{ base: '4xl', md: '5xl' }}
            fontWeight={{ base: 'bold', md: 'extrabold' }}
            color={useColorModeValue('gray.900', 'gray.100')}
            lineHeight="shorter"
          >
            {project.title}
          </chakra.h1>
          <chakra.p
            mb={6}
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.500"
            lineHeight="base"
          >
            {project.description}
          </chakra.p>
        </Box>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" mx="200px" gap={0}>
        <GridItem
          borderRight="1px"
          borderColor="gray.200"
          textAlign="left"
          p={8}
        >
          <Heading as="h3" size="lg">
            Task List:
          </Heading>
          {tasksList}
        </GridItem>
        <GridItem textAlign="left" p={8}>
          <Heading as="h3" size="lg">
            Add new Task
          </Heading>
          <br />
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <VStack alignItems="start" mx={0} w="400px">
                <FormLabel py={1}>Title</FormLabel>
                <Input
                  type="text"
                  value={newTaskTitle}
                  onChange={handleTitleChange}
                />
                <FormLabel py={1}>Description</FormLabel>
                <Input
                  type="text"
                  value={newTaskDescription}
                  onChange={handleDescriptionChange}
                />
                <br />
                <Button type="submit" className="primary">
                  Create task
                </Button>
              </VStack>
            </FormControl>
          </form>
        </GridItem>
      </Grid>
    </div>
  );
}
