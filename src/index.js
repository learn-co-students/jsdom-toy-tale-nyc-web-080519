const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const collection = document.querySelector("#toy-collection")

// -------------------------------------------

function getToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
}

function appendToy(toyData) {
  collection.insertAdjacentHTML("beforeend", `
      <div class="card">
        <h2>${toyData.name}</h2>
        <img src=${toyData.image} class="toy-avatar" />
        <p>${toyData.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
    `) 
}

function newToy(toyData){
  // post the data to the url
  data = fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // (dont forget to specify the keys of the data when you're passing it)
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: "0"
    })
  })
  // convert from string to JSON
  .then(resp => resp.json())
  // use our other method that takes in the object we just created and displays it
  .then( jsonOBJ => appendToy(jsonOBJ))
}

// function addLike(){
//   data = fetch("http://localhost:3000/toys/:id",{
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: {
//       "likes": 0
//     }
// })

        // -------------------------------------------
        
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // IMPORTANT: when we are submitting, the target is the data that is being sent, not the button itself (like on line 30)
    toyForm.addEventListener('submit', e => {
      e.preventDefault();
      newToy(e.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// -------------------------------------------


getToys().then(toys => {
  toys.forEach(toy => {
    appendToy(toy)
  })
})