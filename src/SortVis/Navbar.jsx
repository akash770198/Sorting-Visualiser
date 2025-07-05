import React from 'react';

const Navbar = ({ onSort, sliderValue, onSliderChange, isSorting, selectedAlgo }) => {
    return (
        <div className="w-full bg-[#bae1ff] p-4">
            <div className="flex flex-col md:flex-row items-center justify-between">

                {/* Algo Buttons */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                    {['merge', 'heap', 'bubble', 'selection', 'insertion'].map((algo) => (
                        <button
                            key={algo}
                            onClick={() => onSort(algo)}
                            className={`px-5 py-2 text-sm md:text-base text-white rounded-lg font-medium shadow-md transition focus:outline-none
                                ${selectedAlgo === algo
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {algo.charAt(0).toUpperCase() + algo.slice(1)} Sort
                        </button>
                    ))}
                </div>

                {/* Slider bar */}
                <div className="mt-6 md:mt-0 md:ml-20 flex items-center gap-3">
                    <label className="text-blue-800 font-bold whitespace-nowrap">Size & Speed:</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        disabled={isSorting}
                        value={sliderValue}
                        onChange={(e) => onSliderChange(Number(e.target.value))}
                        className="w-40 cursor-pointer"
                    />
                    <span className="text-blue-800 font-bold">{sliderValue}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
