import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ['Delhi', 'Bangalore', 'Pune', 'Kolkata'],
  },
  {
    filterType: "Industry",
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: "Salary",
    array: ['0-40k', '42k-1lac', '1lac to 5lac'],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='font-semibold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h2 className='font-bold text-lg'>{data.filterType}</h2>
              {
                data.array.map((item, itemIndex) => {
                  const uniqueId = `${data.filterType}-${item}`; // Unique ID for each radio button
                  return (
                    <div key={uniqueId} className='flex items-center space-x-2 m-2'>
                      <RadioGroupItem id={uniqueId} value={item} />
                      <label htmlFor={uniqueId}>{item}</label>
                    </div>
                  );
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
