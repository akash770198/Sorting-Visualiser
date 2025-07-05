export const animateInsertionSort = async (arr, setArray, setBarColors, speed) => {
    const array = [...arr];
    const n = array.length;
    const colors = new Array(n).fill('default');

    for (let i = 1; i < n; i++) {

        let j = i;

        while (j > 0) {
            colors[j] = 'move'
            colors[j - 1] = 'move'
            setBarColors([...colors])
            await new Promise(resolve => setTimeout(resolve, speed));

            if (array[j] < array[j - 1]) {
                //blink red if not sorted
                colors[j] = 'wrong'
                colors[j - 1] = 'wrong'
                setBarColors([...colors])
                await new Promise(resolve => setTimeout(resolve, speed));

                //swap
                [array[j], array[j - 1]] = [array[j - 1], array[j]]
                setArray([...array])

                //Reset colors to default
                colors[j] = 'default'
                setBarColors([...colors])
                await new Promise(resolve => setTimeout(resolve, speed));
                colors[j - 1] = 'default'
            }
            else {
                //blink green if not sorted
                colors[j] = 'correct'
                colors[j - 1] = 'correct'
                setBarColors([...colors])
                await new Promise(resolve => setTimeout(resolve, speed));

                //reset to default
                colors[j] = 'default'
                colors[j - 1] = 'default'
                setBarColors([...colors])
                await new Promise(resolve => setTimeout(resolve, speed));
                break;
            }
            j--;
        }
    }

    // Final: mark all as correct
    for (let i = 0; i < n; i++) {
        colors[i] = 'sorted';
        setBarColors([...colors]);
        await new Promise(resolve => setTimeout(resolve, Math.max(10, speed / 5)));
    }
}