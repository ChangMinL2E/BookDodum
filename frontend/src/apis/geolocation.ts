import axios from "axios";

export async function getGeoLocationAPI() {
  // 현재 위치 정보 - 좌표
  let geoLocation: number[] = [];
  
  navigator.geolocation.getCurrentPosition((position) => {
    geoLocation = [position.coords.longitude, position.coords.latitude];
});

return geoLocation;
}
