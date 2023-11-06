import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import image_illustration from "../assets/IMAGE_ILLUSTRATION.png";

function AddModal(closeHandler) {
  let image_text_loader = [
    "I am working hard to create your image",
    "I hope you will like it",
    "Your image will show up here shortly!",
  ];
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
          className="bg-[#232323] rounded-lg flex flex-col items-center justify-center"
        >
          <img className="w-1/4 h-1/4" src={image_illustration} />
          <div className="text-white text-lg my-1 font-montserrat-regular ">
            Inspire the Image with a Prompt
          </div>
        </div>
        <div className="lg:w-2/5 ">
          <div className="w-full flex flex-col items-start ">
            <div className="text-white text-2xl my-1 font-montserrat-regular ">
              {"Title Your Vision"}
            </div>
            <textarea
              required
              rows="5"
              className="rounded-lg p-2  text-white font-montserrat-regular bg-[#232323] outline-none border-0"
              placeholder="Describe Your Artistry"
            ></textarea>
            <textarea
              required
              className="rounded-lg p-2  text-white font-montserrat-regular bg-[#232323] outline-none border-0"
              placeholder="Creative Caption"
            ></textarea>
            <div className="text-white text-2xl my-1 mt-3 font-montserrat-regular ">
              {"Shape the Image's Soul"}
            </div>

            <div className="p-3 mt-3 opacity-70 hover:opacity-100 cursor-pointer bg-white font-montserrat-regular  rounded-lg">
              Make It Happen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
