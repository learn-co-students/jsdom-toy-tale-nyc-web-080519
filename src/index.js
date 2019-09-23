document.addEventListener("DOMContentLoaded" , function () {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const toyFormInput = document.querySelectorAll(".input-text")
  const newLikeButtons5 = document.querySelectorAll(".like-btn")
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

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => renderGames(data))

  function renderGames(data) {
    data.forEach(function (toy) {
      toyCollection.insertAdjacentHTML('beforeend', `<div class="card">
        <h2> ${toy.name} </h2>
        <img src= ${toy.image} class="toy-avatar"/>
        <p data-id=${toy.id}> ${toy.likes} likes </p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`)
  })
  }

  toyForm.addEventListener("submit", function () {fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ 
      "name": `${toyFormInput[0].value}`, 
      "image": `${toyFormInput[1].value}`
    })
  })})

  
    toyCollection.addEventListener("click", function (event){
      if (event.target.className === "like-btn") {
       let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1
        
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newLikes
          })
      })
       
        event.target.previousElementSibling.innerText = newLikes + " likes"
      }
    })
  })
