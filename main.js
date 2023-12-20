import './style.css'
import  fetchAnime  from './api-call.js'

const data = await fetchAnime()
const animeArray = data.data

function display(animeArray){

  // sorting the animeArray in reverse alphabetical order to get the latest item
  let sortedAnime = animeArray.sort((a, b) => {
    let current = a.title;
    let latest = b.title;
    if (current < latest){
      return 1;
    }
    else if (current > latest) {
      return - 1;
    }
    else {
      return 0;
    }
  })
  console.log(sortedAnime)

  // filtering the anime to show data from after 2022
  let filteredArray = animeArray.filter((anime) => {
    return anime.aired.from.slice(0, 4) >= "2022"
    
  })  
  console.log(filteredArray)
  
  // appending the title and the image of the anime on the body of the browser with the use of map(). map() creates a new array with out altering the original array
  animeArray.map((anime) => {
    const newTitle = document.createElement("p")
    newTitle.innerText = anime.title;
    document.body.append(newTitle)
    const newImg = document.createElement("img")
    newImg.src=anime.images.jpg.image_url;
    document.body.append(newImg)
  })

  
}

display(animeArray)
