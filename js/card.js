let allIssues = [];

let loadingSpinner = document.getElementById("loading-spinner");
// active btn
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");

// api all data
const loadCardData = () => {
    loadingSpinner.classList.remove("hidden");
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((les) => les.json())
    .then((data) => {
      allIssues = data.data;
      displayCard(data.data);
      loadingSpinner.classList.add("hidden");
    });
};
// api search section
document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("search-input").value;
    loadingSpinner.classList.remove("hidden");
  let url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
  fetch(url)
    .then((les) => les.json())
    .then((data) => {
      allBtn.classList.remove("btn-primary");
      openBtn.classList.remove("btn-primary");
      closedBtn.classList.remove("btn-primary");
      displayCard(data.data);
      loadingSpinner.classList.add("hidden");
    });
});
// click button
const loadbtn = (btnName) => {
  if (btnName === "all") {
    displayCard(allIssues);
    allBtn.classList.add("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
  }

  if (btnName === "open") {
    const openIssues = allIssues.filter((issue) => issue.status === "open");
    displayCard(openIssues);
    allBtn.classList.remove("btn-primary");
    openBtn.classList.add("btn-primary");
    closedBtn.classList.remove("btn-primary");
  }

  if (btnName === "closed") {
    const closedIssues = allIssues.filter((issue) => issue.status === "closed");
    displayCard(closedIssues);
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.add("btn-primary");
  }
};

// card display section
const displayCard = (eliments) => {
  document.getElementById("issues-count").innerText = eliments.length;

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  eliments.forEach((eliment) => {
    // top border color
    const borderColor =
      eliment.status === "open" ? "border-green-500" : "border-purple-500";
    // statusicon
    const ststusIcon =
      eliment.status === "open"
        ? `<img class="w-9" src="assets/Open-Status.png" alt="" />`
        : `<img class="w-9" src="assets/Closed- Status .png" alt="" />`;
    // priority background
    const priorityStyle =
      eliment.priority === "high"
        ? "text-[#EF4444] bg-[#FEECEC]"
        : eliment.priority === "medium"
          ? "text-[#D97706] bg-[#FFF8DB]"
          : "text-[#9CA3AF] bg-[#EEEFF2]";
    // card
    let card = document.createElement("div");
    card.innerHTML = `
        <div
            class="shadow-2xl rounded-2xl p-5 space-y-4 border-t-4 ${borderColor}">
            <div class="flex justify-between">
                ${ststusIcon}
              <div>
                <h2 class="btn px-4 rounded-3xl ${priorityStyle}">
                  ${eliment.priority.toUpperCase()}
                </h2>
              </div>
            </div>
            <div>
              <h1 class="font-bold line-clamp-2 h-12">${eliment.title}</h1>
            </div>
            <div>
              <p class="text-gray-500 line-clamp-2 h-12">${eliment.description}</p>
            </div>
            <div class="flex gap-3">
              <h2
                class="btn rounded-3xl text-[#EF4444] bg-[#FEECEC] border-[#FECACA]"
              >
                <i class="fa-solid fa-bug"></i>Bug
              </h2>
              <h2
                class="btn rounded-3xl bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]"
              >
                <i class="fa-solid fa-life-ring"></i>HELP WANTED
              </h2>
            </div>
            <hr class="text-gray-400" />
            <div class="space-y-4">
              <p class="text-gray-500">#${eliment.id} by ${eliment.author}</p>
              <p class="text-gray-500">${new Date(eliment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
    `;
    cardContainer.appendChild(card);
  });
};

loadCardData();
