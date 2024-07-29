import { sleep } from "./utility.js";
import { Algorithm } from "./selection.js";

let nbars = 10; // Initial number of bars

const numberBars = document.getElementById("numberBars");
const visual = document.getElementById("visual");
visual.style.width = `${nbars * 30}px`; // setting width of visual based on number of bars

const algoSelect = document.getElementById("selectAlgorithm"); // getting user choice from dropdown
const generate = document.getElementById("newnumber"); // input  of number of bars
const visualizebtn = document.getElementById("solveButton"); // visualize button

let bars = []; // array whhich hols data for ech bar (height, width, etc)
let barsDiv = []; //array to hold actual dom elemts representing each bar

const algorithm = new Algorithm(); // creating class object from Algorithm class

const start = () => {
    visual.innerHTML = ''; //clears visual at start 

    // Generating random height bars
    // array with nbars number of bars
    // all array elements are initially filled with 0s
    //with map, a new array created (number of elements = umber of 0s)
    bars = Array(nbars).fill(0).map(_ => {
    // _ is used as we do not need to use 0 value (indicates value not important)
        return {
            width: 20, //width is a constant 20px for bars
            height: Math.floor(Math.random() * 200) + 1
            //generates random heights for bars between 1 - 200
        };
        //For each element, the arrow function returns an object with width and height properties.
    });

    barsDiv = [];

//for each bar, a ar dive is created, heigth width is set in reference to bars[] and appened to visual container of html
    for (let i = 0; i < bars.length; i++) {
        const bar = document.createElement("div");
        bar.style.width = `${bars[i].width}px`;
        bar.style.height = `${bars[i].height}px`;
        bar.style.left = `${5 + i * 30}px`;
        bars[i] = { ...bars[i], position: i};
        bar.classList.add("bar");
        //under bar class (for .bar css properties)
        barsDiv.push(bar);
        visual.appendChild(bar);
    }
};

start();

// Asynchronously swaps the positions of two bars and adds an animation.
async function swapBars(barsDiv, i, j){
    console.log(`Swapping bars at positions ${i} and ${j}`);
    barsDiv[i].style.left = `${5 + j * 30}px`; //moves left from position i to new position j 
    barsDiv[i].classList.add('activate');
    barsDiv[j].style.left = `${5 + i * 30}px`; // bar at j moved to i
    barsDiv[j].classList.add('activate');
    await sleep(450); //waits 300ms for animation to complete
    barsDiv[i].classList.remove('activate'); 
    barsDiv[j].classList.remove('activate');
    //removes activate class (animation) and bars are swapped
    let temp = barsDiv[i];
    barsDiv[i] = barsDiv[j];
    barsDiv[j] = temp;
}

const algorithms = [
    Algorithm.bubble, //bubble method in algo class
    Algorithm.selection,
    Algorithm.quicksort,
    Algorithm.countsort
]

const solve = async () => {
    console.log("Solve function called");
    const array = structuredClone(bars.map(el => el.height)); 
    //creates a deep copy of this array to ensure that the original bars array remains unchanged when sorting.
    // the copy array is transformed an array of just the heights of the bars.

    const swaps = algorithms[algoSelect.selectedIndex](array);
//gets the index of the selected sorting algorithm from the dropdown menu.
//(array) calls the selected sorting algorithm with the array of bar heights as its argument.

// swaps.length is the total number of swap operations.
    for (let i = 0; i < swaps.length; i++){
        if (swaps[i].firstPosition !== swaps[i].lastPosition)
            // Checks if the current swap operation involves two different positions.
        /*swaps[i].firstPosition is the position of the first bar to be swapped.
swaps[i].lastPosition is the position of the second bar to be swapped.
If these positions are different, the swap operation will be performed.
 */
            {
            await swapBars(barsDiv, swaps[i].firstPosition, swaps[i].lastPosition);
            //await ensures that the function waits for the swapBars function to complete before continuing to the next swap operation.
        }
    }
    console.log("They are swapped")
}

generate.addEventListener('click', () => {
    console.log("generate button pressed")
    nbars = parseInt(numberBars.value, 10); //Updates the number of bars based on the input value.
    visual.style.width = `${nbars * 30}px`; //Updates the width of the visual container.
    start();
});

//user input is always string 
//parseInt(string, radix) is a JavaScript function that converts a string to an integer
//radix is the base (10 for decimal, 2 for binary, etc)

visualizebtn.addEventListener('click', () => {
    console.log("visual button pressed")
    textshow();
    solve();

});

const textshow = () => {
    const infobox = document.getElementById("infobox");

// Remove existing text div if any
const existingTextDiv = infobox.querySelector('.text');
if (existingTextDiv) {
    infobox.removeChild(existingTextDiv);
}

    const textdiv = document.createElement("div");
    textdiv.classList.add("text");
    infobox.appendChild(textdiv);

    const algoselected = algoSelect.value;
    switch (algoselected) {
        case "Bubble sort":
            textdiv.innerHTML = "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted. Time Complexity: O(n^2) Space Complexity: O(1)";
            break;
        case "Selection sort":
            textdiv.innerHTML = "Selection sort is a simple sorting algorithm where each step selects the smallest element from the unsorted portion and swaps it with the first element of the unsorted portion, effectively growing the sorted portion one element at a time. Time Complexity: O(n^2) Space Complexity: O(1)"; 
            break;
        case "Quick sort":
            textdiv.innerHTML = "Quick sort is an efficient, in-place sorting algorithm that uses the divide-and-conquer approach. It selects a pivot element and partitions the array into two sub-arrays: elements less than the pivot and elements greater than or equal to the pivot. The pivot is placed in its correct position. This process is recursively applied to the sub-arrays. Time Complexity: O(n log n) average, O(n^2) worst case; Space Complexity: O(log n)";
            break;
        case "Count sort":
            textdiv.innerHTML = "Count sort is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values, and applying prefix sum on those counts to determine the positions of each key value in the output sequence. Time Complexity: O(n+k) where k is the range of input, Space Complexity: O(n+k)";
            break;
        default:
            textdiv.innerHTML = "Algorithm not recognized";
            break;
    }

}
