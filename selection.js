class Algorithm{
    

//in bubble sort adjacent pairs are compared and swapped
    static bubble(array){
    const swaps = [];
    let n = array.length;
    for(let i = 0; i < n; i++){ //for each outer loop iteration the biggest element goes to end
        //and range is shortened to not consider last element (last i elements are already sorted)
        for(let j = 0; j < n - 1 - i; j++){
            if(array[j] > array[j+1]){
                //swap
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                swaps.push({firstPosition:j, lastPosition: j+1})
            }
        }
    }
    return swaps;
    }

// time: O(n^2) space: O(1)
    static selection(array){
    const swaps = [];
    let n = array.length;
    for(let i = 0; i < n; i++){ 
        //each element in array is compared to others
        let min_index = i; //intially potential min index is i 
        for(let j = i+1; j < n; j++){
            if(array[j] < array[min_index]){
                min_index = j;}//we find index of smallest element 
        }
        if(min_index !== i){ // if i is not the min index we swap
            let temp = array[i];
            array[i] = array[min_index];
            array[min_index] = temp;
            swaps.push({firstPosition:i, lastPosition: min_index})
        }
    }
    return swaps;

    }

//recursive sorting technique where arays are split into subarrays based on a pivot and sorted
    static quicksort(array){
    
    const swaps = [];
    function partition(low, high) {
        let pivot = array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                swaps.push({firstPosition: i, lastPosition: j});
            }
        }
        
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swaps.push({firstPosition: i + 1, lastPosition: high});
            
        return i + 1;
    }
    
    function quickSortHelper(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    }
    
    quickSortHelper(0, array.length - 1);
    return swaps;
    }

    static countsort(array) {
        const swaps = [];
        const countrange = Math.max(...array) + 1;
        const count = Array(countrange).fill(0);

        // Counting
        for (let i = 0; i < array.length; i++) {
            count[array[i]]++;
        }

        // Cumulative count
        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
    const output = new Array(array.length);
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    // Record swaps for visualization
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== output[i]) {
            const j = array.indexOf(output[i], i);
            swaps.push({firstPosition: i, lastPosition: j});
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


        return swaps;
    }
}



export {
    Algorithm
}

//quicksort basic function
function Quicksort(array){
    
    const swaps = [];
    let n = array.length;


    //base case
    if(n < 2){
        return array;
    }

    //let us take the pivot as the first element
    let pivot = array[0];

    //smaller and bigger subarrays (than the pivot)
    let smaller = [];
    let bigger = [];

    //traversing throgh array to find smaller and bigger elements
    //since pivot is [0] we start from 1
    for (let i = 1; i < n ;i++) {
        if(array[i] < pivot){
            smaller.push(array[i]);
        }
        //appends elements equal to pivot in bigger (2 == 2, 2 in bigger)
        else{
            bigger.push(array[i]);
        }}
console.log("pivot: ", pivot);
console.log(smaller);
console.log(bigger);
    //recursively calling function - as the recursive calls unwind they go from bottom up and give sorted array
    return [...Quicksort(smaller), pivot, ...Quicksort(bigger)];
    }

    function countsort(array){
        let countrange = (Math.max(...array) + 1)
        let count = Array(countrange).fill(0);
        //counting
        for(let i = 0; i < array.length; i++){
            count[array[i]] += 1;
        }
        console.log("occuence: ", count);
        //cumulative
        for(let i = 0; i < count.length - 1; i++){
            count[i + 1] += count[i];
        }
        console.log("cumulatve: ", count);
        // in cumulative (running sum) , value held at an index is the last position of that value in sorted ersion of array
        // idex of value in sorted array will be count[value] - 1
    
        //we iterate from end (work backwords) of original array and decrement value of count cumuative
        let sortedarray = Array(array.length).fill(0);
        for(let i = array.length - 1; i >= 0; i--){
            count[array[i]]--;
            sortedarray[count[array[i]]] = array[i];
        }
        console.log(sortedarray);
    }