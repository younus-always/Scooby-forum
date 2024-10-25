const menuBar = document.getElementById("humberger");
menuBar.addEventListener("click", () => {
  document.getElementById("showDropDown").classList.toggle("hidden");
});

// Load all data...
const loadData = async (category) => {
  if (category) {
    document.getElementById("error").classList.add("hidden");
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
    const data = await res.json();
    displayData(data.posts);
  } else if (category === "") {
    document.getElementById("error").classList.remove("hidden");
  } else {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await res.json();
    displayData(data.posts);
  }
  category = "";
};

// loadLatest data..
const latestDataLoad = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  latestData(data);
};

const loadData2 = async (search) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`
  );
  const data = await res.json();
  console.log(data);
};

// Search input value by btn..
const displaySearch = () => {
  const input = document.getElementById("searchAn");
  let category = input.value;

  loadData(category);
};

// Display data...
const displayData = (postData) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  postData.forEach((post) => {
    const {
      image,
      category,
      title,
      author: { name },
      description,
      comment_count,
      view_count,
      posted_time,
      isActive,
    } = post;
    const postCard = document.createElement("div");
    postCard.classList.add(
      "shadow-lg",
      "rounded-2xl",
      "border",
      "p-6",
      "flex",
      "gap-4"
    );
    postCard.innerHTML = `
                            <div class="relative">
                                <img class="w-16 h-16 rounded-xl" src="${image}" alt="avatar">
                                <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-transparent ${
                                  isActive ? "bg-green-500" : "bg-red-500"
                                }"></div>
                            </div>
                            <div class="space-y-3 w-full">
                                <div class="flex items-center gap-2">
                                    <p class="font-bold">#${category}</p>
                                    <p>Author: <span class="font-bold">${name}</span></p>
                                </div>
                                <h3 class="font-bold text-xl">${title}</h3>
                                <p class="text-gray-500 font-semibold border-b-2 border-dashed pb-4">
                                ${description}
                                </p>
                                <!--  -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <div class="flexi items-center gap-2">
                                            <i class="ri-message-3-line text-xl"></i>
                                            <span class="font-semibold">${comment_count}</span>
                                        </div>
                                        <div class="flexi items-center gap-2">
                                            <i class="ri-eye-line text-xl"></i>
                                            <span class="font-semibold">${view_count}</span>
                                        </div>
                                        <div class="flexi items-center gap-2">
                                            <i class="ri-timer-2-line text-xl"></i>
                                            <span class="font-semibold">${posted_time} Min</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button onclick="addToCheck('${description}', '${view_count}')"
                                        class="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer text-center">
                                            <i class="ri-mail-open-fill text-slate-50"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`;
    postContainer.appendChild(postCard);
  });
};

// Display latest data..
const latestData = (data) => {
  const latestContainer = document.getElementById("latestCard-container");
  data.forEach((d) => {
    // Object destructure ======
    const {
      cover_image,
      profile_image,
      title,
      description,
      author: { name, designation },
    } = d;

    const latestCard = document.createElement("div");
    latestCard.classList.add(
      "shadow-lg",
      "rounded-xl",
      "p-6",
      "border",
      "border-indigo-600"
    );
    latestCard.innerHTML = `
                    <div class="overflow-hidden">
                        <img class="rounded-lg h-52 w-full object-top object-cover" src="${profile_image}" alt="profile">
                        </div>
                        <!-- card body -->
                        <div>
                        <div class="flex items-center gap-2 text-gray-500 my-2">
                            <i class="ri-calendar-2-line"></i>
                            <span>29 January 2024</span>
                        </div>
                        <h3 class="font-bold text-2xl">${title}</h3>
                        <p class="text-gray-600 font-semibold my-2">${description}</p>
                        <div class="flex items-center gap-5">
                            <div class="border-2 border-blue-700 w-10 h-10 rounded-full flex items-center justify-center">
                                <img src="${cover_image}" alt="cover-photo" class="w-8 h-8 rounded-full">
                            </div>
                            <div>
                                <h5 class="font-bold">${name}</h5>
                                <span>${
                                  designation == undefined
                                    ? "Unavailable"
                                    : designation
                                }</span>
                            </div>
                        </div>
                    </div>`;
    latestContainer.append(latestCard);
  });
};

const addToCheck = (description, view) => {
  document.getElementById("for-mb").classList.add("mb-4");
  const addContainer = document.getElementById("added-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="bg-white rounded-xl p-4 flex items-center justify-between">
                                <h3 class="font-bold text-lg w-4/6 sm:w-5/6">
                                    ${description}
                                </h3>
                                <p class="flex items-center gap-1"><i class="ri-eye-line"></i> <span>${view}</span></p>
                            </div>`;
  addContainer.append(div);
  counter();
};
const counter = () => {
  const prevCount = document.getElementById("count").innerText;
  const sum = parseInt(prevCount);
  document.getElementById("count").innerText = sum + 1;
};

loadData();
latestDataLoad();
