import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/rootReducer";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/UI/FlexBetween";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  // CSS
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1000px)");

  const removeOneItem = (i) => {
    const cartItem = {
      productId: i.productId,
      productName: i.productName,
      productColor: i.productColor,
      productPrice: i.productPrice,
      productQuantity: -1,
      totalPrice: i.productPrice * -1,
    };
    dispatch(setCart(cartItem));
  };

  const addOneItem = (i) => {
    const cartItem = {
      productId: i.productId,
      productName: i.productName,
      productColor: i.productColor,
      productPrice: i.productPrice,
      productQuantity: 1,
      totalPrice: i.productPrice * 1,
    };
    dispatch(setCart(cartItem));
  };

  const checkOut = async () => {
    try {
      console.log("Checking out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m={isDesktop ? "2rem auto" : "1rem auto"} maxWidth="1000px">
      <Box m="1rem auto">
        <Typography variant="h3" textAlign="center" padding="10px">
          Cart
        </Typography>
        <Divider />
      </Box>

      {cart.length == 0 ? (
        <Typography textAlign="center">Your cart is empty...</Typography>
      ) : (
        <Box m={isDesktop ? "1rem" : "0.8rem"}>
          {cart.map((i) => (
            <Box
              key={i.productId}
              m={isDesktop ? "1.5rem" : "2rem"}
              display={isDesktop ? "flex" : "block"}
              justifyContent={isDesktop ? "space-between" : "undefined"}
              alignItems={isDesktop ? "center" : "undefined"}
            >
              <Box
                flexBasis={isDesktop ? "55%" : undefined}
                m={isDesktop ? "1rem" : "1rem"}
              >
                <Typography
                  variant="h5"
                  onClick={() => navigate(`/product/${i.productId}`)}
                  sx={{
                    "&:hover": {
                      color: theme.palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {i.productName}
                </Typography>
                <Typography variant="h6" color={theme.palette.neutral.main}>
                  ${i.productPrice.toFixed(2)} / each
                </Typography>
              </Box>

              <Box
                flexBasis={isDesktop ? "40%" : undefined}
                m={isDesktop ? "1rem" : "1rem"}
              >
                <FlexBetween>
                  <FlexBetween>
                    <IconButton onClick={() => removeOneItem(i)}>
                      <RemoveCircleOutline />
                    </IconButton>
                    <Typography variant="h5">{i.productQuantity}</Typography>
                    <IconButton onClick={() => addOneItem(i)}>
                      <AddCircleOutline />
                    </IconButton>
                  </FlexBetween>

                  <Typography variant="h4">
                    ${i.totalPrice.toFixed(2)}
                  </Typography>
                </FlexBetween>
              </Box>
            </Box>
          ))}
          <Button
            fullWidth
            sx={{
              m: "2rem auto",
              p: "1rem",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              "&:hover": { color: theme.palette.primary.main },
            }}
            onClick={checkOut}
          >
            CHECKOUT
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default Cart;
