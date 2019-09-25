document.addEventListener("DOMContentLoaded", () => {

  const collection = document.querySelector("#toy-collection")
  const newButton = document.querySelector("#new-toy-btn")
  const form = document.querySelector(".add-toy-form")
  const container = document.querySelector(".container")
  let addToy = false
  let data = []
  
  start()

  function start() {
    getToys().then(toys => {
      data = toys
      data.forEach(toy => {
        renderOneToy(toy)
      })
    })
  }

  function getToys() {
    return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
  }

  function renderOneToy(toyOBJ) {
    collection.insertAdjacentHTML("beforeend", `
      <div class="card" id="${toyOBJ.id}">
        <h2>${toyOBJ.name}</h2>
        <img src="${toyOBJ.image}" class="toy-avatar"/>
        <p>${toyOBJ.likes}</p>
        <button class="like-btn" id="${toyOBJ.id}">  Like <3  </button>
      </div>
    `)
  }


  function newToy(toyOBJ) {
    debugger
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: toyOBJ.name,
        image: toyOBJ.image,
        likes: "0"
      })
    })
  }

  function renderLike(obj) {
    obj.likes = obj.likes + 1
    renderOneToy(obj)
  }

  newButton.addEventListener("click", e => {
    addToy = !addToy
    if (addToy) {
      container.style.display = "block"
    } else {
      container.style.display = "none"
    }
  })

  form.addEventListener("submit", e => {
    e.preventDefault();
    name = container.querySelector("#formName").value;
    url = container.querySelector("#formIMG").value;
    newToy({ name: name, image: url })
  })


  // I decided to create an event listener that also does the fetch, because it can
  // use e.target.previousElementSibling to grab the likes <p> and update it with the newLike

  // normally, i would break this out into a method of its own

  document.addEventListener("click", e => {
    if (e.target.className === "like-btn") {
      const newLike = parseInt(e.target.previousElementSibling.innerText) + 1
      debugger
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLike
        })
      }).then(e.target.previousElementSibling.innerText = newLike)
    }
  })

})