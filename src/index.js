const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

// Show toys from database
const toyCollection = document.querySelector("#toy-collection")

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    data.forEach(function(toy) {
      toyCollection.insertAdjacentHTML("beforeend", 
      `
        <div class="card">
          <h2>${toy["name"]}</h2>
          <img src="${toy["image"]}" class="toy-avatar" />
          <p>${toy["likes"]}</p>
          <button data-button="like" data-id="${toy["id"]}" class="like-btn">Like <3</button>
        </div>
      `)
    })
  })

// Add new toy && make like-button work
const submitButton = toyForm.querySelector(".submit")
const formInputs = toyForm.querySelectorAll(".input-text")

document.addEventListener("click", function(event) {
  // Add new toy
  if(event.target == submitButton){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body:
        JSON.stringify({
          "name": formInputs[0].value,
          "image": formInputs[1].value,
          "likes": 0
        })
    })
  }

  // Make like-button work
  if(event.target.dataset.button == "like"){
    const newLike = parseInt(event.target.previousElementSibling.innerText) + 1
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
      method: "PATCH",
      headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      body:
        JSON.stringify({
          "likes": newLike
        })
    }).then(event.target.previousElementSibling.innerText = newLike)
  }
})

