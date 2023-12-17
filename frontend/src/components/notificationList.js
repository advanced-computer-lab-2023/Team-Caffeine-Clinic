import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const NotificationList = ({ notification }) => {


  return (
    <Box
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box>
        <Text fontSize="xs">
          <b>{notification.title}: </b>
          {notification.body}
        </Text>
      </Box>
    </Box>
  );
};

export default NotificationList;