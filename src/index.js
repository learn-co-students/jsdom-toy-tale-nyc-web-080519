const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(renderToys)

function renderToys(data){
  data.forEach(renderOneToy)
}

function renderOneToy(toy) {
  const str = `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p><span class="like-display">${toy.likes}</span>likes</p>
      <button data-action="like" data-id="${toy.id}" class="like-btn">Like</button>
      <button data-action="delete" data-id="${toy.id}" class="delete-btn">Delete</button>
      </div>
    `

  toyList.insertAdjacentHTML("beforeend", str)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }

})


// submitting a new toy

toyForm.addEventListener('submit', (e) =>{
  
  e.preventDefault()
  
  const name = e.target.name.value
  const image = e.target.image.value
  const body = {
    name: name,
    image: image,
    likes: 0 
  }
  
  fetch(`http://localhost:3000/toys`,{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then((resp) => resp.json())
    .then(data => {
      if(data.errors){
        alert(data.errors)
      } else {
        renderOneToy(data)
      }
  })
  
}) //end of submitting event listener

//edit a toy else delete it depending on the button clicked
toyList.addEventListener('click', e => {
  if(e.target.dataset.action === "like"){
    const span = event.target.closest("div.card").querySelector("span.like-display")
    console.log(span.innerText)
    const newLikes = parseInt(span.innerText) + 1
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({likes: newLikes})
    })
    .then(resp => resp.json())
    .then(data => span.innerText = newLikes )

  //delete a toy 
  } else if(e.target.dataset.action === "delete"){
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => {
      alert("Deleted!")
      e.target.closest("div.card").remove()
    })
  }
})
  
