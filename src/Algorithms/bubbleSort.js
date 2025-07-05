export const animateBubbleSort = async (arr, setArray, setBarColors, speed) => {
    const array = [...arr];
    const n = array.length;
    const colors = new Array(n).fill('default'); // Initialize all bars with default color

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Reset colors to default for every new pair check (except already sorted ones)
            const currentColors = [...colors];

            // Before swapping, check if the pair is sorted or not
            if (array[j] > array[j + 1]) {
                // If not sorted, both bars should blink red
                currentColors[j] = 'wrong';
                currentColors[j + 1] = 'wrong';

                // Show the array with red bars for unsorted pair
                setBarColors([...currentColors]);

                // Pause for a moment so user can see the red blink
                await new Promise(resolve => setTimeout(resolve, speed));

                // Swap the elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                setArray([...array]);

                // After swap, the larger element becomes default color (it's sorted)
                currentColors[j] = 'default'; // The larger one
                setBarColors([...currentColors]);

                // Pause for a moment after swap
                await new Promise(resolve => setTimeout(resolve, speed));
            } else {
                // If the pair is already sorted, both bars should blink green
                currentColors[j] = 'correct';
                currentColors[j + 1] = 'correct';
                setBarColors([...currentColors]);

                // Pause for a moment so user can see the green blink
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
        
        // After the inner loop, mark the element at the last position as teal
        colors[n - i - 1] = 'sorted';
        setBarColors([...colors]);

        // Pause so user can see the teal color for the sorted element
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    // After all iterations, the entire array is sorted, and all bars should turn teal
    colors.fill('sorted');
    setBarColors([...colors]);
};

