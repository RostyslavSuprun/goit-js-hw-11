const axios = require('axios').default;
import Notiflix from 'notiflix';
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
      console.log(query.value)
    const response = await axios.get(`https://pixabay.com/api/?key=31253077-0a51af2ed3c94e9419b38a769&q=${query.value}&image_type=photo&per_page=40&page=${pagecounter}`);
        // const data = await response.json();
      // console.log(response.data);
      const responseData = response.data.hits;
      const totalData = response.data.total;
      // console.log(totalData)
     
      if (totalData === 0) {
        Notiflix.Notify.failure('Please try again. There are 0 images matching your query 😵')
        return
      }
      Notiflix.Notify.success(`We found ${totalData} images 🤘`)
      const markup = responseData.map(({ webformatURL , comments, downloads, likes, views, tags}) => {
        return `<div class="placeholder"><img src=${webformatURL } alt="${tags}">
      <div class="infoBox">
      <div class="cardInfo"><p class="cardLabel">likes</p><p class="counter">${likes}</p></div>
      <div class="cardInfo"><p class="cardLabel">views</p><p class="counter">${views}</p></div>
      <div class="cardInfo"><p class="cardLabel">comments</p><p class="counter">${comments}</p></div>
      <div class="cardInfo"><p class="cardLabel">downloads</p><p class="counter">${downloads}</p></div>
      </div>
    </div>`
      }).join("")
        // return markup;
      // console.log(markup)
      gallery.innerHTML = markup;
      
     

    } catch (error) {
      Notiflix.Notify.failure('Oops, something went wrong 😢')
    console.log(error);
  }
}

 window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
   console.log(window.innerHeight) //visible part of screen
   console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight)
    if(window.scrollY + window.innerHeight >= 
      document.documentElement.scrollHeight) {
      pagecounter += 1;
      console.log('next page')
    loadImages();
    }
})

async function loadImages() {
  try {
    
    const response = await axios.get(`https://pixabay.com/api/?key=31253077-0a51af2ed3c94e9419b38a769&q=${query.value}&image_type=photo&per_page=40&page=${pagecounter}`);
    const responseData = response.data.hits;
    const markup = responseData.map(({ webformatURL, comments, downloads, likes, views, tags }) => {
      return `<div class="placeholder"><img src=${webformatURL} alt="${tags}">
      <div class="infoBox">
      <div class="cardInfo"><p class="cardLabel">likes</p><p class="counter">${likes}</p></div>
      <div class="cardInfo"><p class="cardLabel">views</p><p class="counter">${views}</p></div>
      <div class="cardInfo"><p class="cardLabel">comments</p><p class="counter">${comments}</p></div>
      <div class="cardInfo"><p class="cardLabel">downloads</p><p class="counter">${downloads}</p></div>
      </div>
    </div>`
    }).join("")
    // return markup;
    // console.log(markup)
    gallery.insertAdjacentHTML("beforeend", markup)
  }
  catch (error) {
    Notiflix.Notify.failure('Oops, something went wrong 😢')
    console.log(error);
  }
}