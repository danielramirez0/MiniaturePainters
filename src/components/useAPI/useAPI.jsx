import React from "react";
import { APIBaseURL } from "../../APIBaseURL-context";


const useAPI = () => {
    return React.useContext(APIBaseURL);
}

export default useAPI;