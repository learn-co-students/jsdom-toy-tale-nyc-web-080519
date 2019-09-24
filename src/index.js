document.addEventListener('DOMContentLoaded', (pageLoadEvent) => {
  
  let allData
  
  const addBtn = document.querySelector('#new-toy-btn')
  const submitBtn = document.querySelector('.submit[name=submit]')
  const likeBtn = document.querySelector('.like-btn')
  const toyForm = document.querySelector('.container')
  const toyCollectionDiv = document.querySelector('#toy-collection')
  let addToy = false
  
  function renderSingleToy(toy) {
    addToy = !addToy
    toyForm.style.display = 'none'
    toyCollectionDiv.insertAdjacentHTML("beforeend",`
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span data-toyid=${toy.id}>${toy.likes}</span> Likes </p>
      <button class="like-btn" data-toyid=${toy.id}>Like <3</button>
      </div>
      `)  // Ends insert Adjacent HTML
  }

  function renderAllData(arr) {
    toyCollectionDiv.innerHTML=""
    arr.forEach( function(toy) { 
      renderSingleToy(toy)
    })  // Ends forEach loop in renderData function
  }   // Ends renderData() Function
  
  // YOUR CODE HERE
  
  document.addEventListener('click', function(event) {
    switch (true) {
      case(event.target === addBtn):
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
      } else {
        toyForm.style.display = 'none'
      }
      break
      case(event.target === submitBtn):
        event.preventDefault()
        let nameFieldValue = document.querySelector('.input-text[name=name]').value
        let imageFieldValue = document.querySelector('.input-text[name=image]').value
        let data = {name: `${nameFieldValue}`, image: `${imageFieldValue}`, likes: 0}// ends data variable
        document.querySelector('.input-text[name=name]').value = ""
        document.querySelector('.input-text[name=image]').value = ""
        fetch("http://localhost:3000/toys", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(data)
          })//Ends FETCH POST
          .then( function(response) {
            return response.json()
          }) //ends first THEN statement
          .then ( function (response) {
            if (!response.errors) {
              allData.push(response)
              renderSingleToy(response)
            } else {
              return response.errors
            }
          }) // ends Second THEN statement
          .catch( function(err) {
            alert(err)
          }) // ends Catch
        break

      case(event.target.className === "like-btn"):
      event.preventDefault()
      let toyId = event.target.dataset.toyid
      let startingLikes = document.querySelector(`span[data-toyid='${toyId}']`).innerText
      let likeData = {likes: `${++startingLikes}`}// ends data variable

        fetch(`http://localhost:3000/toys/${toyId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "PATCH",
              body: JSON.stringify(likeData)
          })//Ends FETCH POST
          .then( function(response) {
            return response.json()
          }) //ends first THEN statement
          .then ( function (response) {
            if (!response.errors) {
              document.querySelector(`span[data-toyid='${toyId}']`).innerText++
            } else {
              return response.errors
            }
          }) // ends Second THEN statement
          .catch( function(err) {
            alert(err)
          }) // ends Catch

     } //Ends SWITCH statement
  }) // Ends Event Listener
  
  
  fetch("http://localhost:3000/toys")
  .then( function(response) { 
    return response.json()
  })// Ends the first THEN statement from original FETCH Statement
  .then( function(response) { 
    console.dir(response)
    allData = response
    renderAllData(response)
  })// Ends the second THEN statement from original FETCH Statement
  
});  //  ends the DOM Content Loaded efvent