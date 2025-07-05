import { toast } from "react-toastify";

export const animateHeapSort = async (arr, setArray, setBarColors, speed) => {
    const array = [...arr]
    const n = array.length
    const colors = new Array(n).fill('default')

    // step 1: Build max heap
    for (let i = (Math.floor(n / 2) - 1); i >= 0; i--) {
        await heapify_without_animation(array, n, i);
    }

    setArray([...array])
    toast.success('Array converted to Max-heap!')
    await sleep(1500)

    //heap sort
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];

        colors[0] = 'to_be_swap'
        colors[i] = 'to_be_swap'
        setBarColors([...colors])
        await sleep(speed)

        setArray([...array])

        colors[i] = 'sorted'
        colors[0] = 'default'
        setBarColors([...colors])
        await sleep(speed)

        await heapify(array, i, 0, setArray, setBarColors, colors, speed);
    }

    colors[0] = 'sorted'
    setBarColors([...colors])
    setArray([...array])
}

//heapify with animation
const heapify = async (arr, n, i, setArray, setBarColors, colors, speed) => {
    let lft_idx = 2 * i + 1;
    let rt_idx = (2 * i) + 2;
    let largest_idx = i;

    if (lft_idx < n) colors[lft_idx] = 'compare'
    if (rt_idx < n) colors[rt_idx] = 'compare'
    colors[i] = 'compare'
    setBarColors([...colors])
    await sleep(speed);

    if (lft_idx < n && arr[lft_idx] > arr[largest_idx]) largest_idx = lft_idx;
    if (rt_idx < n && arr[rt_idx] > arr[largest_idx]) largest_idx = rt_idx;

    if (largest_idx != i) {
        [arr[i], arr[largest_idx]] = [arr[largest_idx], arr[i]]

        colors[largest_idx] = 'to_be_swap'
        colors[i] = 'to_be_swap'
        setBarColors([...colors])
        await sleep(speed)

        setArray([...arr])
        colors[i] = 'correct'
        colors[largest_idx] = 'correct'
        setBarColors([...colors])
        await sleep(speed)

        colors[i] = 'default'
        if (lft_idx < n) colors[lft_idx] = 'default'
        if (rt_idx < n) colors[rt_idx] = 'default'
        setBarColors([...colors])

        await heapify(arr, n, largest_idx, setArray, setBarColors, colors, speed)
    }
    else {
        colors[i] = 'default'
        if (lft_idx < n) colors[lft_idx] = 'default'
        if (rt_idx < n) colors[rt_idx] = 'default'
        setBarColors([...colors])
    }
}

// heapify function
const heapify_without_animation = (arr, n, i) => {
    let index = i;
    while (index < n) {
        let lft_idx = 2 * index + 1;
        let rt_idx = (2 * index) + 2;
        let largest_idx = index;

        if (lft_idx < n && arr[lft_idx] > arr[largest_idx]) largest_idx = lft_idx;
        if (rt_idx < n && arr[rt_idx] > arr[largest_idx]) largest_idx = rt_idx;

        if (index == largest_idx) break;
        [arr[index], arr[largest_idx]] = [arr[largest_idx], arr[index]];
        index = largest_idx;
    }
} 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))