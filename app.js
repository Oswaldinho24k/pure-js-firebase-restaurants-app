// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARxwUjIay1JoxBCOLKe09z6DwIsHz2Nk8",
    authDomain: "js-fixter-test.firebaseapp.com",
    databaseURL: "https://js-fixter-test.firebaseio.com",
    projectId: "js-fixter-test",
    storageBucket: "js-fixter-test.appspot.com",
    messagingSenderId: "128864101503",
    appId: "1:128864101503:web:3a51aee09889a805"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //DOM VAriables
  const restaurantsList = document.querySelector('.restaurants_list')
  const form = document.querySelector('form')
  const inputs = document.querySelectorAll('input')
  //Variables
    let newRestaurant = {}
  /*Logica de Firebase*/
  const db = firebase.firestore()
  const restaurantesRef = db.collection('restaurantes')

  const getRestaurantes =()=>{
      restaurantesRef.get()
      .then((snap)=>{
        snap.forEach((doc)=>{            
            console.log(doc.data())//each document
            //creamos la card y su contenido
            createCard(doc.data())
        })
      }).catch((error)=>{
        console.log(error)
      })
  }

  getRestaurantes()

    const saveRestaurante=(e)=>{
        e.preventDefault()
        restaurantesRef.add(newRestaurant)
        .then((res)=>{
            console.log(res)
            createCard(newRestaurant)
        }).catch((error)=>{
            console.log(error)
        })
    }

  /*Logica del DOM*/
  const createCard=(restaurante)=>{
    const card = document.createElement('div')
    const content = `
        <img src="${restaurante.imagenURL}"/>
        <div>
            <h3>${restaurante.nombre}</h3>
            <p>${restaurante.direccion}</p>
        </div>
    `
    card.innerHTML = content
    card.classList.add('card')
    //agregamos la card a la lista
    restaurantsList.appendChild(card)
  }

  const handleInput=(e)=>{
      const val = e.target.value
      const field = e.target.name
      newRestaurant = Object.assign({}, newRestaurant)
      newRestaurant[field] = val
      console.log(newRestaurant)
  }
//events
  inputs.forEach((input)=>{
    input.addEventListener('input', handleInput)
  })
  form.addEventListener('submit', saveRestaurante)

