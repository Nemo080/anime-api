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
  console.log(sortedAnime.slice(1))
  

  // filtering the anime to show data from after 2022
  let filteredArray = sortedAnime.filter((anime) => {
    return anime.aired.from.slice(0, 4) >= "2022"
    
  })  
  console.log(filteredArray)

  filteredArray = filteredArray.slice(1);
  
  // appending the title and the image of the anime on the body of the browser with the use of map(). map() creates a new array with out altering the original array
  filteredArray.map((anime) => {
    const animeContainer = document.createElement("div");
    animeContainer.style.display = "flex"; 
    animeContainer.style.marginBottom = "50px";

    const newTitle = document.createElement("h2")
    newTitle.innerText = anime.title;
    newTitle.style.marginLeft = "30px"
    document.body.append(newTitle)

    const newImg = document.createElement("img")
    newImg.src=anime.images.jpg.image_url;
    newImg.style.width = "20%"
    newImg.style.margin = "auto";
    animeContainer.append(newImg);

    const description = document.createElement("p")
    description.innerText = anime.synopsis;
    description.style.width = "40%";
    description.style.margin = "auto";
    animeContainer.append(description);

    document.body.append(animeContainer);
  })

  document.body.style.textAlign = "center";
}

display(animeArray)
