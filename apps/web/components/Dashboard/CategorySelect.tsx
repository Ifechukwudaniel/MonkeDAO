'use client';

import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

const categories = [
  {
    name: 'Travel',
    sub: [{ name: 'Flights' }, { name: 'Hotels' }, { name: 'Crypto Events' }],
  },
  {
    name: 'Experiences',
    sub: [{ name: 'Concerts' }, { name: 'Festivals' }, { name: 'Workshops' }],
  },
  {
    name: 'Digital Goods',
    sub: [
      { name: 'Software Licenses' },
      { name: 'Gaming Items' },
      { name: 'Subscriptions' },
    ],
  },
];

export const CategorySelect = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelected(event.target.value);
  };

  return (
    <FormControl fullWidth className="font-inter">
      <InputLabel
        id="deal-category-label"
        className="text-gray-600 font-medium"
      >
        Category
      </InputLabel>

      <Select
        labelId="deal-category-label"
        id="deal-category"
        value={selected}
        label="Category"
        onChange={handleChange}
        className="rounded-xl text-gray-800 font-medium border border-gray-300 focus:border-green-500 focus:ring-0"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d1d5db',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#42B81A',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#42B81A',
            borderWidth: '2px',
          },
        }}
        MenuProps={{
          PaperProps: {
            className: 'rounded-xl border border-gray-200 shadow-md font-inter',
          },
        }}
      >
        {categories.map((category) => [
          <ListSubheader
            key={category.name}
            className="!text-gray-500 !text-sm !font-semibold !bg-gray-50"
          >
            {category.name}
          </ListSubheader>,
          category.sub.map((sub) => (
            <MenuItem
              key={sub.name}
              value={sub.name}
              className="text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
            >
              {sub.name}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
};
