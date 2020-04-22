import { SERVER_URL } from "../settings";

const ServerFacade = () => {
    /**
     * Used to fetch nearby people. 
     * Returns array of objects. Each object contains the following:
     * username
     * name
     * latitude
     * longitude
     * @param {number} lat 
     * @param {number} lon 
     * @param {string} username 
     * @param {string} password 
     * @param {number} distance 
     */
  async function fetchNearbyPlayers(lat, lon, username, password, distance) {
    const payload = {
      userName: username,
      password,
      lat,
      lon,
      distance,
    };
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const res = await fetch(`${SERVER_URL}/gameapi/nearbyplayers`, config)
    .then((res) =>res.json());
    return res;
  }


  return {
    fetchNearbyPlayers
  };
};

export default ServerFacade();
