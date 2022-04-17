import React, { useState } from 'react';
import { apiService } from '../api/service';
import { Heading, FormControl, VStack, FormLabel, Input, Button, Textarea, chakra, Box } from '@chakra-ui/react'

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = e => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleDescriptionChange = e => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    apiService.createProject(title, description);
    setTitle('');
    setDescription('');
  };

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
            color='gray.900'
            lineHeight="shorter"
          >
            Create New Project
          </chakra.h1>
        </Box>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <FormControl>
          <VStack mx="auto" w="400px">
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={handleTitleChange} />
            <br />
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <br />
            <Button type="submit" colorScheme="twitter" className="primary">
              Create Project
            </Button>
          </VStack>
        </FormControl>
      </form>
    </div>
  );
}
