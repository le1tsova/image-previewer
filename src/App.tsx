import { ChangeEvent, useState, useRef } from "react";
import "./style.css";

function App() {
  const [imageLink, setImageLink] = useState<string | undefined>(undefined);
  const [imgSize, setImgSize] = useState([0, 0]);

  const imgElement = useRef<HTMLImageElement>(null);

  const handleChooseImg = (event: ChangeEvent<HTMLInputElement>): void => {
    setImageLink(undefined);

    if (event?.target?.files?.length) {
      let image = window.URL.createObjectURL(event?.target.files[0]);
      setImageLink(image);
    }
  };

  const handleOnLoadImg = () => {
    let imgHeight = imgElement?.current?.clientHeight || 0;
    let imgWidth = imgElement?.current?.clientWidth || 0;

    setImgSize([imgWidth, imgHeight]);
  };

  return (
    <div className="App">
      {imageLink && (
        <div className="App_image-preview">
          <img
            src={imageLink}
            alt="Preview"
            ref={imgElement}
            onLoad={handleOnLoadImg}
            id="pucture"
          />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleChooseImg} />
    </div>
  );
}

export default App;
