/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import '../../index.css';

// @mui
import { Box, Card, Grid, Dialog, Typography, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Grocery = ({ open, handleClose }) => {
 

  const columns = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      editable: false,
      renderCell: (params) => <img src={params.value} alt="product" />,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: false,
      renderCell: (params) => <Typography variant="subtitle1">{params.value}</Typography>,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 200,
      editable: false,
    },
    {
      field: 'unitQuantity',
      headerName: 'Quantity',
      width: 100,
      editable: false,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 100,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      editable: true,
      renderCell: (params) => <Typography variant="subtitle1">Rs. {params.value}</Typography>,
    },
  ];

  const rows = [
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i73783',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&w=1000&q=80',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i3663',
      image: 'https://i02.appmifile.com/363_operator_in/13/10/2020/c7bde508f128d7b1fd10a224d18a5333.png',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i23i8383',
      image:
        'https://media.wired.com/photos/60149f34056378f4af9cf9f1/191:100/w_2580,c_limit/Gear-Topo-Athletic-Ultraventure-Pro.jpg',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2ihj3y332d',
      image:
        'https://media.istockphoto.com/photos/fashion-white-sneakers-in-neon-light-sport-shoes-for-training-in-the-picture-id1301394040?b=1&k=20&m=1301394040&s=170667a&w=0&h=DM2FyLVbwZ-YjZeb5P8d45RgF2x_gTmT8kC66u7zIrk=',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
    {
      id: '289298-3heji72hj2-22i72hj8282h2y-2h2i2j1hy2',
      image: 'https://image.cnbcfm.com/api/v1/image/105680013-1547583426762nike1.jpg?v=1547583682&w=1600&h=900',
      name: 'Nike Adapt BB, Navy',
      brand: 'Nike',
      unitQuantity: 1,
      unit: 'Piece',
      price: 4599,
    },
  ];





  

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="xl" open={open}>
        <Stack
          className="py-3"
          sx={{ width: '100%' }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack className="px-4" direction="row" spacing={3}>
            <Typography variant="h6">Footwear</Typography>
          </Stack>

          <Stack className="px-4" direction="row" spacing={3}>
            <Button variant="contained">Add Products</Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </Stack>
        </Stack>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, position: 'relative' }}>
              <div className="row">
                <div className="col-sm-2" id="spy">
                  <div id="list-example" className="list-group">
                    <a className="list-group-item list-group-item-action active" href="#list-item-1">
                      Puma
                    </a>
                    <a className="list-group-item list-group-item-action" href="#list-item-2">
                      Nike
                    </a>
                    <a className="list-group-item list-group-item-action" href="#list-item-3">
                      Woodland
                    </a>
                    <a className="list-group-item list-group-item-action" href="#list-item-4">
                      Skechers
                    </a>
                  </div>
                </div>
                <div className="col-sm-10 scrollspy-example" data-spy="scroll" data-target="#list-example">
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#list-example"
                    data-bs-offset={0}
                    className="scrollspy-example"
                    tabIndex={0}
                  >
                    <Typography id="list-item-1" variant="subtitle1">
                      Puma (18)
                    </Typography>
                    <DataGrid rowHeight={100} checkboxSelection rows={rows} columns={columns} />
                    <Typography id="list-item-2" variant="subtitle1">
                      Nike (20)
                    </Typography>
                    <DataGrid rowHeight={100} checkboxSelection rows={rows} columns={columns} />
                    <Typography id="list-item-3" variant="subtitle1">
                      Woodland (32)
                    </Typography>
                    <DataGrid rowHeight={100} checkboxSelection rows={rows} columns={columns} />
                    <Typography id="list-item-4" variant="subtitle1">
                      Skechers (24)
                    </Typography>
                    <DataGrid rowHeight={100} checkboxSelection rows={rows} columns={columns} />
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default Grocery;
