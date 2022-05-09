/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  Box,
  Avatar,
  TextField,
  Autocomplete,
  Button,
  Chip,
  MenuItem,
  IconButton,
  Card
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PushPinIcon from '@mui/icons-material/PushPin';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import PinchRoundedIcon from '@mui/icons-material/PinchRounded';
import RemoveRedEyeRounded from '@mui/icons-material/RemoveRedEyeRounded';
import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
import { fDateTime } from '../../utils/formatTime';
import { fetchQuestions, updateQuestion } from '../../actions';
import NoQuestion from '../../assets/chatting.png';
// routes
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import DeleteQuestion from '../../Dialogs/Question/DeleteQuestion';

// ----------------------------------------------------------------------

QuestionMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  productName: PropTypes.string,
};

const GeneralQuestions = () => {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(fetchQuestions(term));
  }, [term]);

  const { questions } = useSelector((state) => state.question);

  const [id, setId] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Stack sx={{ px: 4 }} direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
        <Typography variant="h6">Customer Questions</Typography>
        <Stack direction={'row'} alignItems="center" spacing={2}>
          <Autocomplete
            onChange={(e, value) => {
              console.log(value);
              setTerm(value?.label);
            }}
            // value={term}
            size="small"
            disablePortal
            id="customer-question-filter"
            options={filterOptions}
            // getOptionLabel={(item) => item.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Question Filter" />}
          />
        </Stack>
      </Stack>

      {!(typeof questions !== 'undefined' && questions.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoQuestion} alt="no questions" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  No one has asked any questions on your products
                </Typography>
              </Stack>
            ) : (




      <Stack direction="row" sx={{ px: 4 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            width: '100%',
            // gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {questions.slice(0)
                  .reverse().map((item) => (
            <QuestionItem
              onDelete={() => {
                setId(item._id);
                setOpenDelete(true);
              }}
              key={item.id}
              item={item}
            />
          ))}
        </Box>
      </Stack>
            )}
      {openDelete && <DeleteQuestion open={openDelete} handleClose={handleCloseDelete} id={id} />}
    </>
  );
};

export default GeneralQuestions;

function QuestionItem({ item, onDelete }) {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);

  const {
    _id,
    foundHelpful,
    foundNotHelpful,
    customer,
    product,
    question,
    createdAt,
    pinned,
    featured,
    hidden,
  } = item;

  const [answer, setAnswer] = useState(item.answer);

  const onAddToFeatured = () => {
    dispatch(updateQuestion({ featured: true }, _id, () => {}));
  };
  const onRemoveFromFeatured = () => {
    dispatch(updateQuestion({ featured: false }, _id, () => {}));
  };
  const onPin = () => {
    dispatch(updateQuestion({ pinned: true }, _id, () => {}));
  };
  const onUnpin = () => {
    dispatch(updateQuestion({ pinned: false }, _id, () => {}));
  };
  const onHide = () => {
    dispatch(updateQuestion({ hidden: true }, _id, () => {}));
  };
  const onShow = () => {
    dispatch(updateQuestion({ hidden: false }, _id, () => {}));
  };

  return (
    <Stack spacing={2} sx={{ minHeight: 150, width: '100%', position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems={'center'} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={customer.name} src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${customer.image}`} />
          <div>
            <Typography variant="subtitle2">{customer.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
              Posted {fDateTime(createdAt)}
            </Typography>
          </div>

          {pinned && <Chip variant="outlined" icon={<PushPinIcon />} color="info" label="Pinned" />}
          {featured && <Chip variant="outlined" color="secondary" label="Featured" />}
          {hidden && <Chip variant="outlined" icon={<VisibilityOffIcon />} color="error" label="Hidden" />}
        </Stack>
        <QuestionMoreMenu
          featured={featured}
          pinned={pinned}
          hidden={hidden}
          onAddToFeatured={onAddToFeatured}
          onRemoveFromFeatured={onRemoveFromFeatured}
          onPin={onPin}
          onUnpin={onUnpin}
          onShow={onShow}
          onHide={onHide}
          onDelete={onDelete}
        />
      </Stack>

      <Typography variant="body2">{question}</Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, mb: 2 }}>
        Answer
      </Typography>

      <TextField
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        placeholder="Your Answer"
        fullWidth
        type="text"
        variant="filled"
        multiline
      />

      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems="center" spacing={2}>
          <Chip variant="filled" icon={<ThumbUpIcon />} label={foundHelpful?.length} />
          <Chip variant="filled" icon={<ThumbDownAltIcon />} label={foundNotHelpful?.length} />
        </Stack>
        <Button
          onClick={() => {
            dispatch(updateQuestion({ answer }, _id, () => {}));
          }}
          disabled={!answer || item.answer === answer}
          size="small"
          variant="outlined"
        >
          Submit
        </Button>
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, mb: 2 }}>
        Product
      </Typography>

      <Link style={{ textDecoration: 'none' }} to={`${`//qwikshop.online/${store.subName}/product/${product._id}`}`}>
        <Chip
          onClick={() => {}}
          sx={{ width: 'max-content' }}
          color={'primary'}
          variant={'outlined'}
          label={product.productName}
        />
      </Link>
    </Stack>
  );
}


function QuestionMoreMenu({
  featured,
  pinned,
  hidden,
  onDelete,
  onAddToFeatured,
  onRemoveFromFeatured,
  onPin,
  onUnpin,
  onHide,
  onShow,
}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 230,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
        {!hidden ? (
          <MenuItem onClick={onHide}>
            <VisibilityOffIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Hide
          </MenuItem>
        ) : (
          <MenuItem onClick={onShow}>
            <RemoveRedEyeRounded icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Show
          </MenuItem>
        )}

        {!featured ? (
          <MenuItem onClick={onAddToFeatured}>
            <AutoFixHighRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Add to Featured
          </MenuItem>
        ) : (
          <MenuItem onClick={onRemoveFromFeatured}>
            <AutoFixNormalRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Remove From Featured
          </MenuItem>
        )}

        {!pinned ? (
          <MenuItem onClick={onPin}>
            <PushPinIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Pin
          </MenuItem>
        ) : (
          <MenuItem onClick={onUnpin}>
            <PinchRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Unpin
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}


const filterOptions = [
  { label: 'Answered' },
  { label: 'Unanswered' },
  { label: 'Hidden' },
  { label: 'Pinned' },
  { label: 'Featured' },
];