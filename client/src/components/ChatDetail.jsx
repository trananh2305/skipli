import { useState } from "react";
import { useParams } from "react-router-dom";

const ChatDetail = () => {
  const { id } = useParams();

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    setNewMessage("");
  };

  return (
    <div className=" min-h-[calc(100vh-150px)] bg-slate-200 flex flex-col justify-between  rounded-xl w-full">
      <div className="space-y-1">
        {[].map((msg) => {
          return (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender._id === id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender._id === id
                    ? " bg-primary-main text-white rounded-tr-none"
                    : "bg-white shadow rounded-tl-none"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card flex gap-2 p-2 ">
        {/* <AccountCircle /> */}
        <input
          className="flex-1 px-1 border outline-none border-[#2C7BE5] rounded"
          size="small"
          placeholder="Reply message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button disabled={!newMessage.trim()} onClick={handleSendMessage} className="bg-[#2C7BE5] text-white px-4 py-1 rounded hover:bg-[#1a5bbf] hover:cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
