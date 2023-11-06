import React from "react";
import {
  AiFillCloseCircle,
  AiFillFacebook,
  AiFillHeart,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";

function GalleryModal(modalData, closeHandler) {
  return (
    <div className=" fixed top-0 bottom-0 w-full h-full z-50 bg-[#00000099] flex items-center justify-center">
      <div className="relative bg-[#3F4048] w-4/5 h-5/6 rounded-lg flex flex-wrap justify-around items-center">
        <AiFillCloseCircle
          onClick={closeHandler}
          className="absolute top-5 right-5"
          size={30}
          color="white"
        />
        <div
          style={{
            width: "37vw",
            height: "37vw",
          }}
          className="bg-red-50 rounded-lg"
        >
          <img className="w-full h-full rounded-lg" src={modalData.image_url} />
        </div>
        <div className="lg:w-1/3 ">
          <div>
            <div className="text-white text-4xl my-7 font-montserrat-light ">
              {modalData?.title}
            </div>
            <div className="text-xl text-white font-montserrat-regular">
              {modalData?.description}
            </div>
            <div className="flex my-5">
              <div className="flex items-center mr-8 text-white">
                <AiFillHeart size={20} className="mr-2" color="#FFF" />
                {"10K"}
              </div>
              <div className="flex items-center mr-4 text-white">
                <BsFillChatFill size={18} className="mr-2" color="#FFF" />
                {"5K"}
              </div>
            </div>
          </div>

          <div className="flex ">
            <AiOutlineWhatsApp
              size={40}
              color="#FFF"
              className="p-3 bg-[#26272F] rounded-full mr-2 transition duration-300 ease-in-out hover:bg-[#51cc5c] "
            />
            <AiFillFacebook
              className="p-3 bg-[#26272F] rounded-full mx-2 transition duration-300 ease-in-out hover:bg-[#0b84ed]"
              color="#FFF"
              size={40}
            />
            <AiFillInstagram
              className="p-3 bg-[#26272F] rounded-full mx-2  transition duration-300 ease-in-out hover:bg-pink-500"
              color="#FFF"
              size={40}
            />
            <AiFillLinkedin
              color="#FFF"
              size={40}
              className="p-3 bg-[#26272F] rounded-full mx-2 transition duration-300 ease-in-out hover:bg-[#317daf]"
            />
          </div>

          <div className="flex my-8">
            {[1, 2, 3, 4].slice(0, 4)?.map((item, key) => {
              return (
                <div
                  style={{ width: "10vh" }}
                  key={key}
                  className="mr-4 rounded-lg"
                >
                  <img
                    className="rounded-lg"
                    src={"https://picsum.photos/20" + key}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
