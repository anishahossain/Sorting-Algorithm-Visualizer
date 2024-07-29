//Creates a delay for a specified number of milliseconds. Used to create pauses in the sorting visualization.
// used to make code wait till animation is complete

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export {
    sleep
}