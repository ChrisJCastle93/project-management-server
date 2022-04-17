import React from 'react'
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Button,
  HStack,
} from '@chakra-ui/react';

const Home = () => {
  return (
    <Flex px={4} py={32} mx="auto">
      <Box mx="auto" w="100%">
        <chakra.p
          mb={2}
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wide"
          color="gray.400"
          textTransform="uppercase"
        >
          Ironhack
        </chakra.p>
        <chakra.h1
          mb={3}
          fontSize={{ base: '3xl', md: '4xl' }}
          fontWeight="bold"
          lineHeight="shorter"
          color={useColorModeValue('gray.900', 'white')}
        >
          Project Management MERN App
        </chakra.h1>
        <chakra.p mb={5} color="gray.500" fontSize={{ md: 'lg' }}>
          A functioning full stack app to practice React routing, auth, and
          Chakra.
        </chakra.p>
        <HStack>
          <Button
            as="a"
            w={{ base: 'full', sm: 'auto' }}
            variant="solid"
            colorScheme="twitter"
            size="lg"
            mb={{ base: 2, sm: 0 }}
            cursor="pointer"
          >
            Sign up for free
          </Button>
          <Button
            as="a"
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            cursor="pointer"
          >
            Login
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Home;
