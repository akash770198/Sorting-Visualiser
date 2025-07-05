import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { animateBubbleSort } from '../Algorithms/bubbleSort';
import { animateSelectionSort } from '../Algorithms/selectionSort';
import { getColor } from '../Algorithms/colors';
import { animateInsertionSort } from '../Algorithms/insertionSort';
import { animateMergeSort } from '../Algorithms/mergeSort';
import { animateHeapSort } from '../Algorithms/heapSort';



// Helper function to generate a random number between min and max
const random_num_from_interval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const SortingVisualizer = () => {
    const navigate = useNavigate()
    const [array, setArray] = useState([])
    const [sliderValue, setSliderValue] = useState(50)
    const [barColors, setBarColors] = useState([])
    const [isSorting, setIsSorting] = useState(false)
    const [sortSpeed, setSortSpeed] = useState(100)
    const [selectedAlgo, setSelectedAlgo] = useState(null)

    // function to reset the array with random values
    const resetArray = () => {
        const size = Math.floor((sliderValue) / 100 * 200) + 5
        const newArray = [];
        for (let i = 0; i < size; i++) {
            newArray.push(random_num_from_interval(5, 600))
        }

        setArray(newArray)
        setBarColors(new Array(newArray.length).fill('default')); // reset colors to default

        const dynamicSpeed = size <= 20 ? 600 - size * 4 : Math.max(5, 100 - size * 3);
        setSortSpeed(dynamicSpeed);
    }

    const handleSort = (type) => {
        setSelectedAlgo(type)
        sessionStorage.setItem('algo', type)//stores key-value pair..only for current browser/window
    }

    const startSort = async () => {
        setIsSorting(true);
        switch (selectedAlgo) {
            case 'bubble':
                await animateBubbleSort(array, setArray, setBarColors, sortSpeed);
                break;
            case 'selection':
                await animateSelectionSort(array, setArray, setBarColors, sortSpeed);
                break;
            case 'insertion':
                await animateInsertionSort(array, setArray, setBarColors, sortSpeed);
                break;
            case 'merge':
                await animateMergeSort(array, setArray, setBarColors, sortSpeed);
                break;
            case 'heap':
                await animateHeapSort(array, setArray, setBarColors, sortSpeed);
                break;
            default:
                break;
        };
        setIsSorting(false);
    }

    // runs resetarray function when the component mounts
    useEffect(() => {
        resetArray()

        const saved = sessionStorage.getItem('algo')
        if (saved) {
            setSelectedAlgo(saved)
        }
    }, [sliderValue])

    return (
        <div>
            {/* handleSort is passed down as a prop named onSort to Navbar */}
            <Navbar onSort={handleSort} sliderValue={sliderValue} onSliderChange={setSliderValue} isSorting={isSorting} selectedAlgo={selectedAlgo} />
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className='flex items-end justify-center h-[80%] w-full px-4 overflow-x-auto'>
                    {
                        array.map((value, idx) => (
                            <div key={idx} className='mx-[1px] bg-blue-400' style={{ height: `${value}px`, width: `${Math.min(600 / array.length, 20)}px`, backgroundColor: getColor(barColors[idx]), position: 'relative' }}>
                                {/* {value} */}
                            </div>
                        ))
                    }
                </div>

                <div className='mt-6 flex flex-wrap gap-4 justify-center md:justify-start'>
                    <button
                        className='px-5 py-2 text-sm md:text-base text-white rounded-lg font-medium shadow-md transition outline-none focus:outline-none bg-blue-600 hover:bg-blue-700'
                        onClick={resetArray}
                        disabled={isSorting}
                    >
                        Generate New Array
                    </button>

                    <button
                        className='px-5 py-2 text-sm md:text-base text-white rounded-lg font-medium shadow-md transition outline-none focus:outline-none bg-green-600 hover:bg-green-700'
                        onClick={startSort}
                        disabled={isSorting || !selectedAlgo}
                    >
                        Start Sort
                    </button>

                    {selectedAlgo && (
                        <button
                            className='px-5 py-2 text-sm md:text-base text-white rounded-lg font-medium shadow-md transition outline-none focus:outline-none bg-blue-600 hover:bg-blue-700'
                            onClick={() => navigate(`/concept/${selectedAlgo}`)}
                            disabled={isSorting}
                        >
                            Learn The Concept 💡
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SortingVisualizer