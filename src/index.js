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
document.addEventListener("DOMContentLoaded", function(){
  addToys()
  postToy()
  increaseLikes()
})

const url = 'http://localhost:3000/toys'
const collection = document.querySelector("#toy-collection")

// this code is clunky... definitely can refactor
// dont forget that we are making a patch req to a certain ID!
function increaseLikes(){
  collection.addEventListener("click", function(event){
    // set the finaLikes to 0 so we can reassign the variable later
    let finalLikes = 0
    // set target id to 0 so we can reassign the variable later
    let targetId = 0
    const target = event.target
    // we find the closest div parent to the element and get the id from there
    // we then reassign targetId
    targetId = target.closest('div').dataset.id
    // if our target is the like btn then we will do the following
    if(target.className === "like-btn"){
      // find the closest div
      let parentDiv = target.closest('div')
      // find the p tag
      let likes = parentDiv.querySelector('p')
      // now we need to increase the likes by 1
      let increaseLikes = parseInt(likes.innerText)
      increaseLikes += 1
      // reassign finalLikes
      finalLikes = increaseLikes
      // change the HTML code
      likes.innerText = `${increaseLikes} likes`
      // let targetUrl = url + `/${targetId}`
      // now it is time for the patching!!
      // just finding some ways to make this DRY-er(?) not too sure
      fetch(url + `/${targetId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ likes: finalLikes })
      })
    }
  })
}



function postToy(){
  toyForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const toyName = event.target.name.value
    const toyImage = event.target.image.value
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ name: toyName, image: toyImage, likes: 0 })
    })
      .then(function (response) {
        return response.json()
      })
      .then(toyHTML)
  })
}



function toyHTML(toy){
  const divClass = document.createElement('div')
  divClass.className = "card"
  divClass.innerHTML = `<h2>${toy.name}</h2> <img src=${toy.image} class="toy-avatar"> <p>${toy.likes} likes</p> <button class="like-btn">Like <3</button>`
  // this step below is important for all the other steps
  // setting the data-id to the toy's ID 
  divClass.dataset['id'] = `${toy.id}`
  collection.append(divClass)
}


function addToys(){
  fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(function(toys){
    toys.forEach(toyHTML)
  })
}