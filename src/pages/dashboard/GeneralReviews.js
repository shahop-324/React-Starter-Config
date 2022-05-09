/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  Stack,
  Box,
  Card,
  
  Avatar,
  Button,
  Rating,
  Chip,
  Autocomplete,
  TextField,
  Slide,
  Dialog,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import PinchRoundedIcon from '@mui/icons-material/PinchRounded';
import RemoveRedEyeRounded from '@mui/icons-material/RemoveRedEyeRounded';
import AutoFixNormalRoundedIcon from '@mui/icons-material/AutoFixNormalRounded';
import PushPinIcon from '@mui/icons-material/PushPin';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import { fetchReviews, updateReview } from '../../actions';
import Iconify from '../../components/Iconify';
import { fDateTime } from '../../utils/formatTime';
import MenuPopover from '../../components/MenuPopover';
import NoReview from '../../assets/segmented-bar-graph.png'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const GeneralReviews = () => {
  const dispatch = useDispatch();

  const { reviews } = useSelector((state) => state.review);

  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(fetchReviews(term));
  }, [term]);

  return (
    <>
      <Stack sx={{ px: 4 }} direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
        {' '}
        <Typography variant="h6">Reviews</Typography>
        <Stack direction={'row'} alignItems="center" spacing={2}>
          <Autocomplete
            onChange={(e, value) => {
              console.log(value);
              setTerm(value?.label);
            }}
            size="small"
            disablePortal
            id="customer-review-filter"
            options={filterOptions}
            // getOptionLabel={(item) => item.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Review Filter" />}
          />
        </Stack>
      </Stack>

      {!(typeof reviews !== 'undefined' && reviews.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoReview} alt="no reviews" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  Your store hasn't got any reviews, sell products and ask for reviews
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
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                {reviews.slice(0)
                  .reverse().map((item) => (
                  <ReviewItem key={item._id} item={item} />
                ))}
              </Box>
            </Stack>

            )}

     
    </>
  );
};

export default GeneralReviews;

function ReviewItem({ item }) {
  const theme = useTheme();

  const {
    _id,
    rating,
    customer,
    product,
    comment,
    images,
    videos,
    foundHelpful,
    foundNotHelpful,
    featured,
    pinned,
    hidden,
    accepted,
    createdAt,
    tags,
    audited,
  } = item;

  const { store } = useSelector((state) => state.store);

  const dispatch = useDispatch();

  const [openVideo, setOpenVideo] = useState(false);

  const [src, setSrc] = useState(false);

  const handleCloseVideo = () => {
    setOpenVideo(false);
  };

  const handleOpenVideo = (src) => {
    setSrc(src);
    setOpenVideo(true);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const onAddToFeatured = () => {
    dispatch(updateReview({ featured: true }, _id, () => {}));
  };
  const onRemoveFromFeatured = () => {
    dispatch(updateReview({ featured: false }, _id, () => {}));
  };
  const onPin = () => {
    dispatch(updateReview({ pinned: true }, _id, () => {}));
  };
  const onUnpin = () => {
    dispatch(updateReview({ pinned: false }, _id, () => {}));
  };
  const onHide = () => {
    dispatch(updateReview({ hidden: true }, _id, () => {}));
  };
  const onShow = () => {
    dispatch(updateReview({ hidden: false }, _id, () => {}));
  };


  return (
    <Stack spacing={2} sx={{ minHeight: 402, width: '100%', position: 'relative', p: 3 }}>
      <Stack spacing={2} direction="row" alignItems={'center'} justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Avatar
            sx={{ mr: 2 }}
            alt={customer.name}
            src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${customer.image}`}
          />
          <div>
            <Typography variant="subtitle2">{customer.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
              Posted {fDateTime(createdAt)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
              <CheckCircleRoundedIcon sx={{ mr: 1, fontSize: '15px' }} color={'success'} /> Verified Purchase
            </Typography>
          </div>
        </Stack>
        <ReviewMoreMenu
          accepted={accepted}
          featured={featured}
          pinned={pinned}
          hidden={hidden}
          onAddToFeatured={onAddToFeatured}
          onRemoveFromFeatured={onRemoveFromFeatured}
          onPin={onPin}
          onUnpin={onUnpin}
          onShow={onShow}
          onHide={onHide}
        />
      </Stack>

      <Rating value={rating} size="small" readOnly precision={0.5} />
      <Typography variant="body2">{comment}</Typography>

      <Stack direction="row" flexWrap="wrap">
        {tags !== undefined &&
          tags.length > 0 &&
          tags.map((tag) => <Chip size="small" key={tag} label={tag} sx={{ mr: 1, mb: 1, color: 'text.secondary' }} />)}
      </Stack>

      <Link style={{ textDecoration: 'none' }} to={`${`//qwikshop.online/${store.subName}/product/${product._id}`}`}>
        <Typography color={'primary'} variant="subtitle2">
          {product.productName}
        </Typography>
      </Link>

      <Stack direction={'row'} alignItems="center" spacing={2}>
        {pinned && (
          <Chip sx={{ width: 'max-content' }} variant="outlined" icon={<PushPinIcon />} color="info" label="Pinned" />
        )}
        {featured && <Chip sx={{ width: 'max-content' }} variant="outlined" color="secondary" label="Featured" />}
        {hidden && (
          <Chip
            sx={{ width: 'max-content' }}
            variant="outlined"
            icon={<VisibilityOffIcon />}
            color="error"
            label="Hidden"
          />
        )}
      </Stack>

      <Stack direction={'row'} flexWrap={'wrap'}>
        {images.map((el, index) => (
          <div
            onClick={() => {
              openImageViewer(index);
            }}
          >
            <img
              key={el}
              className="me-1 mb-1"
              src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`}
              style={{ height: '70px' }}
              alt="product review"
            />
          </div>
        ))}
        {videos.map((el) => (
          <div
            key={el}
            onClick={() => {
              handleOpenVideo(`https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`);
            }}
          >
            <video
              src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`}
              style={{ height: '70px', width: '70px' }}
            />
          </div>
        ))}
        {/* {isViewerOpen && (
          <ImageViewer
            src={images.map((el) => `https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`)}
            currentIndex={currentImage}
            disableScroll
            backgroundStyle={{
              backgroundColor: '#50505091',
            }}
            closeOnClickOutside
            onClose={closeImageViewer}
          />
        )} */}
      </Stack>

      <Stack direction={'row'} alignItems="center" spacing={2}>
        <Tooltip title="Found Useful">
          <Chip variant="filled" icon={<ThumbUpIcon />} label={foundHelpful?.length} />
        </Tooltip>

        <Tooltip title="Found Not Useful">
          <Chip variant="filled" icon={<ThumbDownAltIcon />} label={foundNotHelpful?.length} />
        </Tooltip>
      </Stack>

      {!accepted && audited && (
        <Chip
          color="error"
          sx={{ my: 1 }}
          variant="outlined"
          icon={<NotInterestedRoundedIcon />}
          label={'This Review has been rejected'}
        />
      )}

      {!(accepted && audited) && (
        <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => {
              dispatch(updateReview({ accepted: true }, _id, () => {}));
            }}
            fullWidth
            variant="contained"
            endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
          >
            Accept
          </Button>
          <Button
            // disabled={!accepted}
            onClick={() => {
              dispatch(updateReview({ accepted: false }, _id, () => {}));
            }}
            fullWidth
            variant="contained"
            color="error"
            endIcon={<Iconify icon={'eva:close-circle-fill'} />}
          >
            Reject
          </Button>
        </Stack>
      )}

      {isViewerOpen && (
        <Dialog
          width={'400px'}
          maxWidth={'md'}
          open={isViewerOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setIsViewerOpen(false);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <Card sx={{ p: 3 }}>
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={currentImage}
                onChangeIndex={setCurrentImage}
                enableMouseEvents
              >
                {images
                  .map((el) => ({ imgPath: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`, label: '' }))
                  .map((step, index) => (
                    <div key={step.label}>
                      {Math.abs(currentImage - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={step.imgPath}
                          alt={step.label}
                        />
                      ) : null}
                    </div>
                  ))}
              </AutoPlaySwipeableViews>
            </Box>
          </Card>
        </Dialog>
      )}

      {openVideo && (
        <Dialog
          width={'400px'}
          maxWidth={'md'}
          open={openVideo}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseVideo}
          aria-describedby="alert-dialog-slide-description"
        >
          <Card sx={{ p: 3 }}>
            <video autoPlay controls src={src} style={{ width: '400px' }} />
          </Card>
        </Dialog>
      )}
    </Stack>
  );
}

function ReviewMoreMenu({
  featured,
  pinned,
  hidden,
  accepted,
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
        {!hidden ? (
          <MenuItem disabled={!accepted} onClick={onHide}>
            <VisibilityOffIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Hide
          </MenuItem>
        ) : (
          <MenuItem disabled={!accepted} onClick={onShow}>
            <RemoveRedEyeRounded icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Show
          </MenuItem>
        )}

        {!featured ? (
          <MenuItem disabled={!accepted} onClick={onAddToFeatured}>
            <AutoFixHighRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Add to Featured
          </MenuItem>
        ) : (
          <MenuItem disabled={!accepted} onClick={onRemoveFromFeatured}>
            <AutoFixNormalRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Remove From Featured
          </MenuItem>
        )}

        {!pinned ? (
          <MenuItem disabled={!accepted} onClick={onPin}>
            <PushPinIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Pin
          </MenuItem>
        ) : (
          <MenuItem disabled={!accepted} onClick={onUnpin}>
            <PinchRoundedIcon icon={'eva:edit-fill'} sx={{ ...ICON }} />
            Unpin
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}

const filterOptions = [
  { label: 'Accepted' },
  { label: 'Rejected' },
  { label: 'Hidden' },
  { label: 'Pinned' },
  { label: 'Featured' },
];
