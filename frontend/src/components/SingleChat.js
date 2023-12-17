import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import "../CSS/style.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ScrollableChat from "./ScrollableChat";
import { useAuthContext } from "../hooks/useAuthContext";
import {ChatState} from '../context/ChatProvider'
import ScrollableFeed from "react-scrollable-feed";

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const { selectedChat, setSelectedChat,  } = ChatState();

    const {user} = useAuthContext();


  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {

      setLoading(true);
      var response = null;

      if(user && user.type=="Patient"){
       response = await fetch(`/api/patient/chat/getMessages/${selectedChat._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    if(user && user.type=="Pharmacist"){
      response = await fetch(`/api/medicine/chatPharma/getMessages/${selectedChat._id}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${user.token}`,
       },
     });
   }
   if(user && user.type=="Doctor"){
    response = await fetch(`/api/doctorInfo/chatDoc/getMessages/${selectedChat._id}`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${user.token}`,
     },
   });
 }
  
      if (!response.ok) {
        throw new Error('Failed to Fetch Messages');
      }
  
      const data = await response.json();
      setMessages(data);
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {

        setNewMessage("");

        var response = null;
        if(user.type=="Patient"){

         response = await fetch('/api/patient/chat/sendMessage', {
            method: 'POST',
            body: JSON.stringify({ content:newMessage , chatId:selectedChat._id }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });
        }
        else
        if(user.type=="Pharmacist"){

          response = await fetch('/api/medicine/chatPharma/sendMessage', {
             method: 'POST',
             body: JSON.stringify({ content:newMessage , chatId:selectedChat._id }),
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`,
             },
           });
         }
         if(user.type=="Doctor"){

          response = await fetch('/api/doctorInfo/chatDoc/sendMessage', {
             method: 'POST',
             body: JSON.stringify({ content:newMessage , chatId:selectedChat._id }),
             headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${user.token}`,
             },
           });
         }
      
          if (!response.ok) {
            throw new Error('Failed to Send Message');
          }
      
          const data = await response.json();

          setMessages([...messages, data]);

      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              w={"6%"}
            />
            {messages &&
                <>
                 <b> {getSender(user, selectedChat.patient,selectedChat.pharmacist,selectedChat.doctor)} </b>
                </>
               }
          </Text>
          <Flex
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h={"90%"}
            borderRadius="lg"
            overflowY="hidden"
          >
             {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

              <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl> 
          </Flex>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;