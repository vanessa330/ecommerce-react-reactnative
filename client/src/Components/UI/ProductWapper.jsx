import { useNavigate } from "react-router-dom";
import Wrapper from "./Wapper";
import FlexBetween from "./FlexBetween";
import { Typography, useTheme } from "@mui/material";
import ImagesWapper from "./ImagesWapper";

const ProductWapper = ({ id, name, price, quantity, color, images }) => {
  const navigate = useNavigate();
  const colorArray = color.split(", ");

  const theme = useTheme();

  return (
    <Wrapper>
      <Typography
        variant="h3"
        color={theme.palette.neutral.dark}
        p="0.5rem"
        fontWeight="500"
        onClick={() => navigate(`/product/${id}`)}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          "&:hover": {
            color: theme.palette.primary.light,
            cursor: "pointer",
          },
        }}
      >
        {name}
      </Typography>

      <ImagesWapper images={images} width="100%" height="280px" />

      <FlexBetween>
        <Typography variant="h4" color={theme.palette.neutral.main} p="0.5rem">
          $ {price.toFixed(2)}
        </Typography>
      </FlexBetween>

      <FlexBetween>
        <Typography>
          {colorArray.map((c, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                backgroundColor: c,
                width: "10px",
                height: "10px",
                margin: "0.5rem",
                border: "1px solid grey",
              }}
            />
          ))}
        </Typography>

        {quantity > 0 ? (
          <Typography variant="h5" color="green">
            In Stock
          </Typography>
        ) : (
          <Typography variant="h5" color="red">
            Out Of Stock
          </Typography>
        )}
      </FlexBetween>
    </Wrapper>
  );
};

export default ProductWapper;
