// Initialize and add the map
let map;
let service;
let form = document.getElementById('rest')
let zipCode = document.getElementById('zipcode')
let specs = document.getElementById('spec')
let submitBtn = document.getElementById('submit')
let restrauntSection = document.getElementById('restaurants')
let test = document.getElementById('test')

let addCounter = 0
const baseURL = 'http://localhost:4004'
let key = 'AIzaSyDeUBMTDzO2ZUpdu_20lxcjtWTVNpoCDV8'

let latLng;
async function initMap() {
const position = { lat: 40.7608, lng: -111.8910 };
const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

// The map, centered at Uluru
map = new Map(document.getElementById("map"), {
zoom: 12,
center: position,
mapId: "DEMO_MAP_ID",
});

// The marker, positioned at Uluru
const marker = new AdvancedMarkerElement({
map: map,
position: position,
title: "Salt Lake City",
});
}
initMap()

async function mapCenter(e) {
  const { Map } = await google.maps.importLibrary("maps");

  // e.preventDefault()

  axios.get(`${baseURL}/zipcode/${zipCode.value}`)
    .then(res => {
      const position = {lat: +res.data[0].latitude , lng: +res.data[0].longitude}
      latLng = position

      map = new Map(document.getElementById("map"), {
        zoom: 12,
        center: position,
        mapId: "DEMO_MAP_ID",
      });
    
      getNearbyRestaurants()
    })
}
 async function createMarker(place = google.maps.places.PlaceResult, sup) {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  if (!place.geometry || !place.geometry.location) return;
  const pinBackground = new PinElement({
    background: "#6B0F1A",
    borderColor: "#6B0F1A",
    glyphColor: "#fff8dc"
  });
  
  const marker = new AdvancedMarkerElement ({
    map,
    position: place.geometry.location,
    content: pinBackground.element

  });
}


function addToSpinner (idk) {
  let jsonObj = []
  jsonObj.push(idk)
  // console.log(jsonObj)
  if(addCounter <8){
    addCounter++
    axios.post(`${baseURL}/map`, {jsonObj})
      .then(res => {
        console.log(res.data)
      })
  } else {
    alert('No More than 8 items D=')
  }
}

function createRestaurantCard (yo, id) {
  // console.log(id)
  const restaurantCard = document.createElement('div')
  let photo = yo.photos[0].getUrl({maxHeight:300, minWidth:250})
  restaurantCard.classList.add('restaurant-card')
  restaurantCard.innerHTML = `
  <img alt="Restaurant Photo" src=${photo} class="restaurantPhoto"/>
  <p class="restaurantName">${yo.name}</p>
  <div class="btnContainer">
    <button class="addBtn" id="Btn-${id}"> Add To Spinner</button>
  </div>
  `
  restrauntSection.appendChild(restaurantCard)
  document.querySelector(`#Btn-${id}`).addEventListener('click', () => {
    addToSpinner(yo.name)
  })
}


async function getNearbyRestaurants () {
  const {Map} = await google.maps.importLibrary("maps");
  const {Places} = await google.maps.importLibrary("places");

  let request = {
    keyword: null,
    location: new google.maps.LatLng(+latLng.lat,+latLng.lng),
    radius: 5000,
    type: ['restaurant'],
  };

  let photoRequest = {
    placeId: null,
    fields: ['name', 'rating', 'photo', 'place_id']
  }
  service = new google.maps.places.PlacesService(map);

  axios.get(`${baseURL}/spec/${specs.value}`, request)
    .then((res) => {
      request.keyword = res.data
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i],results[i]);
            photoRequest.placeId = `${results[i].place_id}`
            // console.log(photoRequest.placeId)
            service.getDetails(photoRequest, (results,status) => {
              if(status === google.maps.places.PlacesServiceStatus.OK && results){
                // console.log(results)
                createRestaurantCard(results,results.place_id)
              }
            })
          }
          map.setCenter(results[0].geometry.location);
        }
      })
      specs.value = ''
    })
  }


form.addEventListener('submit',(e) => {
  e.preventDefault()
  mapCenter()
})