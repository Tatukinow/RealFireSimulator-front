import axios from "axios";

const instance = axios.create({
    baseURL: "https://bbaidm2zkz.ap-northeast-1.awsapprunner.com",
});

export default instance;