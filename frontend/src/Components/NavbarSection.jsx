import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO.png";
import { AiFillPlusCircle } from "react-icons/ai";
import AddModal from "./AddModal";
import ProfileModal from "./ProfileModal";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import Axios from "axios";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileAvailable, setIsProfileAvailable] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [LoginData, setLoginData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [myimage, setImage] = useState("");
  const [invalidCred, setInvalidCred] = useState(false);

  useEffect(() => {
    setIsProfileAvailable(Cookies.get("username"));
  }, []);

  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const profileCloseHandler = () => {
    setIsProfileModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const loginCloseHandler = () => {
    setIsLoginModalOpen(false);
  };

  const handleData = (formDataModal) => {
    setFormData(formDataModal);
  };
  const handleLoginData = (LoginDataModal) => {
    setLoginData(LoginDataModal);
  };
  const loginHandler = async () => {
    setDisabled(true);
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(LoginData.username) && LoginData.password) {
      setInvalidCred(false);
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const jsonData = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        setDisabled(false);
      }
    } else {
      setInvalidCred(true);
      setDisabled(false);
    }
  };

  const imageLoaderApi = async () => {
    if (formData.desc) {
      console.log(formData);
      setDisabled(true);
      try {
        const response = await fetch(
          "https://artorise.onrender.com/apiforimage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const jsonData = await response.json();

        setImage(jsonData.output);
        setDisabled(false);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDisabled(false);
      }
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
      {isProfileModalOpen &&
        isProfileAvailable &&
        ProfileModal(profileCloseHandler, isProfileAvailable)}
      {isLoginModalOpen &&
        !isProfileAvailable &&
        LoginModal(
          loginCloseHandler,
          loginHandler,
          handleLoginData,
          LoginData,
          invalidCred,
          disabled
        )}

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
              src={`https://api.multiavatar.com/${
                isProfileAvailable ? isProfileAvailable + ".png" : "NOUSER.png"
              }`}
              className="rounded-full h-full w-full "
              style={{ padding: 1 }}
              onClick={() =>
                isProfileAvailable
                  ? setIsProfileModalOpen(!isProfileModalOpen)
                  : setIsLoginModalOpen(!isLoginModalOpen)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
