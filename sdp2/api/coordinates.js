import axiosRoot from 'axios';

const axios = axiosRoot.create({
    baseURL: "http://localhost:4000/api", })

export async function getCoordinates(id) {
  if(id && !isNaN(id)){
    return await axios.get(`/coordinates/${id}`)
  }
}