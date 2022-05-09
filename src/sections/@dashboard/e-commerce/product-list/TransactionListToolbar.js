/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import { alpha, useTheme, styled } from '@mui/material/styles';
import { Toolbar, Typography } from '@mui/material';
// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import CsvDownload from 'react-json-to-csv';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#9C9C9C', 0.15),
  '&:hover': {
    backgroundColor: alpha('#9C9C9C', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

TransactionListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const allowed = ['order', 'name', 'amount', 'customer', 'status', 'createdAt'];

export default function TransactionListToolbar({ numSelected, setTerm }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const { transactions } = useSelector((state) => state.transaction);
  const { store } = useSelector((state) => state.store);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
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
      )}

      <div className="d-flex flex-row align-items-center justify-content-end">
        {/* <Button variant="contained" onClick={() => {handleExportTransactions();}} startIcon={<FileDownloadRoundedIcon />}>
          Export
        </Button> */}
        <CsvDownload
          data={transactions.map((el) =>
            Object.keys(el)
              .filter((key) => allowed.includes(key))
              .reduce((obj, key) => {
                obj[key] = el[key];
                return obj;
              }, {})
          )}
          filename={`products_list_${store.storeName}.csv`}
          style={{
            boxShadow: 'inset 0px 1px 0px 0px #00AB55',
            background: 'linear-gradient(to bottom, #00AB55 5%, #13C06A 100%)',
            backgroundColor: '#08BD62',
            borderRadius: '6px',
            border: '1px solid #00AB55',
            display: 'inline-block',
            cursor: 'pointer',
            color: '#ffffff',
            fontSize: '15px',
            fontWeight: 'bold',
            padding: '6px 24px',
            textDecoration: 'none',
            textShadow: '0px 1px 0px #0C8F4D',
          }}
        >
          Export
        </CsvDownload>
      </div>
    </RootStyle>
  );
}
