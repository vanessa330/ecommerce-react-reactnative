import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import ReactSwipe from "react-swipe";

const rootAPI = process.env.REACT_APP_API;

const ImagesWapper = ({ images, width = "100%", height }) => {
  let reactSwipeEl;

  return (
    <div style={{ position: "relative" }}>
      <ReactSwipe
        className="carousel"
        // swipeOptions={{ continuous: false }}
        ref={(el) => (reactSwipeEl = el)}
      >
        {images.map((i) => (
          <img
            key={i.id}
            src={`${rootAPI}image/get/${i.id}`}
            alt={i.name}
            style={{
              objectFit: "cover",
              borderRadius: "0.75rem",
            }}
            width={width}
            height={height}
            crossOrigin="anonymous"
          />
        ))}
      </ReactSwipe>

      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          color: "grey",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={() => reactSwipeEl.prev()}
      >
        <NavigateBefore />
      </button>
      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          color: "grey",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={() => reactSwipeEl.next()}
      >
        <NavigateNext />
      </button>
    </div>
  );
};

export default ImagesWapper;
