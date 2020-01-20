import axios from "axios";
import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

class DriverDataService{

    getDriver() {
        return axios.get(BASE_URL + '/listOrders', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getFreeDriver() {
        return axios.get(BASE_URL + '/getFreeDriver', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

    getMyOrders(usernameDriver) {
        return axios.get(BASE_URL + `/listDriversOrders/${usernameDriver}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };
}

export default new DriverDataService();