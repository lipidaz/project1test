let input = document.querySelector("#searchbar");
let items = document.querySelectorAll(".item");

const filterFunc = () => {
    console.log(items);
  for (let i = 0; i < items.length; i++) {
    if(items[i].innerText.toLowerCase().includes(input.value.toLowerCase())) {
        items[i].classList.remove("hidden");
    } else {
        items[i].classList.add("hidden");
    }
  }
};
