import React, { useState, useEffect } from "react";
import CategorySection from "./CategorySection";
import { AiFillHeart } from "react-icons/ai";
import GalleryModal from "./GalleryModal";

function ContentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [datalist, setDataList] = useState([]);
  const closeHandler = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // const datalist = [
  //   {
  //     title: "Nostrud Exercitation",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     image_url: "https://picsum.photos/500",
  //     likes: 5000,
  //     user_id: "652d1f2d587986b80f248adb",
  //   },
  //   {
  //     title: "lorem ipsum",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     image_url: "https://picsum.photos/500",
  //     likes: 5000,
  //     user_id: "652d1f2d587986b80f248adb",
  //   },
  //   {
  //     title: "lorem ipsum",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     image_url: "https://picsum.photos/500",
  //     likes: 5000,
  //     user_id: "652d1f2d587986b80f248adb",
  //   },
  // ];

  const apiCaller = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let response = await fetch("https://artorise.onrender.com/getdata", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.text();
    setDataList(JSON.parse(data));
  };
  useEffect(() => {
    apiCaller();
  }, []);
  let shortlist = datalist.slice(0, 5);

  return (
    <div
      style={{ backgroundColor: "#33343D" }}
      className="flex flex-col items-center justify-center"
    >
      {isModalOpen && GalleryModal(modalData, closeHandler, shortlist)}
      <CategorySection className="w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 w-4/5 ">
        {datalist &&
          datalist?.map((item, key) => {
            return (
              <div
                key={key}
                style={{ width: "38vh", height: "38vh" }}
                className="mx-auto my-10 relative bg-[#00000099] rounded-lg cursor-pointer"
              >
                <img
                  className="rounded-lg w-full h-full"
                  onClick={() => {
                    setIsModalOpen(true);
                    setModalData(item);
                  }}
                  src={item?.image_url}
                ></img>
                {/* <div className="absolute bottom-0 rounded-b-lg h-1/6 w-full z-40 flex justify-between items-center opacity-80 bg-black">
                  <div className="mx-3 bg-white rounded-full h-4/6 bg-gradient-to-b from-rose-400 via-red-300 to-lime-200 ">
                  <img
                    src={
                      "https://api.multiavatar.com/" +
                      "grigarycantonyfghjdsfgkl" +
                      ".png"
                    }
                    className="rounded-full h-full w-full "
                    style={{ padding: 1 }}
                  />
                </div>
                  <div className="flex items-center mx-3">
                  <AiFillHeart
                    size={20}
                    color="#fff"
                    className="mx-1 rounded-full"
                  />
                  <div className="text-white">10K</div>
                </div>
                </div> */}
                {/* <div className="absolute top-0 right-0"></div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ContentSection;
