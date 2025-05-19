import axiosRoot from 'axios';

const axios = axiosRoot.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, })

export async function getCoordinates(id) {
  if(id && !isNaN(id)){
    return await axios.get(`/coordinates/${id}`)
  }
}