import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const getAll =()=>{
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}

const deletePerson=(id)=>{
const request = axios.delete(`${baseUrl}/${id}`)
return request.then(response=>response.data)
}

const addPerson =(phoneObject)=>{
    const request=axios.post(`${baseUrl}`,phoneObject)
    return request.then(response=>response.data)

}

const update =(phoneObject,id)=>{
    const request = axios.put(`${baseUrl}/${id}`,phoneObject)
    return request.then(response=>response.data)
}
export default {
    getAll:getAll,
    deletePerson:deletePerson,
    addPerson:addPerson,
    update:update
}