import axios from "axios";

const instance = axios.create({
    baseURL: "https://d8vegaaivg.ap-northeast-1.awsapprunner.com",
});

export default instance;