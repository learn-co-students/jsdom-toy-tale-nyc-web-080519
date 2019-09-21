const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyContainer = document.getElementById("toy-collection")



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

//get toy card info
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toysObj => {
    // console.log(toysObj)
    toysObj.forEach(makeToy)
  }) 

//post fetch from form submit  
toyForm.addEventListener("submit", e =>{
  e.preventDefault()
  // console.dir(e.target.name)
  const name = e.target.name.value
  const image = e.target.image.value
  let fetchPostBody = {
    name: name,
    image: image,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    body: JSON.stringify(fetchPostBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(resp => resp.json())
  .then(makeToy);
  e.target.name.value = ""
  e.target.image.value = ""
})

//patch fetch from like button
toyContainer.addEventListener("click", e =>{
  // console.dir(e.target.dataset.id)
  let id = e.target.dataset.id;
  const likes = e.target.closest("div.card").querySelector("p#likes");
  let newLikes = parseInt(likes.innerText) + 1;
  let fetchPatchBody = {likes: newLikes}

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(fetchPatchBody),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(resp => resp.json())
  .then(data => {
    likes.innerText = `${data["likes"]} Likes`
  })
})



//HELPER FUNCTIONS
function makeToy(toyObj) {
  toyContainer.insertAdjacentHTML('beforeend', `
    <div class="card">
      <h2>${toyObj["name"]}</h2>
      <img src=${toyObj["image"]} class="toy-avatar">
      <p id="likes">${toyObj["likes"]} Likes</p>
      <button class="like-btn" data-id=${toyObj["id"]}>Like</button>
    </div>
  `)
}


//ideas for later: 
// add drop down to view only ony toy at a time
// sort toys by most likes
// unlike
// delete
