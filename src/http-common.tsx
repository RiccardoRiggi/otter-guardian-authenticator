
import axios from "axios";
export default axios.create({
    baseURL: "https://192.168.1.83/Github-Repository/php-rest-authenticator/rest",
    headers: {
        "Content-type": "application/json",
    }
});
