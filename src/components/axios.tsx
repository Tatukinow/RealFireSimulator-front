import axios from "axios";

const instance = axios.create({
    baseURL: "https://jcubv244bt.ap-northeast-1.awsapprunner.com",
});

export default instance;