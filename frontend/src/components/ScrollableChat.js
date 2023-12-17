import * as React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { Avatar } from "@chakra-ui/avatar";
import { useAuthContext } from "../hooks/useAuthContext";

const ScrollableChat  = ({ messages }) => {
  const { user } = useAuthContext();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user.type) ||
              isLastMessage(messages, i, user.type))&&<Avatar
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
            />  }
            <span
              style={{
                backgroundColor: `${
                  (m.patientSender &&  user.type=="Patient")||(m.pharmacistSender &&  user.type=="Pharmacist") ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.type),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;