const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toy_collection = document.querySelector("#toy-collection")
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch("http://localhost:3000/toys")
.then(function (response) {
  return response.json()
})
.then(renderToy)

function renderToy(data) {
  data.forEach(renderOneToy)
}

function renderOneToy(toy) {
  const str = `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p><span class="like-display">${toy.likes}</span> Likes</p>
      <button data-action="like" data-id="${toy.id}" class="like-btn">Like</button>
    </div>`
  toy_collection.insertAdjacentHTML("beforeend", str)
}

toyForm.addEventListener("submit", function(event) {
  event.preventDefault()
  
  const name = event.target.name.value
  const image = event.target.image.value
  
  const body = {
    name: name, 
    image: image,
    likes: 0
  }
  
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify(body) 
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    renderOneToy(data)
  })
  
  document.querySelectorAll(".input-text").forEach(function(textbox){
    textbox.value = ''
  })
})

toy_collection.addEventListener("click", function(event) {
  if(event.target.dataset.action === "like") {
    const span = event.target.closest("div.card").querySelector("span.like-display")
    const newLikes = parseInt(span.innerText) + 1

    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({likes: newLikes})
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      span.innerText = newLikes
    })
  }
})


