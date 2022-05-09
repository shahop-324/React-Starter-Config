/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, Box, InputBase, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import dateFormat from 'dateformat';
import SelectPageBuilder from './Dialog/SelectPageBuilder';
import { getStorePages } from '../../../actions';
import QuillPageBuilder from './Dialog/QuillPageBuilder';
import DnDPageBuilder from './Dialog/DnDPageBuilder';
import DeletePage from './Dialog/DeletePage';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#cecece', 0.3),
  '&:hover': {
    backgroundColor: alpha('#cececc', 0.4),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StorePages = () => {
  const dispatch = useDispatch();

  const { pages } = useSelector((state) => state.page);
  const {store} = useSelector((state) => state.store);

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(getStorePages(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [openAdd, setOpenAdd] = useState(false);

  const [openQuill, setOpenQuill] = useState(false);
  const [openDnD, setOpenDnD] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [id, setId] = useState('');

  const handleOpenQuill = () => {
    setOpenQuill(true);
  };
  const handleOpenDnD = () => {
    setOpenDnD(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseQuill = () => {
    setOpenQuill(false);
  };
  const handleCloseDnD = () => {
    setOpenDnD(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const columns = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 400,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
      editable: false,
      renderCell: (params) => <Chip label={params.value} color="success" sx={{ fontWeight: 500, color: '#ffffff' }} />,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      editable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <a target="_blank" rel="noreferrer" href={`//qwikshop.online/${store.subName}/pages/${params.row.slug}`}>
            <IconButton color="primary">
              <RemoveRedEyeRoundedIcon />
            </IconButton>
            </a>
           
            <IconButton
              onClick={() => {
                setId(params.id);
                if (params.row.type === 'dnd' ? handleOpenDnD() : handleOpenQuill());
              }}
              color="warning"
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setId(params.id);
                handleOpenDelete();
              }}
              color="error"
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const rows = pages.map((el) => ({
    id: el._id,
    title: el.name,
    status: 'Live',
    date: dateFormat(new Date(el.createdAt), 'dd, mm dS, yy, h:MM TT'),
    type: el.type,
    slug: el.slug,
  }));

  // const rows = [
  //   { id: '28292-shjj-272892', title: 'Privacy Policy', status: 'Live', date: '21st, Jan 2022, 06:56:12 AM' },
  // ];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="pe-4 mb-4">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Search>
        <Button onClick={handleOpenAdd} variant="contained">
          Add New Page
        </Button>
      </Stack>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
      {openAdd && <SelectPageBuilder open={openAdd} handleClose={handleCloseAdd} />}
      {openQuill && <QuillPageBuilder open={openQuill} handleClose={handleCloseQuill} isEdit id={id} />}
      {openDnD && <DnDPageBuilder open={openDnD} handleClose={handleCloseDnD} isEdit id={id} />}
      {openDelete && <DeletePage open={openDelete} handleClose={handleCloseDelete} id={id} />}
    </>
  );
};

export default StorePages;
