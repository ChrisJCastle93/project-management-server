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
      <Heading>{project.title}</Heading>
      <Heading>{project.description}</Heading>
      <br />
      <br />
      <hr />
      <Heading>Tasks List:</Heading>
      {tasksList}
      <br />
      <br />
      <hr />
      <Heading>Add new Task</Heading>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <VStack mx="auto" w="400px">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={newTaskTitle}
              onChange={handleTitleChange}
            />
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={newTaskDescription}
              onChange={handleDescriptionChange}
            />
            <Button type="submit" className="primary">
              Create task
            </Button>
          </VStack>
        </FormControl>
      </form>
    </div>
  );
}
