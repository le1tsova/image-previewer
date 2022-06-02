import { ChangeEvent, useState, useRef, useEffect, useCallback } from "react";
import "./style.css";
import { v4 as uuidv4 } from "uuid";

import Marker from "./Marker";

type MarkerPercents = {
  percentX: number;
  percentY: number;
  text: string;
  id: string;
};

let resizeTimeout: NodeJS.Timeout | null;

function App() {
  const [imageLink, setImageLink] = useState<string | undefined>(undefined);
  const [imgSize, setImgSize] = useState([0, 0]);
  const [markers, setMarkers] = useState<MarkerPercents[]>([]);

  const imgElement = useRef<HTMLImageElement>(null);

  const handleChooseImg = (event: ChangeEvent<HTMLInputElement>): void => {
    setImageLink(undefined);
    setMarkers([]);

    if (event?.target?.files?.length) {
      let image = window.URL.createObjectURL(event?.target.files[0]);
      setImageLink(image);
    }
  };

  const updateImageSizes = useCallback(() => {
    let imgHeight = imgElement?.current?.clientHeight || 0;
    let imgWidth = imgElement?.current?.clientWidth || 0;

    setImgSize([imgWidth, imgHeight]);
  }, [setImgSize]);

  const handleAddMarker = (event: React.MouseEvent<HTMLElement>): void => {
    let markerText = prompt("Please, enter text for label:");

    if (markerText && /[\w?!.+-]/i.test(markerText)) {
      let percentX = Math.floor((event?.pageX / imgSize[0]) * 100);
      let percentY = Math.floor((event?.pageY / imgSize[1]) * 100);

      const m = {
        percentX: percentX,
        percentY: percentY,
        text: markerText,
        id: uuidv4(),
      };
      setMarkers([...markers, m]);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeThrottler);

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          updateImageSizes();
        }, 66);
      }
    }

    return () => {
      window.removeEventListener("resize", resizeThrottler);
    };
  }, [updateImageSizes]);

  let coordsMarkers = markers.map(({ percentX, percentY, text, id }) => {
    return {
      coordX: Math.floor((imgSize[0] / 100) * percentX),
      coordY: Math.floor((imgSize[1] / 100) * percentY),
      text,
      id,
    };
  });

  return (
    <div className="App">
      {imageLink && (
        <div className="App_image-preview">
          <img
            src={imageLink}
            alt="Preview"
            ref={imgElement}
            onLoad={updateImageSizes}
            onClick={handleAddMarker}
          />
          {coordsMarkers.map(({ coordX, coordY, text, id }) => (
            <Marker coordX={coordX} coordY={coordY} text={text} key={id} />
          ))}
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleChooseImg} />
    </div>
  );
}

export default App;
