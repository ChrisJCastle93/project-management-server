import React from 'react';
import { Link } from 'react-router-dom';
import {
  chakra,
  HStack,
  Flex,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import { AiFillHome, AiOutlineInbox } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';

export default function NavBar() {
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  );
  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        // borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex>
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <Link to="/">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Home
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Projects
                  </Button>
                </Link>
                <Link to="/projects/new">
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    New Project
                  </Button>
                </Link>
              </HStack>
            </Flex>
            <Spacer />
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <Button colorScheme="brand" variant="ghost" size="sm">
                  <Link to="/signup">Sign up</Link>
                </Button>
                <Button colorScheme="brand" variant="ghost" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
              </HStack>
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}
