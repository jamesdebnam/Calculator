let input = document.querySelector(".input");
let output = document.querySelector(".output");
let calculated = false;

//If the input is clicked, the following function will be called
input.addEventListener("click", (e) => {
  //This if statement clears the screen when any button is pressed after
  //a calculation is made
  if (calculated) {
    output.innerText = "";
    calculated = false;
  }
  //If the target button has a class, then we move to the switch case
  if (e.target.className) {
    switch (e.target.className) {
      //This case slices the string to cut off the last character,
      //acting as a delete button
      case "del":
        output.innerText = output.innerText.slice(
          0,
          output.innerText.length - 1
        );
        break;
      //This case just clears the whole output
      case "ac":
        output.innerText = "";
        break;
      case "eq":
        calculate(output.innerText);
        break;
    }
    //If the target is a button, and not one of the classed buttons,
    //the output is concatenated with that button content
  } else if (e.target.tagName === "BUTTON") {
    output.innerText += e.target.innerText;
  }
});

//This just maps the buttons to keyboard presses
document.addEventListener("keydown", (e) => {
  if (/[0-9+-/*]/.test(e.key) && /[^F]/.test(e.key)) {
    output.innerText += e.key;
  } else if (e.key === "Backspace") {
    output.innerText = output.innerText.slice(0, output.innerText.length - 1);
  } else if (e.key === "=") {
    calculate(output.innerText);
  } else if (e.key === "Enter") {
    if (calculated) {
      output.innerText = "";
      calculated = false;
    }
    calculate(output.innerText);
  }
});

//The function calls plus, then minus, etc. in order - the first one which catches
//an operator will call through the other functions and break out.
//I know this is a bit messy... But it was the most elegant way I could think to do it
function calculate(mathStr) {
  let answer = calculateDivide(
    calculateTimes(calculateMinus(calculatePlus(mathStr)))
  );
  output.innerText = answer;
  calculated = true;
}

function calculatePlus(mathStr) {
  //First, we check for + symbols, and split it up by that
  if (/\+/.test(mathStr)) {
    mathStr = mathStr.split("+");
    console.log(mathStr);
    //Iterates through each item that was split up to see if there
    //were any more operators, and calls the other calculation function
    //if there were
    for (let i = 0; i < mathStr.length; i++) {
      switch (true) {
        case /\-/.test(mathStr[i]):
          mathStr[i] = calculateMinus(mathStr[i]);
          break;
        case /\*/.test(mathStr[i]):
          mathStr[i] = calculateTimes(mathStr[i]);
          break;
        case /\//.test(mathStr[i]):
          mathStr[i] = calculateDivide(mathStr[i]);
          break;
      }
    }
    mathStr = mathStr.reduce((a, b) => Number(a) + Number(b));
  }
  return mathStr;
}

function calculateMinus(mathStr) {
  //First, we check for - symbols, and split it up by that
  if (/\-/.test(mathStr)) {
    mathStr = mathStr.split("-");
    console.log(mathStr);
    //Iterates through each item that was split up to see if there
    //were any more operators, and calls the other calculation function
    //if there were
    for (let i = 0; i < mathStr.length; i++) {
      switch (true) {
        case /\*/.test(mathStr[i]):
          mathStr[i] = calculateTimes(mathStr[i]);
          break;
        case /\//.test(mathStr[i]):
          mathStr[i] = calculateDivide(mathStr[i]);
          break;
      }
    }
    mathStr = mathStr.reduce((a, b) => Number(a) - Number(b));
  }
  return mathStr;
}

function calculateTimes(mathStr) {
  //First, we check for * symbols, and split it up by that
  if (/\*/.test(mathStr)) {
    mathStr = mathStr.split("*");
    console.log(mathStr);
    //Iterates through each item that was split up to see if there
    //were any more operators, and calls the other calculation function
    //if there were
    for (let i = 0; i < mathStr.length; i++) {
      if (/\//.test(mathStr[i])) mathStr[i] = calculateDivide(mathStr[i]);
    }
    mathStr = mathStr.reduce((a, b) => Number(a) * Number(b));
  }
  return mathStr;
}

function calculateDivide(mathStr) {
  if (/\//.test(mathStr)) {
    mathStr = mathStr.split("/");
    mathStr = mathStr.reduce((a, b) => Number(a) / Number(b));
  }
  return mathStr;
}
