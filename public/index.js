// Initialize and add the map
let map;
let service;
let form = document.getElementById('rest')
let zipCode = document.getElementById('zipcode')
let specs = document.getElementById('spec')
let submitBtn = document.getElementById('submit')
let restrauntSection = document.getElementById('restaurants')
let test = document.getElementById('test')


const baseURL = 'http://localhost:4004'


let latLng;
async function initMap() {
// The location of Uluru
const position = { lat: 40.7608, lng: -111.8910 };
// Request needed libraries.
//@ts-ignore
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
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

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
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: res.data.city
      })
      zipCode.value = ''
      getNearbyRestaurants()
    })
}
function createMarker(place = google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
}

async function getNearbyRestaurants () {
  const {Map} = await google.maps.importLibrary("maps");
  const {Places} = await google.maps.importLibrary("places");

  let request = {
    keyword: null,
    location: new google.maps.LatLng(+latLng.lat,+latLng.lng),
    radius: 5000,
    type: ['restaurant']
  };
  service = new google.maps.places.PlacesService(map);

  axios.get(`${baseURL}/spec/${specs.value}`, request)
    .then((res) => {
      request.keyword = res.data

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(request.location)  
        console.log(results)
          for (let i = 0; i < results.length; i++) {
            
            createMarker(results[i]);
          }
          
          map.setCenter(results[0].geometry.location);
        }
      });
    })
  }


form.addEventListener('submit',(e) => {
  e.preventDefault()
  mapCenter()
})