import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function LoginModal(
  loginCloseHandler,
  loginHandler,
  handleLoginData,
  LoginData,
  invalidCred,
  disabled
) {
  return (
    <div className=" fixed top-0 bottom-0 w-full h-full z-50 bg-[#00000099] flex items-center justify-center">
      <div className="relative bg-[#3F4048] md:w-2/5 sm:w-full h-5/6 rounded-lg flex flex-wrap flex-col justify-center items-center">
        <AiFillCloseCircle
          onClick={loginCloseHandler}
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

        <div className="w-10/12 flex-col flex m-10 items-center ">
          {invalidCred && (
            <div className=" p-2 m-2 text-red-400 text-lg font-montserrat-regular">
              Invalid Credential check and retry
            </div>
          )}
          <textarea
            onChange={(e) => {
              handleLoginData({
                ...LoginData,
                [e.target.name]: e.target.value,
              });
            }}
            name="username"
            value={LoginData.username}
            required
            cols={25}
            rows={1}
            className="rounded-lg p-2 m-2 resize-none w-full text-white font-montserrat-regular text-lg bg-[#232323] outline-none border-0"
            placeholder="Your Email Address"
          ></textarea>
          <textarea
            onChange={(e) =>
              handleLoginData({ ...LoginData, [e.target.name]: e.target.value })
            }
            name="password"
            value={LoginData.password}
            required
            cols={25}
            rows={1}
            className="rounded-lg p-2 m-2 resize-none w-full text-white font-montserrat-regular text-lg bg-[#232323] outline-none border-0"
            placeholder="Your Password"
          ></textarea>
        </div>
        <div
          onClick={loginHandler}
          style={
            disabled
              ? { cursor: "not-allowed", opacity: "20%" }
              : { cursor: "pointer" }
          }
          className="p-3 mt-3 opacity-70 hover:opacity-100 cursor-pointer bg-white font-montserrat-regular  rounded-lg"
        >
          Login
        </div>
      </div>
    </div>
  );
}
