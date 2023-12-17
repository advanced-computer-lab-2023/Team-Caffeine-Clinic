import React from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from '../components/Navbar'
import MyClinicChats from '../components/MyClinicChats'

const ClinicChatPage  = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />

      <ChakraProvider >
        <Flex direction="row" justify="space-between" align="flex-start" w="100%" h="91.5vh" p="10px">
          {user && <MyClinicChats />}
          {user && <Chatbox />}
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default ClinicChatPage;