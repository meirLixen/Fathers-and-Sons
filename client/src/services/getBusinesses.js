import domainAndPort from "./domainAndPort";

export default function getBusinesses(token) {
  if (!token)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("לא התקבל אסימון");
      }, 300);
    });
  return fetch(`${domainAndPort}/api/get_businesses`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      if (isJson(responseText)) return JSON.parse(`${responseText}`);
      return responseText;
    })
    .catch((e) => alert(e));
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
