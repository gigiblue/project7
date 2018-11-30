export const getLocations = (query) => {
	const CLIENT_ID = "3E5ETTUYPUMGMRRDDXOMXGZGQLI5N2AQOQMUBRTIQWGZD0WH";
	const CLIENT_SECRET = "GLREEQ2JETMP13VZ4FZNNFUK4WZ40MOX1KQ1D3LUVIR3P141";
	const CLIENT_VERSION = "20181128";

	query = query || 'ramen';

let url = `https://api.foursquare.com/v2/venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${CLIENT_VERSION}&radius=5000&ll=41.8724128,12.4767137&intent=browse&${query}`;
console.log(url);
let headers = new Headers();
let request = new Request(url, {
  method: 'GET',
  headers
});
//fetching data through FourSquare
return fetch(request)
  .then(response => response.json())
  .catch(error => {
    alert("Your FourSquare data could not be retrieved due to an error");
  });
}
