let input = document.querySelector(".input");
let output = document.querySelector(".output");
// let buttons = Array.from(input.children);
// console.log(buttons);

input.addEventListener("click", (e) => {
  console.log(e.target.tagName);
  if (e.target.className) {
    switch (e.target.className) {
      case "del":
        output.innerText = output.innerText.slice(
          0,
          output.innerText.length - 1
        );
        break;
      case "ac":
        output.innerText = "";
        break;
      case "eq":
        calculate(output.innerText);
        break;
    }
  } else if (e.target.tagName === "BUTTON") {
    output.innerText += e.target.innerText;
  }
});
