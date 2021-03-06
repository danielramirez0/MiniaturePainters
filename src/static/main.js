import axios from "axios";

function errorHandler(error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log("Error", error.message);
    }
    console.log(error.config);
}

export async function protectedEnpointGetRequest(endpoint, token) {
    const result = await axios
        .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}

export async function protectedEnpointPostRequest(endpoint, body, token) {
    const result = await axios
        .post(endpoint, body, { headers: { Authorization: `Bearer ${token}`} })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}

export async function protectedEnpointDeleteRequest(endpoint, token) {
    const result = await axios
        .delete(endpoint, { headers: { Authorization: `Bearer ${token}`} })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}

export async function protectedEnpointPutRequest(endpoint, body, token) {
    const result = await axios
        .put(endpoint, body, { headers: { Authorization: `Bearer ${token}`} })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}

export async function defaultGetRequest(endpoint) {
    const result = await axios
        .get(endpoint)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}

export async function defaultPostRequest(endpoint, body) {
    const result = await axios
        .post(endpoint, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            errorHandler(error);
            return false;
        });
    return result;
}