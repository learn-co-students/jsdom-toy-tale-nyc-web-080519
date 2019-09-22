const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const createToyButton = document.querySelector("body > div.container > form > input.submit")
const createNameField = document.querySelector("body > div.container > form > input:nth-child(2)")
const createImageField = document.querySelector("body > div.container > form > input:nth-child(4)")
const likeButtons = document.querySelectorAll(".like-btn")
let addToy = false

document.addEventListener('DOMContentLoaded', (event) => {

  fetch("http://localhost:3000/toys")
  .then(result => result.json())
  .then(json => printToys(json))


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', function(e) {
    if(e.target.className === "like-btn") {

      const obj = {
        "likes" : parseInt(e.target.parentElement.querySelector("span").innerText) + 1
      }
  
      fetch(`http://localhost:3000/toys/${e.target.dataset.toy_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(response => response.json())
      .then(function(json) {
        e.target.parentElement.querySelector("span").innerText = parseInt(e.target.parentElement.querySelector(".likes-text").innerText) + 1
      })
    }
  })



  createToyButton.addEventListener('click', function(e) {
    const obj = {
      "name" : createNameField.value,
      "image" : createImageField.value,
      "likes" : 0
    }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
  }).then(response => response.json())
  .then(json => printToys(json))

  function printToys(toys) {
    for (let i = 0; i < toys.length; i++) {
      toyCollection.insertAdjacentHTML("beforeend",
        `<div class="card">
          <h2>${toys[i].name}</h2>
          <img class="toy-avatar" src=${toys[i].image}>
          <p><span class="likes-text">${toys[i].likes}</span> Likes</p>
          <button class="like-btn" data-toy_id="${toys[i].id}">Like <3</button>
        </div>`
      )
    }
  }

});