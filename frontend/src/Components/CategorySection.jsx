import React, { useState } from "react";

function CategorySection() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="flex justify-center pt-5">
      {["Recent", "Trending"]?.map((item, key) => {
        return (
          <div
            key={key}
            style={{
              textDecoration: selectedButton === item ? "underline" : "none",
            }}
            onClick={() => {
              handleButtonClick(item);
            }}
            className="mx-2 p-2 text-white underline-offset-8 cursor-pointer"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default CategorySection;
