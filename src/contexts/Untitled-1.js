async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "get",
    mode: "cors",

    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = response.json();
  console.log(json);
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
