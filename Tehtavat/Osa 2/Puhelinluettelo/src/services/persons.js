import axios from "axios"
const baseURL = "http://localhost:3001/persons"

const getPersons = () => 
    axios.get(baseURL)
        .then(response => response.data)


const addPerson = newPerson =>
    axios.post(baseURL, newPerson)
         .then(response => response.data)


const deletePerson = id =>
    axios.delete(`http://localhost:3001/persons/${id}`)

const replaceNumber = person =>
    axios.put(`${baseURL}/${person.id}`, person)
         .then(response => response.data)

export default {addPerson, getPersons, deletePerson, replaceNumber}