import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function ProfileModal(profileCloseHandler) {
  return (
    <div className=" fixed top-0 bottom-0 w-full h-full z-50 bg-[#00000099] flex items-center justify-center">
      <div className="relative bg-[#3F4048] w-2/5 h-5/6 rounded-lg flex flex-wrap flex-col justify-center items-center">
        <AiFillCloseCircle
          onClick={profileCloseHandler}
          className="absolute top-5 right-5"
          size={30}
          color="white"
        />
        <div className="mx-5  bg-white rounded-full h-2/6 bg-gradient-to-b from-rose-400 via-red-300 to-lime-200 ">
          <img
            src={
              "https://api.multiavatar.com/" + "grigarycantonyfghjkl" + ".png"
            }
            className="rounded-full h-full w-full "
            style={{ padding: 5 }}
          />
        </div>
        <div className="text-white text-2xl  font-montserrat-regular my-10">
          @asdadlakslamslj
        </div>
        <div
          onClick={profileCloseHandler}
          className="p-3 mt-3 opacity-70 hover:opacity-100 cursor-pointer bg-white font-montserrat-regular  rounded-lg"
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
