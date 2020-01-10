import axios from "axios";

const BASE_URL = 'http://localhost:8080';

class DragonDataService {

    getCountDragons() {
        return axios.get(BASE_URL + '/listDragons');
    };

    getNamesDragons(classDragon) {
        return axios.get(BASE_URL + `/listDragons/${classDragon}`);
    };

    getDragon(id) {
        return axios.get(BASE_URL + `/dragon/${id}`)
    };

    deleteDragon(dragon) {

        return axios.post(BASE_URL + "/deleteDragon", dragon, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    // async addOrder(orderAndCustomer) {
    //     return await axios.post(BASE_URL + "/order", orderAndCustomer, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // };

}

export default new DragonDataService()