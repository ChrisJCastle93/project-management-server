import React from 'react';
import { VStack, HStack, Button, Text, Heading } from '@chakra-ui/react';
import { apiService } from '../api/service';

export default function TaskItem(props) {
  const { task } = props;
  // console.log(task)

  const handleDelete = () => {
    const { _id, project } = task;
    console.log(_id, project)
    apiService
      .deleteTask(project, _id)
      .then(response => {
        console.log(response.data, '<=== response.data');
        props.deleteItem(response.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="">
      <br />
      <VStack>
        <Heading>{task.title}</Heading>
        <Text>{task.description}</Text>
        <HStack>
          {/* <Button>
            <Link to={`projects/${task.id}/edit`}>EDIT FORM</Link>
          </Button> */}
          <Button onClick={handleDelete}>DELETE</Button>
        </HStack>
      </VStack>
      <br />
    </div>
  );
}
