export const animateSelectionSort = async (arr, setArray, setBarColors, speed) => {
    const array = [...arr];
    const n = array.length;
    const colors = new Array(n).fill('default');

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        colors[i] = 'move'; // highlight the current i
        setBarColors([...colors]);
        await new Promise(resolve => setTimeout(resolve, speed));

        for (let j = i + 1; j < n; j++) {
            const tempColors = [...colors];
            tempColors[j] = 'move';
            setBarColors(tempColors);
            await new Promise(resolve => setTimeout(resolve, speed));

            if (array[j] < array[minIdx]) {
                if (minIdx !== i) colors[minIdx] = 'default'; // agar pehle se koi minInd hai to use default kardo
                minIdx = j;
                colors[minIdx] = 'correct'; // ab jo minInd hai use highlight kardo
            } else {
                colors[j] = 'default'; // agar koi min nhi to default karte jao
            }

            setBarColors([...colors]);
        }

        if (minIdx !== i) {
            colors[minIdx] = 'correct'; //kuch time tak green rahe jo us itern mai minInd nikla hai
            setBarColors([...colors]);
            await new Promise(resolve => setTimeout(resolve, speed));

            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            setArray([...array]);
        }

        colors[minIdx] = 'default'; // reset min highlight (now swapped)
        colors[i] = 'sorted'; // mark current i as sorted
        setBarColors([...colors]);
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    colors[n - 1] = 'sorted'; // Last element already sorted hai so mark sorted
    setBarColors([...colors]);
};
