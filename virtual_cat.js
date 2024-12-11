class Cat {
  constructor(name, imageUrl) {
    this.imageUrl = imageUrl;
    this.name = name;
  }
  meow() {
    return `${this.name} meows`;
  }
}

const formEl = document.getElementById("userForm");
const userNameEl = document.getElementById("userName");
const numofCatEl = document.getElementById("numofCat");
const main = document.getElementsByTagName("main")[0];
const intro = document.getElementById("intro");
const adopting = document.getElementById("adopting");
const yNbuttonGroup = document.getElementById("yNbuttonGroup");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const end = document.getElementById("end");
const userInfo = document.getElementById("userInfo");
const catInfo = document.getElementById("catInfo");
const noCat = document.getElementById("noCat");
const feedCat = document.getElementById("feedCat");
const hungryCat = document.getElementById("hungry");
const dance = document.getElementById("dance");

end.classList.add("hidden");
adopting.classList.add("hidden");
feedCat.classList.add("hidden");
const catArray = [];

feedCat.addEventListener("click", () => {
  alert("Cat is fed");
});

const validInputLength = (input, min) => {
  if (input.value.trim().length >= min) {
    input.parentElement.classList.remove("invalid");
    return true;
  } else {
    input.parentElement.classList.add("invalid");
    return false;
  }
};

const adoptCat = (Cat) => {
  catArray.push(Cat);
  console.log("cat array is " + catArray);
  console.log(catArray);
};

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validInputLength(userNameEl, 3) &&
    numofCatEl.value > 0 &&
    numofCatEl.value < 10
  ) {
    intro.classList.add("hidden");
    adopting.classList.remove("hidden");
    const userName = userNameEl.value;
    const numofCat = numofCatEl.value;
    const BASE_URL = "https://api.thecatapi.com/v1/images/search";
    const url = `${BASE_URL}?api-key=${myKey}`;
    console.log(url);

    async function fetchCatData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Data fetched:", data);
        showCat(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    function showCat(data) {
      const catImage = document.createElement("img");
      catImage.style.width = "300px";
      //   adopting.appendChild(catImage);
      adopting.insertBefore(catImage, adopting.firstChild);
      const catImageUrl = JSON.stringify(data[0].url);
      const catImageSrc = catImageUrl.substring(1, catImageUrl.length - 1);
      catImage.src = catImageSrc;
      const adoptingCat = new Cat(catName.value, catImageSrc);
      //   adoptCat(adoptingCat);
      yesButton.addEventListener("click", () => {
        e.preventDefault();
        adoptCat(adoptingCat);
        adopting.classList.add("hidden");
        end.classList.remove("hidden");
        userInfo.innerHTML = `Congrats ${userName}! You've adopted ${catArray[0].name}`;
        catInfo.appendChild(catImage);
        dance.addEventListener("click", () => {
          catImage.style.transform += "rotate(" + (60 % 360) + "deg)";
        });
        setTimeout(function () {
          hungryCat.innerHTML = `${catArray[0].name} is hungry`;
          feedCat.classList.remove("hidden");
        }, 2500);
      });
    }
    noButton.addEventListener("click", () => {
      adopting.classList.add("hidden");
      noCat.innerHTML = `You did not adopt any cats :(`;
    });
    fetchCatData(url);
  }
});

// One or more Classes (must use static methods and/or prototype methods)
// Write testable code, use Jasmine unit tests
// One or more timing functions
// One or more fetch requests to a 3rd party API
// Sets, updates, or changes local storage
// Contains form fields, validates those fields
