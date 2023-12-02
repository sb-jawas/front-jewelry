/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  const mylatLng = { lat: 38.6929488, lng: -4.1085622 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: mylatLng,
    mapTypeControl: false,
  });
  marker = new google.maps.Marker({
    position: mylatLng,
    map,
  });
  geocoder = new google.maps.Geocoder();

  const inputText = document.getElementById("ubi");

  inputText.type = "text";
  inputText.placeholder = "Enter a location";

  const submitButton = document.getElementById("btn");

  const clearButton = document.getElementById("clear");

  map.addListener("click", async (e) => {
    geocode({ location: e.latLng });
    const infowindow = new google.maps.InfoWindow();
    infowindow.close()
    let placeId = localStorage.getItem("placeId")
    await infoPlace(placeId)
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
    document.getElementById("ubi").value = "";
  });
  
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;

      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);

      localStorage.setItem("ubi", `${results[0].geometry.location}`);
      localStorage.setItem("placeId",`${results[0].place_id}`)
      document.getElementById("ubi").value = `${results[0].formatted_address}`;
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}

function infoPlace(placeId){
    const request = {
        placeId: placeId,
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    
      service.getDetails(request, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
    
          google.maps.event.addListener(marker, "click", () => {
            const content = document.createElement("div");
            const nameElement = document.createElement("h2");
    
            nameElement.textContent = place.name;
            content.appendChild(nameElement);
    
            const placeIdElement = document.createElement("p");

            content.appendChild(placeIdElement);
    
            const placeAddressElement = document.createElement("p");
    
            placeAddressElement.textContent = place.formatted_address;
            content.appendChild(placeAddressElement);
            infowindow.setContent(content);
            infowindow.open(map, marker);
            
          });
        }
      });
}




window.initMap = initMap;
