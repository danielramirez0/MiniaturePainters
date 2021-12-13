import { useState } from "react";
import { APIBaseURL } from "../../APIBaseURL-context";

const APIProvider = ({ children }) => {
  let [url, setBaseURL] = useState("http://localhost:8000/api/");

  // let signin = (newJWT, callback) => {
  //     setJWT(newJWT);
  //     callback();
  // };

  // let signout = (callback) => {
  //     setJWT(null);
  //     callback();
  // };

  // let value = { jwt, signin, signout };
  let value = { url };

  return <APIBaseURL.Provider value={value}>{children}</APIBaseURL.Provider>;
};

export default APIProvider;
