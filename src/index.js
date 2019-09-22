const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const createBtn = document.querySelector(".add-toy-form input.submit")
const addToyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection")

let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(data) {
    data.forEach(function(toy) {
      toyCollection.insertAdjacentHTML("beforeend",
      `<div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar">
        <p><span>${toy.likes}</span> Likes</p>
        <button data-action="like" class="like-btn" data-id="${toy.id}">Like <3</button>
        <button data-action="delete" data-id="${toy.id}">Delete</button>
      </div>`)
    })
  })
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  addToyForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const name = e.target.name.value
    const image = e.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      toyCollection.insertAdjacentHTML("beforeend",
      `<div class="card">
        <h2>${data.name}</h2>
        <img src="${data.image}" class="toy-avatar">
        <p><span>${data.likes}</span> Likes</p>
        <button data-action="like" class="like-btn" data-id="${data.id}">Like <3</button>
        <button data-action="delete" data-id="${data.id}">Delete</button>
      </div>`)
    })
  })
  toyCollection.addEventListener("click", function(e) {
    if (e.target.dataset.action === "like") {
      const likes = e.target.closest('.card').querySelector('p span')
      const newLikes = parseInt(likes.innerText) + 1

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({likes: newLikes})
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        likes.innerText = newLikes
      })
    }
    else if (e.target.dataset.action === "delete") {
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE",
      })
      .then(function(data) {
        e.target.closest('.card').remove()
      })
    }
  })
})



// OR HERE!
