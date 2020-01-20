import axios from "axios";
import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';

class OrderDataService {

    getAllOrders() {
        return axios.get(BASE_URL + '/getAllOrders', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    addOrder(orderAndCustomer) {
        return axios.post(BASE_URL + "/orderpost", orderAndCustomer, {
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

    deleteOrder(order) {
        return axios.post(BASE_URL + "/deleteOrder", order, {
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
