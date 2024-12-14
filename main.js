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
  let filteredArray = sortedAnime.filter((anime) => {
    return anime.aired && anime.aired.from && anime.aired.from.slice(0, 4) >= "2022"
    
  })  
  console.log(filteredArray)

  filteredArray = filteredArray.slice(1);
  
  // appending the title and the image of the anime on the body of the browser with the use of map(). map() creates a new array with out altering the original array
  filteredArray.map((anime) => {

    const animeContainer = document.createElement('div');
    animeContainer.className = 'anime-container';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    const newImg = document.createElement('img');
    newImg.src = anime.images.jpg.image_url;
    newImg.className = 'anime-image';

    const newTitle = document.createElement('h2');
    newTitle.innerText = anime.title;
    newTitle.className = 'anime-title';

    const button = document.createElement('button');
    button.innerText = 'Show Description';
    button.className = 'anime-button';

    // Add a click event to the button to toggle the description
    button.addEventListener('click', () => {
      if (!animeContainer.querySelector('.description')) {
        const description = document.createElement('p');
        description.innerText = anime.synopsis;
        description.className = 'description'; // Class for easy reference
        animeContainer.appendChild(description);
        button.innerText = 'Hide Description';
      } else {
        const description = animeContainer.querySelector('.description');
        description.remove(); // Remove the description from the DOM
        button.innerText = 'Show Description';
      }

    });
    
    // imgContainer.appendChild(newImg);
    infoContainer.append(newTitle, button);
    animeContainer.append(infoContainer);
    document.body.append(animeContainer);

    animeContainer.append(newTitle, newImg, button);
    document.body.append(animeContainer);
  });

  document.body.style.textAlign = "center";
}

display(animeArray)
