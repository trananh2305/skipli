import image from "../assets/image.png";
import { Link } from "react-router-dom";

const ConversationList = () => {
  return (
    <div className=" flex-col  flex p-0 min-h-[calc(100vh-150px)] rounded-r-none bg-white rounded-xl gap-4">
      {[3, 2, 1].map((conversation) => {
        return (
          <Link to={`/message/${123}`} key={123}>
            <div className="flex items-center gap-2 p-5 bg-slate-200  transition-all rounded-lg hover:bg-slate-300">
              <div className="w-full">
                <div className="flex gap-3 items-center">
                  <img src={image} alt="" className="size-8 rounded-full" />
                  <p className="inline-block font-semibold"> Employe 1</p>{" "}
                </div>
                <p className="text-sm  mt-2">helo</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ConversationList;
