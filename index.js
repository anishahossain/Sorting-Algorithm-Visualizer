const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

class Algorithm {
  static bubble(array) {
    const swaps = [];
    let n = array.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swaps.push({ firstPosition: j, lastPosition: j + 1 });
        }
      }
    }
    return swaps;
  }

  static selection(array) {
    const swaps = [];
    let n = array.length;
    for (let i = 0; i < n; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        swaps.push({ firstPosition: i, lastPosition: minIndex });
      }
    }
    return swaps;
  }

  static quicksort(array) {
    const swaps = [];
    function partition(low, high) {
      let pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          swaps.push({ firstPosition: i, lastPosition: j });
        }
      }

      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      swaps.push({ firstPosition: i + 1, lastPosition: high });

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
    const countRange = Math.max(...array) + 1;
    const count = Array(countRange).fill(0);

    for (let i = 0; i < array.length; i++) {
      count[array[i]]++;
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    const output = new Array(array.length);
    for (let i = array.length - 1; i >= 0; i--) {
      output[count[array[i]] - 1] = array[i];
      count[array[i]]--;
    }

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== output[i]) {
        const j = array.indexOf(output[i], i);
        swaps.push({ firstPosition: i, lastPosition: j });
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    return swaps;
  }
}

// Root route to handle GET requests to "/"
app.get("/", (req, res) => {
  res.send("Welcome to the Sorting Algorithm API!");
});

app.post("/sort", (req, res) => {
  const { algorithm, array } = req.body;

  if (!algorithm || !array) {
    return res.status(400).json({ error: "Algorithm and array are required" });
  }

  let swaps = [];
  switch (algorithm) {
    case "bubble":
      swaps = Algorithm.bubble([...array]);
      break;
    case "selection":
      swaps = Algorithm.selection([...array]);
      break;
    case "quicksort":
      swaps = Algorithm.quicksort([...array]);
      break;
    case "countsort":
      swaps = Algorithm.countsort([...array]);
      break;
    default:
      return res.status(400).json({ error: "Invalid algorithm" });
  }

  res.json({ swaps });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
