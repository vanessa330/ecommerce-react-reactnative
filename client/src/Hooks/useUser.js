import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useUser = () => {
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState([]);

  const rootAPI = process.env.REACT_APP_API;

  const fetchUser = async () => {
    const res = await axios.get(`${rootAPI}user/getLogginUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 200) setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return user;
};
