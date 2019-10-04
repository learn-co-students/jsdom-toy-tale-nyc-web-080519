const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let likeCount;
let foundToy;

const createToy = document.querySelector('input.submit')



const toyContainer = document.querySelector('div#toy-collection')


renderToys();





document.addEventListener('click', function(e){
  if(e.target === createToy){
    e.preventDefault()
    let body = {
      "name": newToyName.value,
      "image": newToyPic.value,
      "likes": 0
    }
    debugger
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: 
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
      body: JSON.stringify(body)
    })
    .then(function(response){
      let toy = response.json()
      return toy
    })
    .then(function(toy){toyContainer.insertAdjacentHTML('beforeend', `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span data-id=${toy.id}>${toy.likes}</span> likes</p>
    <button class="like-btn" data-action='like' data-id=${toy.id}>Like <3</button>
  </div>`)
    })
  }
  else if(e.target.dataset.action === 'like'){
    likeCount = document.querySelector(`span[data-id="${e.target.dataset.id}"]`)
    likeCount.innerText = parseInt(likeCount.innerText) + 1
    debugger
    let number = parseInt(likeCount.innerText)
    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
      body: JSON.stringify({
        "likes": number
      })
    })
    .then(function(response){
      console.log(response)
    })

    
  }     
})
  
  
  




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


function renderToys(){ 
  fetch('http://localhost:3000/toys')
  .then(function(response){
    let toys = response.json()

    return toys
  })
  .then(function(toys){
    toys.forEach(function(toy){
      toyContainer.insertAdjacentHTML('beforeend', `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span data-id=${toy.id}>${toy.likes}</span> likes</p>
      <button class="like-btn" data-action='like'  data-id=${toy.id}>Like <3 </button>
    </div>`)
    })
  })
}

