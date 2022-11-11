const axios = require('axios').default;
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css"
import SimpleLightbox from "simplelightbox"
const searchBtn = document.querySelector('.search')
const query = document.querySelector('input[name=searchQuery]')
const gallery = document.querySelector('.gallery')

let pagecounter = 1;
   
searchBtn.addEventListener("click", onSearch)
async function onSearch(event) {
  event.preventDefault();
  gallery.innerHTML = "";
  pagecounter = 1;
  
    try {
      
    const response = await axios.get(`https://pixabay.com/api/?key=31253077-0a51af2ed3c94e9419b38a769&q=${query.value}&image_type=photo&per_page=40&page=${pagecounter}`);
    
      const responseData = response.data.hits;
      const totalData = response.data.total;
      console.log(responseData)
     
      if (totalData === 0) {
        Notiflix.Notify.failure('Please try again. There are 0 images matching your query 😵')
        return
      }
      Notiflix.Notify.success(`We found ${totalData} images 🤘`)
      const markup = responseData.map(({ largeImageURL, webformatURL, comments, downloads, likes, views, tags}) => {
        return `<a class="placeholder" href="${largeImageURL}"><img src=${webformatURL } alt="${tags}">
      <div class="infoBox">
      <div class="cardInfo"><p class="cardLabel">likes</p><p class="counter">${likes}</p></div>
      <div class="cardInfo"><p class="cardLabel">views</p><p class="counter">${views}</p></div>
      <div class="cardInfo"><p class="cardLabel">comments</p><p class="counter">${comments}</p></div>
      <div class="cardInfo"><p class="cardLabel">downloads</p><p class="counter">${downloads}</p></div>
      </div>
    </a>`
      }).join("")
     
      gallery.innerHTML = markup;
      
         const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
           captionPosition: "bottom",
  sourceAttr: 'href',
});
     

    } catch (error) {
      Notiflix.Notify.failure('Oops, something went wrong 😢')
      console.log(error);

  }
  
}

window.addEventListener('scroll', () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  console.log('scrollHeight', scrollHeight)
  console.log('scrollTop', scrollTop)
  console.log('clientHeight', clientHeight)
    if(scrollTop === scrollHeight - clientHeight) {
      pagecounter += 1;
      console.log('next page')
    loadImages();
    }
})

async function loadImages() {
  try {
    
    const response = await axios.get(`https://pixabay.com/api/?key=31253077-0a51af2ed3c94e9419b38a769&q=${query.value}&image_type=photo&per_page=40&page=${pagecounter}`);
    const responseData = response.data.hits;
    const markup = responseData.map(({ largeImageURL, webformatURL, comments, downloads, likes, views, tags }) => {
      return `<a class="placeholder" href="${largeImageURL}"><img src=${webformatURL} alt="${tags}">
      <div class="infoBox">
      <div class="cardInfo"><p class="cardLabel">likes</p><p class="counter">${likes}</p></div>
      <div class="cardInfo"><p class="cardLabel">views</p><p class="counter">${views}</p></div>
      <div class="cardInfo"><p class="cardLabel">comments</p><p class="counter">${comments}</p></div>
      <div class="cardInfo"><p class="cardLabel">downloads</p><p class="counter">${downloads}</p></div>
      </div>
    </a>`
    }).join("")
    // return markup;
    // console.log(markup)
    gallery.insertAdjacentHTML("beforeend", markup)

       const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
         captionPosition: "bottom",
  sourceAttr: 'href',
       });
    
  }
  catch (error) {
    Notiflix.Notify.failure('Oops, something went wrong 😢')
    console.log(error);
  }
}
