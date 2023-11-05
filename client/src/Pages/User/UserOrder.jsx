import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import FlexBetween from "../../Components/UI/FlexBetween";

const rootAPI = process.env.REACT_APP_API;

const UserOrder = () => {
  const [purchase, setPurchase] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const userId = useSelector((state) => state.userId);

  // CSS
  const theme = useTheme();

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    if (orderId === selectedOrderId) {
      setSelectedOrderId(null);
    }
  };

  const formatCreatedDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const fetchPurchase = async () => {
    const res = await axios.get(`${rootAPI}purchase/getByUser/${userId}`);

    if (res.status === 200) setPurchase(res.data);
  };

  useEffect(() => {
    if (userId != null) {
      fetchPurchase();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h3" textAlign="center" padding="10px">
        My Order
      </Typography>
      <Divider />

      {!purchase ? (
        <Typography textAlign="center">Your order list is empty...</Typography>
      ) : (
        <Box>
          {purchase.map((order) => (
            <Box key={order.id} m="1rem">
              <FlexBetween>
                <Typography
                  variant="h4"
                  style={{
                    cursor: "pointer",
                    color:
                      selectedOrderId === order.id
                        ? theme.palette.primary.main
                        : undefined,
                  }}
                  sx={{ "&:hover": { color: theme.palette.primary.main } }}
                  onClick={() => handleOrderClick(order.id)}
                >
                  Order no: {order.id}
                </Typography>
                <Typography variant="h5">Status: {order.status}</Typography>
              </FlexBetween>

              {selectedOrderId === order.id && (
                <>
                  <Box m="0.5rem">
                    {order.items.map((item, index) => (
                      <FlexBetween key={item.id}>
                        <Typography variant="h6" style={{ width: "60%" }}>
                          {`${index + 1}. ${item.productName}`}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ width: "20%", textAlign: "center" }}
                        >
                          Qty: {item.quantity}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ width: "20%", textAlign: "center" }}
                        >
                          $ {item.productPrice}
                        </Typography>
                      </FlexBetween>
                    ))}
                  </Box>

                  <Box m="0.5rem">
                    <FlexBetween mt="0.5rem">
                      <Typography variant="h5">Subtotal:</Typography>
                      <Typography variant="h6">$ {order.subTotal}</Typography>
                    </FlexBetween>
                    <FlexBetween mt="0.5rem">
                      <Typography variant="h5">Shipping Cost:</Typography>
                      <Typography variant="h6">
                        $ {order.shippingCost}
                      </Typography>
                    </FlexBetween>
                    <FlexBetween mt="0.5rem">
                      <Typography variant="h5">Total Price:</Typography>
                      <Typography variant="h6">$ {order.totalPrice}</Typography>
                    </FlexBetween>
                    <FlexBetween mt="0.5rem">
                      <Typography variant="h5">Created Date:</Typography>
                      <Typography variant="h6">
                        {formatCreatedDate(order.createdDate)}
                      </Typography>
                    </FlexBetween>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default UserOrder;
