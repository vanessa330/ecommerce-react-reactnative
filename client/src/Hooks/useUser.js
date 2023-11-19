import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/rootReducer";

const rootAPI = process.env.REACT_APP_API;

export const useUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.userDetails);

  const fetchUser = async () => {
    const res = await axios.get(`${rootAPI}user/getLogginUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      dispatch(setUserDetails(res.data));
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return user;
};
