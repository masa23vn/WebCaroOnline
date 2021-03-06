import axios from "axios";
import HostURL from "./host.service"
const API_URL = HostURL.getHostURL();

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

const getUserInfo = () => {
    return axios.get(API_URL + "admin/");
};

const changeUserInfo = (newUsername, newFullname, newEmail) => {
    return axios.post(API_URL + "admin/updateInformation/", { newUsername, newFullname, newEmail });
};

const changePassword = (oldPass, newPass) => {
    return axios.post(API_URL + "admin/updatePassword/", { oldPass, newPass });
}

const getUsers = () => {
    return axios.get(API_URL + "admin/users");
}

const getSpecificUserBySearch = (search) => {
    return axios.post(API_URL + "admin/search", {search})
}

const getUserByUserId = (ID) => {
    return axios.get(API_URL + `admin/users/${ID}`);
}

const getMatchesByUserID = (ID) => {
    return axios.get(API_URL + `admin/users/${ID}/matches`);
}

const banAccount = (ID, isBan) => {
    return axios.post(API_URL + `admin/users/${ID}/ban`, {isBan});
}


const getFinishRoomList = (ID) => {
    console.log("ID user: " + ID);
    return axios.post(API_URL + "admin/finish/list", { ID: ID });
};

const getFinishRoom = (roomID) => {
    return axios.post(API_URL + `admin/finish/room`, { roomID });
};

const getMessage = (roomID) => {
    return axios.post(API_URL + `admin/finish/message`, { roomID });
};

const getUserByUsernameOrEmail = (target) => {
    return axios.post(API_URL + `admin/users/search`, { target })
}

const getAllFinishRoom = () => {
    return axios.get(API_URL + `admin/finish/rooms` )
}

// detail board
const DataService = {
    getUserInfo,
    changeUserInfo,
    changePassword,
    getUsers,
    getSpecificUserBySearch,
    getUserByUserId,
    getMatchesByUserID,
    banAccount,
    getFinishRoomList,
    getFinishRoom,
    getMessage,
    getUserByUsernameOrEmail,
    getAllFinishRoom
}

export default DataService;
