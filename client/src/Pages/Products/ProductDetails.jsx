import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/rootReducer";
import { useProducts } from "../../Hooks/useProducts";
import Wrapper from "../../Components/UI/Wapper";
import ImagesWapper from "../../Components/UI/ImagesWapper";
import FlexBetween from "../../Components/UI/FlexBetween";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  MenuItem,
  Select,
} from "@mui/material";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import axios from "axios";
import { useUser } from "../../Hooks/useUser";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const products = useProducts();

  const token = useSelector((state) => state.token);
  const user = useUser();
  const wishlistString = user?.wishlist?.split(", ");
  const wishlistIds = wishlistString?.map((id) => parseInt(id.trim(), 10));

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const maxQuantity = 5;

  const rootAPI = process.env.REACT_APP_API;

  // CSS
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1000px)");
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = async () => {
    try {
      let wishlistBody = wishlistIds;

      const index = wishlistBody.indexOf(parseInt(id));
      if (index !== -1) {
        wishlistBody.splice(index, 1);
      } else {
        wishlistBody.push(id);
      }

      const body = { wishlist: wishlistBody.join(", ") };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.patch(
        `${rootAPI}user/updateWishlist`,
        body,
        config
      );

      if (res.status === 200) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const cartItem = {
        productId: product.id,
        productName: product.name,
        productColor: selectedColor,
        productPrice: product.price,
        productQuantity: selectedQuantity,
        totalPrice: product.price * selectedQuantity,
      };

      dispatch(setCart(cartItem));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    const foundProduct = products.find((p) => p.id == id);
    setProduct(foundProduct);

    if (wishlistIds?.includes(parseInt(id))) setIsLiked(true);
    console.log(selectedColor);
  }, [products, id, wishlistIds]);

  if (!product) {
    return null;
  } else {
    const {
      name,
      price,
      quantity,
      color,
      images,
      material,
      weight,
      dimensions,
    } = product;
    const colorArray = color.split(", ");
    return (
      <Box m="1rem auto" maxWidth="1000px">
        <Box
          display={isDesktop ? "flex" : "block"}
          justifyContent="center"
          alignContent="center"
        >
          <Wrapper
            width={isDesktop ? "400px" : "90%"}
            m={isDesktop ? "2rem 1.5rem" : "5%"}
          >
            <Typography
              variant="h3"
              color={theme.palette.neutral.dark}
              fontWeight="500"
              padding="1rem"
            >
              {name}
            </Typography>

            <ImagesWapper images={images} width="100%" height="300px" />

            <IconButton onClick={handleWishlist}>
              {isLiked ? (
                <>
                  <FavoriteOutlined
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: "20px",
                      margin: "10px",
                    }}
                  />
                  <Typography>IN WISHLIST</Typography>
                </>
              ) : (
                <>
                  <FavoriteBorderOutlined
                    style={{
                      color: theme.palette.primary.main,
                      fontSize: "20px",
                      margin: "10px",
                    }}
                  />
                  <Typography>ADD TO WISHLIST</Typography>
                </>
              )}
            </IconButton>
          </Wrapper>

          <Wrapper
            width={isDesktop ? "500px" : "90%"}
            m={isDesktop ? "2rem 1.5rem" : "5%"}
          >
            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Price :
              </Typography>
              <Typography variant="h3" color={theme.palette.neutral.dark}>
                $ {price.toFixed(2)}
              </Typography>
            </FlexBetween>

            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Material :
              </Typography>
              <Typography variant="h5" color={theme.palette.neutral.dark}>
                {material}
              </Typography>
            </FlexBetween>

            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Weight :
              </Typography>
              <Typography variant="h5" color={theme.palette.neutral.dark}>
                {weight}
              </Typography>
            </FlexBetween>

            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Dimensions :
              </Typography>
              <Typography variant="h5" color={theme.palette.neutral.dark}>
                {dimensions}
              </Typography>
            </FlexBetween>

            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Color :
              </Typography>
              <Typography>
                {colorArray.map((c, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      backgroundColor: c,
                      margin: "0.5rem",
                      width: "20px",
                      height: "20px",
                      border:
                        selectedColor === c
                          ? "3px solid lightblue"
                          : "1px solid grey",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </Typography>
            </FlexBetween>

            <FlexBetween m="1.5rem 0">
              <Typography
                variant="h4"
                color={theme.palette.neutral.dark}
                fontWeight="500"
              >
                Quantity :
              </Typography>
              <FlexBetween>
                {quantity > 0 ? (
                  <Select
                    labelId="quantity-select-label"
                    id="quantity-select"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(parseInt(e.target.value))
                    }
                    displayEmpty
                    sx={{
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      margin: "0.5rem",
                      bgcolor: "background.paper",
                      "&:focus": {
                        bgcolor: "background.paper",
                      },
                    }}
                  >
                    {Array.from(
                      { length: Math.min(quantity, maxQuantity) },
                      (_, index) => index + 1
                    ).map((num) => (
                      <MenuItem key={num} value={num} onClick={() => {}}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Typography variant="h5" color="red">
                    Out Of Stock
                  </Typography>
                )}
              </FlexBetween>
            </FlexBetween>

            {quantity > 0 && (
              <Button
                fullWidth
                sx={{
                  m: "2rem auto",
                  p: "1rem",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  "&:hover": { color: theme.palette.primary.main },
                }}
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
            )}
          </Wrapper>
        </Box>
      </Box>
    );
  }
};

export default ProductDetails;
