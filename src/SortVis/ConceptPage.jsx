import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const algoDetails = {
    bubble: {
        name: "Bubble Sort",
        time: "O(n²)",
        space: "O(1)",
        explanation: [
            "Step 1: Compare each pair of adjacent elements.",
            "Step 2: Swap them if they are in the wrong order.",
            "Step 3: Repeat the process for the unsorted portion.",
            "Step 4: Largest elements bubble to the end in each pass.",
            "Step 5: Repeat until no swaps are needed.",
            "Colors Info: Unsorted Pair -> Red, Sorted Pair -> Green, Sorted Element -> Teal."
        ]
    },
    selection: {
        name: "Selection Sort",
        time: "O(n²)",
        space: "O(1)",
        explanation: [
            "Step 1: Start from the beginning of the array.",
            "Step 2: Find the minimum element in the unsorted portion.",
            "Step 3: Swap it with the first unsorted element.",
            "Step 4: Mark the swapped element as sorted.",
            "Step 5: Repeat the process for the remaining unsorted part.",
            "Colors Info: Comparing/moving pointer -> magenta, Current Minimum -> Green, Sorted -> Teal."
        ]
    },
    insertion: {
        name: "Insertion Sort",
        time: "O(n²)",
        space: "O(1)",
        explanation: [
            "Step 1: Assume the first element is already sorted.",
            "Step 2: Pick the next element and compare it with elements in the sorted portion.",
            "Step 3: Shift larger elements one position to the right to make space.",
            "Step 4: Insert the picked element at the correct position.",
            "Step 5: Repeat this process for all elements.",
            "Colors Info: Comparing -> magenta, Incorrect Order -> Red, Inserted/Correct -> Green, Sorted -> Teal."
        ]

    },
    merge: {
        name: "Merge Sort",
        time: "O(n log n)",
        space: "O(n)",
        explanation: [
            "Step 1: Recursively divide the array into halves until each subarray has one element.",
            "Step 2: Start merging two sorted subarrays into one sorted array.",
            "Step 3: During merging, compare elements from both subarrays and copy the smaller one into a temporary array.",
            "Step 4: Continue merging upwards until the whole array is sorted.",
            "Step 5: Final merged array is the fully sorted result.",
            "Colors Info: Comparing Elements -> magenta, Merged Element -> green, Fully Sorted -> Teal."
        ]

    },
    heap: {
        name: "Heap Sort",
        time: "O(n log n)",
        space: "O(1)",
        explanation: [
            "Step 1: Convert the array into a max heap.",
            "Step 2: Swap the first element (maximum) with the last element.",
            "Step 3: Reduce the heap size by one (exclude the last sorted element).",
            "Step 4: Apply heapify to the root to maintain the max heap property.",
            "Step 5: Repeat Steps 2–4 until the array is fully sorted.",
            "Colors Info: Pairs to be Swapped -> Red, Pairs after swapped -> Green, comparisions -> Magenta, Sorted -> Grey."]
    }
}

const ConceptPage = () => {
    const { algo } = useParams()

    const refs = Object.keys(algoDetails).reduce((acc, key) => {
        acc[key] = useRef(null)
        return acc
    }, {})

    useEffect(() => {
        if (algo && refs[algo]?.current) {
            refs[algo].current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [algo])

    return (
        <div className='p-8'>
            {Object.entries(algoDetails).map(([key, details]) => (
                <div key={key} ref={refs[key]} className='mb-12'>
                    <h1 className='text-3xl font-bold mb-4'>{details.name}</h1>
                    <p className='mb-2'><strong>Time Complexity:</strong> {details.time}</p>
                    <p className='mb-2'><strong>Space Complexity:</strong> {details.space}</p>
                    <p><strong>Explanation:</strong></p>
                    <ul className='list-disc pl-6'>
                        {details.explanation.map((step, idx) => {
                            if (step.startsWith("Colors Info:")) {
                                // Step 1: Parse and group by color
                                const colorGroups = {};

                                step
                                    .replace("Colors Info:", "")
                                    .split(",")
                                    .forEach((info) => {
                                        const [labelRaw, colorKeyRaw] = info.split("->");
                                        const label = labelRaw?.trim();
                                        const colorKey = colorKeyRaw?.trim().toLowerCase();

                                        if (!label || !colorKey) return;

                                        if (!colorGroups[colorKey]) {
                                            colorGroups[colorKey] = [];
                                        }

                                        colorGroups[colorKey].push(label);
                                    });

                                // Step 2: Render grouped buttons
                                return (
                                    <div key={idx} className="flex flex-wrap gap-3 mt-4">
                                        {Object.entries(colorGroups).map(([colorKey, labels], i) => {
                                            let bgColor = "#aaa";
                                            switch (colorKey) {
                                                case "red":
                                                    bgColor = "rgb(255, 0, 0)";
                                                    break;
                                                case "green":
                                                    bgColor = "rgb(0, 200, 0)";
                                                    break;
                                                case "teal":
                                                    bgColor = "teal";
                                                    break;
                                                case "grey":
                                                    bgColor = "#6C7C59";
                                                    break;
                                                case "magenta":
                                                    bgColor = "rgb(220, 59, 241)";
                                                    break;
                                            }

                                            return (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 rounded-md text-sm font-medium text-white shadow-md border border-black/10"
                                                    style={{ backgroundColor: bgColor }}
                                                >
                                                    {labels.join(" / ")}
                                                </span>
                                            );
                                        })}
                                    </div>
                                );

                            } else {
                                return <li key={idx}>{step}</li>;
                            }
                        })}
                    </ul>

                </div>
            ))}
        </div>
    )
}

export default ConceptPage
