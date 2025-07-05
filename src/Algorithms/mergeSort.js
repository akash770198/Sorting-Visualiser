export const animateMergeSort = async (arr, setArray, setBarColors, speed) => {
    const array = [...arr];
    const n = array.length;
    const colors = new Array(n).fill('default');

    await mergeSort(array, 0, n - 1, setArray, setBarColors, colors, speed);

    // After sorting, mark all bars as sorted
    for (let i = 0; i < array.length; i++) {
        colors[i] = 'sorted';
        setBarColors([...colors]);
        await sleep(speed)
    }
    setArray([...array])
}

const mergeSort = async (arr, start, end, setArray, setBarColors, colors, speed) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2)

    await mergeSort(arr, start, mid, setArray, setBarColors, colors, speed);
    await mergeSort(arr, mid + 1, end, setArray, setBarColors, colors, speed);

    await merge(arr, start, mid, end, setArray, setBarColors, colors, speed);
}

const merge = async (arr, start, mid, end, setArray, setBarColors, colors, speed) => {
    let i = start;
    let j = mid + 1;
    const temp = []

    while (i <= mid && j <= end) {
        setBarColors([...colors])
        colors[i] = 'compare'  //two purple lines are i and j pointer 
        colors[j] = 'compare'
        setBarColors([...colors])
        await sleep(speed)

        if (arr[i] < arr[j]) {
            temp.push(arr[i]);
            colors[i] = 'default'; //jo chota usko default and pointer moves aage and baaki bars will be still green if they are previously
            i++;
        }
        else {
            temp.push(arr[j]);
            colors[j] = 'default'; //jo chota usko default and pointer moves aage and baaki bars will be still green if they are previously
            j++;
        }

        setBarColors([...colors]);
        await sleep(speed);
    }
    //while merging the arrays the bars are set to default..here merging means merging of two sorted arrays in next iteraton
    //  is done for next iteration
    colors.fill('default', start, end + 1);
    setBarColors([...colors])
    await sleep(speed)

    //single array portion left so as it is filling in temp
    while (i <= mid) {
        colors[i] = 'compare';
        setBarColors([...colors]);
        await sleep(speed);

        temp.push(arr[i]);
        colors[i] = 'default'
        i++;
    }
    //single array portion left so as it is filling in temp
    while (j <= end) {
        colors[j] = 'compare';
        setBarColors([...colors]);
        await sleep(speed);

        temp.push(arr[j]);
        colors[j] = 'default'
        j++;
    }

    // showing merged one
    for (let i = start; i <= end; i++) {
        arr[i] = temp[i - start];
        colors[i] = 'merged';
        setArray([...arr]);
        setBarColors([...colors]);
        await sleep(speed);
    }

    setArray([...arr])
}

// Helper function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));