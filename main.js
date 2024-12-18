import './style.css';
import fetchAnime from './api-call.js';

async function main() {
  try {
    const data = await fetchAnime();
    const animeArray = data.data;

    function display(animeArray) {
      // Sorting the animeArray in reverse alphabetical order to get the latest item
      let sortedAnime = animeArray.sort((a, b) => {
        let current = a.title;
        let latest = b.title;
        if (current < latest) {
          return 1;
        } else if (current > latest) {
          return -1;
        } else {
          return 0;
        }
      });
      console.log(sortedAnime);

      // Filtering the anime to show data from after 2022
      let filteredArray = sortedAnime.filter((anime) => {
        return anime.aired && anime.aired.from && anime.aired.from.slice(0, 4) >= "2022";
      });
      console.log(filteredArray);

      filteredArray = filteredArray.slice(1);

      // Appending the title and the image of the anime on the body of the browser
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

        infoContainer.append(newTitle, button);
        animeContainer.append(infoContainer);
        animeContainer.append(newTitle, newImg, button);
        document.body.append(animeContainer);
      });

      document.body.style.textAlign = "center";
    }

    display(animeArray);
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
}

// Call the async function
main();
