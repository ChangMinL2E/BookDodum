import React, { useState } from "react";
import image1 from "../../Assets/Images/oilpainting.png";
import image2 from "../../Assets/Images/oneline.png";
import image3 from "../../Assets/Images/windflower.png";

const Select: React.FC = () => {
  const [images, setImages] = useState<string[]>([image1, image2, image3]);
  const [selected, setSelected] = useState<string>(image1);
  const handleImageChange = (image: string) => {
    setSelected(image);
  };

  return (
    <>
      <div>
        {images?.map((image, index) => (
          <img
            src={image}
            key={index}
            alt={`painting/${index}`}
            width="40px"
            height="40px"
            onClick={() => handleImageChange(image)}
          />
        ))}
      </div>
      <div>
        <img
          src={selected}
          width="100px"
          height="100px"
        />
      </div>
      <div></div>
    </>
  );
};

export default Select;
