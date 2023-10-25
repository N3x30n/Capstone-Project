// Initialize and add the map
let map;
let form = document.getElementById('rest')
let submitBtn = document.getElementById('submit')
let restrauntSec = document.getElementById('restaurants')

const baseURL = 'http://localhost:4004/api'

async function initMap() {
  // The location of Uluru
  const position = { lat: 40.7608, lng: -111.8910 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();