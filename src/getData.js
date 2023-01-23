import axios from "axios";

export async function fetchData() {

    const response = await axios.get('http://localhost:16123/fetchsensors')
    return response.data
}
