import React from 'react';
import { Flex, Divider, Button, Text, Heading, Box } from '@chakra-ui/react';
import { apiService } from '../api/service';

export default function TaskItem(props) {
  const { task } = props;
  // console.log(task)

  const handleDelete = () => {
    const { _id, project } = task;
    console.log(_id, project);
    apiService
      .deleteTask(project, _id)
      .then(response => {
        console.log(response.data, '<=== response.data');
        props.deleteItem(response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <Box
      mt={4}
      border="4px"
      borderRadius="10"
      bg="gray.50"
      borderColor="gray.300"
      className=""
    >
      <Flex p={4} direction="row" alignItems="center" justifyContent="space-between">
        <Heading size="lg">{task.title}</Heading>
        <Button colorScheme="red" onClick={handleDelete}>DELETE</Button>
      </Flex>
      <Divider />
      <Text p={4}>{task.description}</Text>
    </Box>
  );
}
