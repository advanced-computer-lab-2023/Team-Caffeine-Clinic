import React from "react";
import {ChatState} from "../context/ChatProvider";
import { useAuthContext } from "../hooks/useAuthContext";
import { useToast } from "@chakra-ui/toast";
import {useState} from  "react";
import { useEffect } from "react";
import ChatLoading from "./ChatLoading";
import { Button } from "@chakra-ui/react";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { getSender } from "../config/ChatLogics";
import { Tooltip } from "@chakra-ui/tooltip";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/hooks";
import UserListItem from "./userAvatar/UserListItem";
import { Input } from "@chakra-ui/input";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

const MyClinicChats = () =>{

const {
    setSelectedChat,
    selectedChat,
    chats,
    setChats,
    } = ChatState();
  const toast =useToast();

const { user } = useAuthContext();  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resultFilter, setResultFilter] = useState([]);

  useEffect( () => {
  
    const fetchSearchResults = async() => { 
     
      setLoading(true); 
      var response = null;
    if(user.type=="Patient"){
      response = await fetch(`/api/patient/chat/getDoctors`, {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${user.token}`
       },
     });
   }
   else
   if(user.type=="Doctor"){
    response = await fetch(`/api/doctorInfo/chatDoc/viewPharmacists`, {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${user.token}`
     },
   });
  }
  
  
     const data = await response.json();
     if (response.ok) {
             setLoading(false);
             setSearchResult(data);
             setResultFilter(data);
      }
    else {
      toast({
        title: "Unable to find User",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  fetchSearchResults();
    }, [selectedChat]);


    const handleSearch = async (searching) => {

      setSearch(searching);
  
        setLoading(true);
  
        const filteredResults = resultFilter.filter(item =>
          item.username.toLowerCase().includes(searching.toLowerCase())
        );
  
        setSearchResult(filteredResults);
  
            if(searchResult.length>0){
               setLoading(false);
            } else {
              setLoading(false);
              toast({
                title: "Unable to find User",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
              return;
            }
  
    };
    
    
    const accessChat = async (username) => {
  
      try {
        setLoadingChat(true);
        var response = null;
  
        if(user && user.type=="Patient"){
         response = await fetch('/api/patient/chat/accessChats', {
          method: 'POST',
          body: JSON.stringify({ username }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
      if(user && user.type=="Doctor"){
        response = await fetch('/api/doctorInfo/chatDoc/accessChats', {
          method: 'POST',
          body: JSON.stringify({ username }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
    
        if (!response.ok) {
          throw new Error(`Failed to fetch the chat. Status: ${response.status}`);
        }
    
        const data = await response.json();
  
        if (chats && !chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
  
      } catch (error) {
        console.error('Error fetching the chat:', error);
    
        toast({
          title: 'Error fetching the chat',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    };

const fetchChats = async () => {

    try {
      var response = null;
    if(user && user.type=="Patient"){
     response = await fetch('/api/patient/chat/allDocChats', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${user.token}`
        },
    });
  }
  if(user && user.type=="Doctor"){
     response = await fetch('/api/doctorInfo/chatDoc/allChats', {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${user.token}`
      },
  });
  }

    const data = await response.json();
    if (response.ok) {
      setChats(data);
    } 

    }catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchChats]);

  return (
    <>
   <Flex
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      h={"100%"}
    >
       <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      

      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost" onClick={onOpen}>
          <Text px={4}>
            Search User
          </Text>
          <i className="fas fa-search" style={{marginBottom:"10px"}}></i>
        </Button>
      </Tooltip>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Username</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}> 
              <Input
                placeholder="Search by username"
                mr={2}
                value={search}
                onChange={ e=>handleSearch(e.target.value) } />
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user.username}
                  user={user}
                   handleFunction={() => accessChat(user.username)} 
                  />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
       {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  <b>{getSender(user, chat.patient , chat.pharmacist,chat.doctor)}</b>
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>Last Message : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box> 
    </Flex>
    </>
  );
};
export default MyClinicChats;