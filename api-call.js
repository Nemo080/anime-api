import axios from "axios"

export default async function fetchAnime () {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=spyfamily&sfw`)
        console.log(response)
        if (response.status !== 200) {
            throw new Error ("There is an Error!")
        }
        return response.data
    }
    catch (error){
        console.error("Error: " + error)
    }
    
}