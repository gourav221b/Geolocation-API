// ALWAYS INITIALIZE API ON TOP

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
const lat = document.querySelector('#lat');
const lon = document.querySelector('#lon');
const vel = document.querySelector('#vel');
const vis = document.querySelector('#vis');


// MAKING TILES AND MAPS
const mymap = L.map('mapid').setView([0, 0], 1);
// setview(lat long zoom)
const tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = ' &copy; <a href="https://www/openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const tiles = L.tileLayer(tileurl, {
    attribution
});
tiles.addTo(mymap);
// END TILES
// MAKING ICONS WITH CUSTOM 
var issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [60, 40],
    iconAnchor: [30, 20],
    popupAnchor: [-3, -76],

});
const marker = L.marker([0, 0], {
    icon: issIcon
}).addTo(mymap);

// END MARKER

let firstTime = true;
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data.latitude);
    const {
        latitude,
        longitude,
        velocity,
        visibility
    } = data;
    // for setting it dynamically 
    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
        mymap.setView([latitude, longitude], 4);
        firstTime = false;

    }
    lat.innerHTML = "latitude :&nbsp; &nbsp;" + latitude.toFixed(3) + "°";
    lon.innerHTML = 'longitude :&nbsp; &nbsp;' + longitude.toFixed(3) + "°";
    vel.innerHTML = 'velocity :&nbsp; &nbsp;' + velocity.toFixed(3) + "kmph";
    vis.innerHTML = 'it is in :&nbsp; &nbsp;' + visibility;

}
getISS();


setInterval(getISS, 1000);