import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO.png";
import { AiFillPlusCircle } from "react-icons/ai";
import AddModal from "./AddModal";
import ProfileModal from "./ProfileModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [myimage, setImage] = useState("");
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const profileCloseHandler = () => {
    setIsProfileModalOpen(false);
  };
  const handleData = (formDataModal) => {
    setFormData(formDataModal);
  };

  const imageLoaderApi = async () => {
    setDisabled(true);
    try {
      const response = await fetch("http://localhost:5000/apiforimage", {
        method: "GET",
        body: formData,
      });
      const jsonData = await response.json();

      setImage(jsonData.output);
      setDisabled(false);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDisabled(false);
    }
  };

  return (
    <>
      {isModalOpen &&
        AddModal(
          closeHandler,
          handleData,
          formData,
          imageLoaderApi,
          disabled,
          myimage
        )}
      {isProfileModalOpen && ProfileModal(profileCloseHandler)}

      <div
        style={{ backgroundColor: "#3F4048" }}
        className="h-1/3 flex justify-between p-3"
      >
        <div>
          <img src={Logo} className="h-full" />
        </div>
        <div className="flex flex-row justify-center items-center cursor-pointer">
          <AiFillPlusCircle
            size={30}
            color="#fff"
            className="mx-3 h-8 w-8 rounded-full "
            onClick={() => setIsModalOpen(!isModalOpen)}
          />

          <div className="mx-5 bg-white rounded-full h-10 w-10 bg-gradient-to-b from-rose-400 via-red-300 to-lime-200 ">
            <img
              src={
                "https://api.multiavatar.com/" + "grigarycantonyfghjkl" + ".png"
              }
              className="rounded-full h-full w-full "
              style={{ padding: 1 }}
              onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
