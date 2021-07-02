const API = "http://localhost:3000";
import {auth} from './firebase'

//fetch function helper to be able to fetch data from the api

export async function fetchFromAPI(endpointURL, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const user = auth.currentUser; //auth in front end for sign in
  const token = user && (await user.getIdToken()); //auth in front end for sign in

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //this used for authorization in the front end
    },
  });

  return res.json();
}
