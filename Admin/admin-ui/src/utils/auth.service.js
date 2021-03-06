import axios from "axios";
import HostURL from "./host.service"
const API_URL = HostURL.getHostURL() + "auth/";

const register = (username, fullname, email, password) => {
    return axios.post(API_URL + "register", {
        username,
        fullname,
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));

                // set axios header
                const user = JSON.parse(localStorage.getItem('user'));
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
            }

            return response.data;
        });;
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));

                // set axios header
                const user = JSON.parse(localStorage.getItem('user'));
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
            }

            return response.data;
        });
};

const loginExternal = (ID, name, token) => {
    const data = {ID: Number(ID), name: name, token: token}
    console.log(JSON.stringify(data))
    localStorage.setItem("user", JSON.stringify(data));
    // set axios header
    const user = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
};

const logout = () => {
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "Bearer " + null;
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    loginExternal
}

export default AuthService;


