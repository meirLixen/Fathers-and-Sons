import domainAndPort from "./domainAndPort";
export default function loginBusiness(emailAndPassword) {
  return fetch(`${domainAndPort}/api/login_business`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailAndPassword),
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
