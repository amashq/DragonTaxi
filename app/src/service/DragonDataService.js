import axios from "axios";
import {ACCESS_TOKEN} from "../constants/constants";

const BASE_URL = 'http://localhost:8080';

class DragonDataService {

    getCountDragons() {
        return axios.get(BASE_URL + '/listDragons', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getNamesDragons(classDragon) {
        return axios.get(BASE_URL + `/listDragons/${classDragon}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    getDragon(id) {
        return axios.get(BASE_URL + `/dragon/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
    };

    deleteDragon(dragon) {

        return axios.post(BASE_URL + "/deleteDragon", dragon, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    updateDragon(dragon) {
        return axios.post(BASE_URL + "/updateDragon", dragon, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

    addDragon(dragon) {
        return axios.post(BASE_URL + "/addDragon", dragon, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    };

}

export default new DragonDataService()