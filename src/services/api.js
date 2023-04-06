import axios from "axios";

//json-server --watch -d 180 --host 10.200.48.139 db.json

const api = axios.create({
    baseURL:'http://10.200.48.139:3000'

})
export default api