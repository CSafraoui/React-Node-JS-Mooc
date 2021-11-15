import axios from 'axios' 
const Url = 'http://localhost:3001/persons'

const create = (newPerson) => {
    return axios.post(Url, newPerson)
}

const getAll = () =>{
    return axios.get(Url)
}

const drop = (id) =>{
    return axios.delete(`${Url}/${id}`)
}

const update = (id, newPerson) => {
    return axios.put(`${Url}/${id}`, newPerson)
  }

export default{
    getAll: getAll,
    create:  create,
    drop: drop,
    update: update
}
