import domainAndPort from "./domainAndPort";

export default function editBusiness(token, updatedBusiness) {
  if (!token)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("לא התקבל אסימון");
      }, 300);
    });
  return fetch(`${domainAndPort}/api/edit_business`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(updatedBusiness),
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
