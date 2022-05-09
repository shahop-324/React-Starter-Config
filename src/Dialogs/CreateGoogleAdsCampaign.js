/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import InputBase from '@mui/material/InputBase';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  TextField,
  Autocomplete,
  Button,
  Divider,
  Typography,
  ButtonGroup,
} from '@mui/material';

import MUIStyled from 'styled-components';

const buttons = [
  <Button key="all">All</Button>,
  <Button key="male">Male</Button>,
  <Button key="female">Female</Button>,
];

const MobileBody = MUIStyled.div`
background-color: #cecece;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
height: 400px;
width: 300px;
`;

const MobileGlass = MUIStyled.div`
position: absolute;
left: 36px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
top: 110px;
height: 388px;
width: 276px;
background-color: #FFFFFF;
`;

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Write your ad', 'Add Search Keyword', 'Target Audience', 'Set Location for your ad', 'Set ad Budget'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#cecece', 0.3),
  '&:hover': {
    backgroundColor: alpha('#cecece', 0.4),
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

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const minAgeGap = 1;

const CreateGoogleAdsCampaign = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [text1, setText1] = useState('Part 1');
  const [text2, setText2] = useState('Part 2');
  const [text3, setText3] = useState('Part 3');

  const [description, setDescription] = useState(
    'Ex. A Google Ads description is usually 90 characters and describes your business'
  );


  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(50);

    const [minAge, setMinAge] = useState(10);
    const [maxAge, setMaxAge] = useState(60);

    const handleChangeAgeGroup = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
          }

          if (newValue[1] - newValue[0] < minAgeGap) {
            if (activeThumb === 0) {
              const clamped = Math.min(newValue[0], 100 - minAgeGap);
      
              setMinAge(clamped);
              setMaxAge(clamped + minAgeGap);
            } else {
              const clamped = Math.max(newValue[1], minAgeGap);
              setMinAge(clamped - minAgeGap);
              setMaxAge(clamped);
            }
          } else {
            setMinAge(newValue[0]);
            setMaxAge(newValue[1]);
          }
    }

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);

        setMinRange(clamped);
        setMaxRange(clamped + minDistance);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setMinRange(clamped - minDistance);
        setMaxRange(clamped);
      }
    } else {
      setMinRange(newValue[0]);
      setMaxRange(newValue[1]);
    }
  };

  const [discountCode, setDiscountCode] = useState('');

  const handleNext = () => {
    setActiveStep((prev) => {
      if (prev * 1 <= 3) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevious = () => {
    setActiveStep((prev) => {
      if (prev * 1 >= 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className="pt-4 pb-5">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid className="px-4 mb-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 2fr' },
                }}
              >
                <div>
                  <Stack
                    style={{ border: '1px solid #DDDDDD8F', borderRadius: '10px' }}
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}
                    justifyContent={'Center'}
                    className="mb-4 py-2"
                  >
                    <LightbulbIcon style={{ color: '#BBBE09' }} />
                    <Typography>Your ad will look like this</Typography>
                  </Stack>

                  <MobileBody>
                    <MobileGlass className="py-3 px-1">
                      <div
                        style={{ width: '100%' }}
                        className="d-flex flex-row align-items-center justify-content-center mb-2"
                      >
                        <img
                          src={
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
                          }
                          style={{ height: '20px' }}
                          alt="Google"
                        />
                      </div>

                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                      </Search>
                      <Divider className="my-2" />

                      <Stack direction={'column'} spacing={1} className="px-2">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <Typography variant="subtitle2" className="me-2">
                            Ad.
                          </Typography>
                          <Typography variant="caption">qwikshop.online/uncle-store</Typography>
                        </div>
                        <div style={{ color: '#1351CC' }} className="d-flex flex-row align-items-center mb-2">
                          <Typography>{text1 || 'Part 1'}</Typography> <Typography className="mx-2"> | </Typography>{' '}
                          <Typography>{text2 || 'Part 2'}</Typography> <Typography className="mx-2"> | </Typography>{' '}
                          <Typography>{text3 || 'Part 3'}</Typography>
                        </div>
                        <Typography variant="caption">
                          {description ||
                            'Ex. A Google Ads description is usually 90 characters and describes your business'}
                        </Typography>
                      </Stack>

                      <Divider className="my-2" />
                    </MobileGlass>
                  </MobileBody>
                </div>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}>
                    {(() => {
                      switch (activeStep * 1) {
                        case 0:
                          return (
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                              }}
                            >
                              <TextField
                                name="text1"
                                label="Text 1"
                                fullWidth
                                value={text1}
                                onChange={(e) => {
                                  setText1(e.target.value);
                                }}
                              />

                              <TextField
                                name="text2"
                                label="Text 2"
                                fullWidth
                                value={text2}
                                onChange={(e) => {
                                  setText2(e.target.value);
                                }}
                              />

                              <TextField
                                name="text3"
                                label="Text 3"
                                fullWidth
                                value={text3}
                                onChange={(e) => {
                                  setText3(e.target.value);
                                }}
                              />
                              <Divider />
                              <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                value={description}
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                              />
                            </Box>
                          );

                        case 1:
                          return (
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                              }}
                            >
                              <Typography variant="caption">
                                Enter keyword related to your business by which people will be searching for businesses
                                like your and your products.
                              </Typography>
                              <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                filterSelectedOptions
                                renderInput={(params) => (
                                  <TextField {...params} label="Keywords" placeholder="Keywords" />
                                )}
                              />
                            </Box>
                          );

                        case 2:
                          return (
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                              }}
                            >
                                <Typography variant='subtitle1'>Gender</Typography>
                              <ButtonGroup fullWidth aria-label="small button group">
                                {buttons}
                              </ButtonGroup>

                              <Typography variant='subtitle1'>Age group</Typography>

                              <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={[minAge, maxAge]}
                                onChange={handleChangeAgeGroup}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                              >
                                <TextField
                                  name="minAge"
                                  label="Minimum Age (years)"
                                  fullWidth
                                  value={minAge}
                                  onChange={(e) => {
                                    setMinAge(e.target.value);
                                  }}
                                />
                                <TextField
                                  name="maxAge"
                                  label="Maximum Age (years)"
                                  fullWidth
                                  value={maxAge}
                                  onChange={(e) => {
                                    setMaxAge(e.target.value);
                                  }}
                                />
                              </Box>

                             

                            </Box>
                          );
                        // Gender, Age, Preference

                        case 3:
                          return (
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                              }}
                            >
                              <Typography variant="caption">
                                Enter places where you want to broadcast your app, you can choose places by pincode,
                                colony, city, state, country.
                              </Typography>
                              <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                filterSelectedOptions
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Pincodes, Colony, City, Country"
                                    placeholder="Pincodes, Colony, City, Country"
                                  />
                                )}
                              />
                              <Slider
                                getAriaLabel={() => 'Minimum distance shift'}
                                value={[minRange, maxRange]}
                                onChange={handleChange2}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                              >
                                <TextField
                                  name="minRange"
                                  label="Minimum Range (in KM)"
                                  fullWidth
                                  value={minRange}
                                  onChange={(e) => {
                                    setMinRange(e.target.value);
                                  }}
                                />
                                <TextField
                                  name="maxRange"
                                  label="Maximum Range (in KM)"
                                  fullWidth
                                  value={maxRange}
                                  onChange={(e) => {
                                    setMaxRange(e.target.value);
                                  }}
                                />
                              </Box>
                            </Box>
                          );

                        case 4:
                          return (
                            <Stack direction="column" spacing={4}>
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                }}
                              >
                                  <Typography variant='subtitle2'>Daily Budget (in Rs.)</Typography>
                                <Slider defaultValue={500} min={100} max={3300} valueLabelDisplay="on"  aria-label="Default" />

                                <Typography variant='subtitle2'>Ad duration in days</Typography>
                                <Slider defaultValue={15} min={1} max={180} valueLabelDisplay="on"  aria-label="Default" />
                              </Box>
                              <Card sx={{ p: 3 }}>
                                <Box
                                  sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '3fr 1fr' },
                                  }}
                                >
                                  <TextField
                                    name="discount"
                                    label="Discount Code"
                                    fullWidth
                                    value={discountCode}
                                    onChange={(e) => {
                                      setDiscountCode(e.target.value);
                                    }}
                                  />
                                  <Button size="small">Apply Discount</Button>
                                </Box>
                                <Divider className="my-4" />
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                  <Typography variant="body2">Campaign Charges:</Typography>
                                  <Typography variant="subtitle1">Rs. 435 /-</Typography>
                                </Stack>
                                <Divider className="my-4" />
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                  <Typography variant="body2">Discount:</Typography>
                                  <Typography variant="subtitle1">Rs. 45 /-</Typography>
                                </Stack>

                                <div
                                  style={{ width: '100%', height: '10px', borderBottom: '1px dashed #212121' }}
                                  className="my-4"
                                >
                                  {' '}
                                </div>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                  <Typography variant="h6">Total Payable</Typography>
                                  <Typography variant="subtitle1">Rs. 390 /-</Typography>
                                </Stack>
                              </Card>
                            </Stack>
                          );

                        default:
                          break;
                      }
                    })()}
                  </Card>

                  <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
                    {activeStep * 1 !== 0 && (
                      <Button
                        onClick={() => {
                          handlePrevious();
                        }}
                        variant="outlined"
                      >
                        Previous
                      </Button>
                    )}
                    {activeStep * 1 !== 4 && (
                      <Button
                        onClick={() => {
                          handleNext();
                        }}
                        variant="contained"
                      >
                        Next
                      </Button>
                    )}

                    {activeStep * 1 === 4 && <Button variant="contained">Pay and Launch</Button>}

                    <Button
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default CreateGoogleAdsCampaign;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
