const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const likeButton = document.querySelector("#toy-collection > div:nth-child(1) > button")
const card = document.querySelector("#toy-collection > div:nth-child(1)")
let addToy = false

// YOUR CODE HERE
fetch("http://localhost:3000/toys")    // we're fetching a list of toys from the given url
.then( resp => resp.json())            // we're parsing the response, which is the return value from our fetch
.then( data => {                      // now the response is parsed and ready to be appended to the DOM 
  data.forEach(function (toy) {    
  const str = `
                <div class="card">
                  <h2>${toy.name}</h2>
                    <img src="${toy.image}" class="toy-avatar" />
                    <p class="score">${toy.likes} </p>
                  <button class="like-btn" data-action="like" data-id="${toy.id}">Like <3</button>
                </div>`
  toyCollection.insertAdjacentHTML("afterbegin", str)
  })
})

toyCollection.addEventListener("click", function(event){
  if (event.target.dataset.action === "like") {  
    //let liker = document.querySelector("#toy-collection > div:nth-child(${toy.id}) > p") <<-- will only change first card
    let liker = event.target.closest("div.card").querySelector("p.score")//find the parent, then interpolate the 'score'
    let newLike = parseInt(liker.innerText) + 1

      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: 
          {
            "Content-Type": "application/json", 
            Accept: "application/json"
          },
        body: JSON.stringify({likes: newLike}) // what we want to update (an object with the key of "likes")
      })  // end of fetch (we're sending a "PATCH" request along with the headers and the body)
        .then(function(resp) {
          return resp.json()
        })  // returning the updated data and parsing it
        .then(function (data) {
          liker.innerText = newLike
        }) // updating the DOM (the amount of likes is updated)
  }    
})



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', function(event){
      event.preventDefault()
      const name = event.target.name.value
      const image = event.target.image.value //grab values

      const form= {
        name: name,
        image: image,
        likes: 0
      } //package into object

    fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },// headers
          body: JSON.stringify(form)
        })//end of fetch
      .then(resp => resp.json())
      .then(function(toy) { 
        const string = `
                <div class="card">
                  <h2>${toy.name}</h2>
                    <img src="${toy.image}" class="toy-avatar" />
                    <p>${toy.likes} </p>
                  <button class="like-btn" data-action="like" data-id="${toy.id}">Like <3</button>
                </div>`
        toyCollection.insertAdjacentHTML("afterbegin", string)
      })
    })//toyForm eventListener closing
  } else {
    toyForm.style.display = 'none'
  }
})