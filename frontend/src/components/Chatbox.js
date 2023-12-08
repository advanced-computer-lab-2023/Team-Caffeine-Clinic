import { Box, Flex } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import {ChatState} from '../context/ChatProvider'
import * as React from 'react'


const Chatbox = () => {
    
  const { selectedChat } = ChatState();

  return (
    <Flex
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      h={"100%"}
    >
      <SingleChat/>
    </Flex>
  );
};

export default Chatbox;