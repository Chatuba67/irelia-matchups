let data = {};
const grid = document.getElementById("champion-grid");

async function loadData() {
  const response = await fetch("data.json");
  data = await response.json();
  renderChampions(Object.keys(data));
}

function renderChampions(list) {
  grid.innerHTML = "";

  list.forEach(champ => {
    const img = document.createElement("img");
    img.className = "champ-icon";

    img.src = `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champ}.png`;

    img.onerror = () => {
      img.src = "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Irelia.png";
    };

    img.onclick = () => openPopup(champ);

    grid.appendChild(img);
  });
}

function filterChampions() {
  const value = document.getElementById("search").value.toLowerCase();

  const filtered = Object.keys(data).filter(champ =>
    champ.toLowerCase().includes(value)
  );

  renderChampions(filtered);
}

function openPopup(champ) {
  const popup = document.getElementById("popup");
  const title = document.getElementById("popup-title");
  const list = document.getElementById("popup-list");

  title.innerText = champ;
  list.innerHTML = "";

  data[champ].forEach(line => {
    const li = document.createElement("li");
    li.innerText = line;
    list.appendChild(li);
  });

  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

loadData();
