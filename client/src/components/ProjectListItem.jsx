import React from 'react';
import { Link } from 'react-router-dom';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from '@chakra-ui/react';

export default function ProjectListItem(props) {
  const { project } = props;
  return (
    <Flex mt={10} p={0} w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={8}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
        minW="xl"
        alignItems="center"
      >
        <Box mt={2} textAlign="center">
          <Text
            fontSize="2xl"
            color={useColorModeValue('gray.700', 'white')}
            fontWeight="700"
            _hover={{
              color: useColorModeValue('gray.600', 'gray.200'),
              textDecor: 'underline',
            }}
          >
            {project.title}
          </Text>
          <chakra.p mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
            {project.description}
          </chakra.p>
        </Box>
        <Flex justifyContent="center" mt={4} alignItems="center">
          <Button colorScheme="twitter">
            <Link
              alignItems="center"
              to={`/projects/${project._id}`}
              px={3}
              py={1}
              bg="gray.600"
              fontSize="sm"
              fontWeight="700"
              rounded="md"
              _hover={{ bg: 'gray.500' }}
            >
              Go to project
            </Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
