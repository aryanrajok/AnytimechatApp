import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/Avatar.svg";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
const UserChat = ({ chat, user }) => {
  const { recipentUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipentUser?._id);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipentUser?.name}</div>
          <div className="text">Text messg</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">25/06/2025</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
