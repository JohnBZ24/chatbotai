import robotProfileImage from "../assets/robot.png";
import userProfileImage from "../assets/user.png";
import loadingspinnergif from "../assets/loading-spinner.gif";

type ChatM = {
  message: string;
  sender: string;
};
export function ChatMessage({ message, sender }: ChatM) {
  return (
    <div
      className={
        sender === "user"
          ? "flex justify-end items-start "
          : "flex items-center"
      }
    >
      {sender === "robot" && (
        <img src={robotProfileImage} className="w-[45px]" />
      )}
      <div className="bg-[rgb(238,238,238)] p-[15px] rounded-full mr-[10px] ml-[10px]mb-[20px]">
        {message === "loading" ? (
          <img className=" w-[45px]" src={loadingspinnergif} />
        ) : (
          message
        )}
      </div>
      {sender === "user" && <img src={userProfileImage} className="w-[45px]" />}
    </div>
  );
}
type ChatMs = {
  chatmessages: { message: string; sender: string }[];
};
export function ChatMessages({ chatmessages }: ChatMs) {
  const renderedmessages = chatmessages.map((cm) => {
    return <ChatMessage message={cm.message} sender={cm.sender} />;
  });
  return <>{renderedmessages}</>;
}
