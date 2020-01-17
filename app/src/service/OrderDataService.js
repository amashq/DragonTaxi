import axios from "axios";
import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

class OrderDataService {

    async getAllOrders() {
        return await axios.get(BASE_URL + '/listOrders', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    async addOrder(orderAndCustomer) {
        return await axios.post(BASE_URL + "/order", orderAndCustomer, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getOrder(id) {
        return axios.get(BASE_URL + `/order/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    };

     updateOrder(orderAndCustomer) {
        return axios.post(BASE_URL + "/updateOrder", orderAndCustomer, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    async deleteOrder(order) {

        return await axios.post(BASE_URL + "/deleteOrder", order, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getDragons(classD) {
        return axios.get(BASE_URL + `/getNamesDragon/${classD}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    }

    updateStatusOrder(order) {
        return axios.post(
            BASE_URL + "/updateStatus", order, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }
        )
    }
}


export default new OrderDataService()
