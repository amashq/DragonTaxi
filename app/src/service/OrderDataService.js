import axios from "axios";

const BASE_URL = 'http://localhost:8080';

class OrderDataService {

    async getAllOrders() {
        return await axios.get(BASE_URL + '/listOrders');
    };

    async addOrder(orderAndCustomer) {
        return await axios.post(BASE_URL + "/order", orderAndCustomer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    };

    getOrder(id) {
        return axios.get(BASE_URL + `/order/${id}`)
    };

     updateOrder(orderAndCustomer) {
        return axios.post(BASE_URL + "/updateOrder", orderAndCustomer, {
             headers: {
                 'Content-Type': 'application/json'
             }
         });
    };

    async deleteOrder(order) {

        return await axios.post(BASE_URL + "/deleteOrder", order, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    getDragons(classD) {
        return axios.get(BASE_URL + `/getNamesDragon/${classD}`)
    }
}


export default new OrderDataService()
