import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        
      </div>
    </>
  );
};

export default AllUsers;
