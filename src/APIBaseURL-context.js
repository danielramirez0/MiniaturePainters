import React from "react";

export const APIBaseURL = React.createContext({
    url: "http://localhost:8000/api/",
    setAPIBaseURL: () => {},
});