import Select from 'react-select';
import { products } from '../utils/products';
import React, { useState, useEffect } from 'react';

const options = [
    { value: "sofa", label: "Sofa" },
    { value: "chair", label: "Chair" },
    { value: "watch", label: "Watch" },
    { value: "mobile", label: "Mobile" },
    { value: "wireless", label: "Wireless" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
            backgroundColor: "#0f3460",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList, loc, selectedOption, setSelectedOption }) => {


    const uniquePincodes = new Set(loc.map(entry => entry.pincode));
    const pincodes = Array.from(uniquePincodes).map(pincode => ({ value: pincode, label: pincode }));
    
    // Displaying pincodes
    console.log(pincodes, 'pin');
    const options = [
        { value: 'all', label: 'All' }, // Add this line for "All" option
        ...pincodes,
      ];

    // Handle option change
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        // Access the selected option value here
        console.log('Selected Pincode:', selectedOption.value);
        // Perform any other actions based on the selected value
    };
    return (
        <Select
            options={options}
            placeholder="Filter By Pincode"
            // defaultValue={{ value: "", label: "Filter By Location" }}
            // styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
