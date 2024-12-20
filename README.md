# Sorting-Algorithm-Visualizer

The Sorting Algorithm Visualizer is an interactive web application designed to help users understand and visualize the inner workings of various sorting algorithms. The project aims to provide a clear, intuitive demonstration of how sorting algorithms process and rearrange data, making it easier for students and enthusiasts to grasp these fundamental concepts in computer science.

Key Features:

User Interface:

Dynamic Bar Generation: Users can specify the number of bars to be sorted. Each bar represents a data element with a randomly assigned height.
Interactive Controls: Users can generate new sets of bars and select different sorting algorithms to visualize.
Visualization Area: The sorting process is displayed in a dedicated visual area where bars move and swap positions according to the selected algorithm's logic.
Supported Sorting Algorithms:

Bubble Sort: This algorithm repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted.
Selection Sort: This algorithm divides the list into a sorted and an unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.
Quick Sort: This algorithm picks a 'pivot' element and partitions the array into two halves: elements less than the pivot and elements greater than the pivot. It then recursively sorts the sub-arrays.
Count Sort: This algorithm uses an auxiliary array to count the occurrences of each unique element. The counts are then used to place the elements in their correct position in the sorted array.
Algorithm Selection and Visualization:

Users can select the desired sorting algorithm from a dropdown menu.
The "Visualize" button initiates the sorting process, displaying animations that highlight the movements and swaps of the bars.
The animation speed and visual feedback make it easy to follow the algorithm's logic step-by-step.
Detailed Algorithm Information:

When an algorithm is selected, detailed information about its time complexity and space complexity is displayed.
This helps users understand the efficiency and performance characteristics of each sorting method.
Technical Details:
Frontend: HTML5, CSS, and JavaScript are used to create the user interface and visualization components. The visual area is dynamically adjusted based on the number of bars, ensuring a responsive and user-friendly experience.
JavaScript Modules:
Algorithm Module: Contains the implementation of sorting algorithms like Bubble Sort, Selection Sort, Quick Sort, and Count Sort.
Utility Module: Provides helper functions such as sleep for creating delays in animations, ensuring smooth visual transitions.
Event Handling: Interactive elements such as buttons and dropdown menus are tied to event listeners that trigger the generation of new bars, selection of algorithms, and initiation of the visualization process.
Animation Logic: The movement and swapping of bars are managed through CSS classes and JavaScript DOM manipulation, providing real-time feedback on the sorting process.
The Sorting Algorithm Visualizer is an educational tool that combines theoretical knowledge with practical, visual demonstrations, making it an invaluable resource for anyone looking to deepen their understanding of sorting algorithms.
