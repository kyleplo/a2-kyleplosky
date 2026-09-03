window.addEventListener("load", async () => {
  if (!localStorage.id) {
    localStorage.id = Math.random().toString(36).slice(2);
  }

  document.querySelectorAll("input[name=id]").forEach(input => {
    input.value = localStorage.id;
  })

  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      localStorage.vote = form.elements["vote"].value;
      const data = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: form.elements["id"].value,
          vote: form.elements["vote"].value
        })
      }).then(r => r.json());
    displayData(data);
    })
  });

  const data = await fetch("/api").then(r => r.json());
  displayData(data);
});

function displayData(data) {
  document.querySelector("#honeyCount").textContent = data.honey;
  document.querySelector("#dirtCount").textContent = data.dirt;

  document.querySelector("#honeyVoteList").innerHTML = "";
  document.querySelector("#dirtVoteList").innerHTML = "";
  for (const vote of data.votes) {
    const listItem = document.createElement("LI");
    listItem.textContent = `Someone voted for ${vote.vote} on ${new Date(vote.timestamp).toLocaleString()}`

    if (vote.vote === "honey") {
      document.querySelector("#honeyVoteList").append(listItem)
    } else if (vote.vote === "dirt") {
      document.querySelector("#dirtVoteList").append(listItem)
    }
  }

  if (localStorage.vote && localStorage.vote !== "clear") {
    document.body.className = "voted-" + localStorage.vote;
  } else {
    document.body.className = "";
  }
}