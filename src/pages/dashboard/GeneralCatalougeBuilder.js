/* eslint-disable react/jsx-key */
import React, { useState } from 'react';

import {  Typography, Card, CardActionArea, Box, Chip } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grocery from '../../Dialogs/CatalougeBuilder/Grocery';

const GeneralCatalougeBuilder = () => {
  

  const [openGrocery, setOpenGrocery] = useState(false);

  const handleOpenGrocery = () => {
    setOpenGrocery(true);
  };

  const handleCloseGrocery = () => {
    setOpenGrocery(false);
  };

  const handleClick = (label) => {
    switch (label) {
      case 'Grocery':
        handleOpenGrocery();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Typography variant="h5" className="mb-4">
        Select Category
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {categoriesList.map((el) => (
          <Card
            onClick={() => {
              handleClick(el.label);
            }}
            sx={{ width: '100%' }}
          >
            <CardActionArea>
              <CardMedia component="img" height="240" image={el.image} alt={el.label} />
              <CardContent>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Typography gutterBottom variant="h5" component="div">
                    {el.label}
                  </Typography>

                  <Chip label={`${el.quantity} Items`} variant="outlined" />
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {openGrocery && <Grocery open={openGrocery} handleClose={handleCloseGrocery} />}
    </>
  );
};

export default GeneralCatalougeBuilder;

const categoriesList = [
  {
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211213-wee-groceries-se-405p-a36212.jpg',
    label: 'Grocery',
    quantity: 3000,
  },
  { image: 'https://scitechdaily.com/images/Fruits-and-Vegetables.jpg', label: 'Fruits & Vegetables', quantity: 5500 },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS55PgyN6YWsWcRmN42qDic2QV3gYxRxwGCIA&usqp=CAU',
    label: 'Meat & Fish',
    quantity: 35,
  },
  {
    image:
      'https://assets.architecturaldigest.in/photos/60084fd13829163dc3ab540b/16:9/w_2560%2Cc_limit/Mumbai-bakery-breads-1366x768.jpg',
    label: 'Bakery items',
    quantity: 3929,
  },
  {
    image: 'https://cdn.downtoearth.org.in/library/large/2019-03-05/0.89399200_1551782137_fast1.jpg',
    label: 'Fast Food',
    quantity: 6222,
  },
  {
    image: 'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2022/1/11/north-indian-cuisine.jpg',
    label: 'Indian Food',
    quantity: 35,
  },
  {
    image:
      'https://images.squarespace-cdn.com/content/v1/51cc49bce4b0b242fc8c48a5/1491849782078-W5MQIQCGPPMXT1K764H6/shakes.jpg?format=2500w',
    label: 'Drinks & Shakes',
    quantity: 35,
  },
  {
    image: 'https://static.toiimg.com/photo/87304656.cms',
    label: 'Indian sweets',
    quantity: 35,
  },
  {
    image:
      'https://media.istockphoto.com/photos/christmas-baking-table-scene-with-assorted-sweets-and-cookies-top-a-picture-id1185515984?k=20&m=1185515984&s=612x612&w=0&h=wLZ8NlNrZWtwlgUv-n2mQtj7eC4oXFVGm7xN9_dYIsU=',
    label: 'Deserts',
    quantity: 35,
  },
  {
    image: 'https://static.onecms.io/wp-content/uploads/sites/23/2021/01/05/box-of-chocolates-guide-2000.jpg',
    label: 'Chocolate',
    quantity: 35,
  },
  {
    image:
      'https://static.independent.co.uk/2021/02/18/15/tall%20clothing%20brands.jpg?width=982&height=726&auto=webp&quality=75',
    label: "Women's clothing",
    quantity: 35,
  },
  {
    image:
      'https://www.meijer.com/content/dam/meijer/departments/clothing-&-jewelry/2021_tier-1_imagery/2021_winter_mens_tier-1/D-sub2_mens_20211205-1x1.jpg',
    label: "Men's clothing",
    quantity: 35,
  },
  {
    image:
      'https://media.istockphoto.com/photos/fun-happy-baby-boy-to-wash-clothes-and-laughs-in-laundry-picture-id667135196?k=20&m=667135196&s=612x612&w=0&h=WWXk24nrTCBRnkfDMhwH2NRJfMq09nLyieY6Mmfr4kY=',
    label: 'Baby clothing',
    quantity: 35,
  },
  {
    image:
      'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/cosmetics/cosmeticsdesign-europe.com/headlines/regulation-safety/counterfeit-cosmetic-products-can-be-fought-with-digital-technology-says-snapdragon/10939933-1-eng-GB/Counterfeit-cosmetic-products-can-be-fought-with-digital-technology-says-SnapDragon_wrbm_large.jpg',
    label: 'Cosmetic & Beauty',
    quantity: 35,
  },
  {
    image: 'https://femina.wwmindia.com/content/2020/sep/home-appliances.jpg',
    label: 'Electronic Appliances',
    quantity: 35,
  },
  {
    image: 'https://i.insider.com/5fd299219cf1420018d2ea78?width=750&format=jpeg&auto=webp',
    label: 'Electronic Gadgets',
    quantity: 35,
  },
  {
    image: 'https://i.pinimg.com/564x/e0/02/4d/e0024d6d7692f2df98e6db924fd8a52d.jpg',
    label: 'Sports & Fitness',
    quantity: 35,
  },
  {
    image: 'https://wakefit-co.s3.ap-south-1.amazonaws.com/img/product-thumbnails/napper-furniture.jpg',
    label: 'Furniture',
    quantity: 35,
  },
  {
    image: 'https://cdn.citymapia.com/kottayam/anna-woods/17370/Portfolio.jpg?biz=2950',
    label: 'Home Decor',
    quantity: 35,
  },
  {
    image: 'https://www.moneylife.in/media/uploads/article/responsive/medicine329.jpg',
    label: 'Medicine',
    quantity: 35,
  },
  {
    image:
      'https://sugermint.com/wp-content/uploads/2020/01/Patanjali-Ayurved-Herbal-Products-Manufacturer-in-India.jpg',
    label: 'Patanjali',
    quantity: 35,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifvOimf5mZd2qsExIZQDuJYw9noyXHAU4_A&usqp=CAU',
    label: 'Paints',
    quantity: 35,
  },
  {
    image: 'https://wallnut.co.in/wp-content/uploads/2020/12/Tiles-Design.png',
    label: 'Tiles',
    quantity: 35,
  },
  {
    image: 'https://4.imimg.com/data4/WD/NH/MY-3782428/ceramic-sanitary-ware-250x250.jpg',
    label: 'Sanitary ware',
    quantity: 35,
  },
  {
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/run-under-armour-sneakers-1622075237.jpg?crop=1xw:0.9998800095992321xh;center,top&resize=1200:*',
    label: 'Footwear',
    quantity: 35,
  },
  {
    image: 'https://5.imimg.com/data5/GV/NI/MY-6348933/travel-bags-1-500x500.jpg',
    label: 'Travel Essentials',
    quantity: 35,
  },
  {
    image: 'https://www.thestatesman.com/wp-content/uploads/2017/12/accessories.jpg',
    label: 'Fashion accessories',
    quantity: 35,
  },
  {
    image: 'https://c1.wallpaperflare.com/preview/771/100/852/fabric-cloth-textile-clothing.jpg',
    label: 'Garments',
    quantity: 35,
  },
  {
    image: 'https://5.imimg.com/data5/YL/RI/OR/SELLER-95604177/stationeries-500x500-png-500x500.png',
    label: 'Stationary',
    quantity: 35,
  },
  {
    image: 'https://www.kindpng.com/picc/m/160-1606870_personal-care-products-png-transparent-png.png',
    label: 'Personal care',
    quantity: 35,
  },
  {
    image:
      'https://media.istockphoto.com/photos/accessories-for-cat-and-dog-on-blue-background-pet-care-and-training-picture-id1248454290?k=20&m=1248454290&s=612x612&w=0&h=Ajti5uiVqrJ4Ll66-1JS3qfSwSwvSHBAK-dOyJDj8Ow=',
    label: 'Pet Supplies',
    quantity: 35,
  },
  {
    image: 'https://5.imimg.com/data5/MM/ZW/WC/SELLER-31008867/birthday-gift-hamper-jpg-500x500.jpg',
    label: 'Gifts',
    quantity: 35,
  },
  {
    image:
      'https://specials-images.forbesimg.com/imageserve/608990c4bcf2c7b4802c9725/Indoor-plants/960x0.jpg?fit=scale',
    label: 'Plants',
    quantity: 35,
  },
  {
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/refresh-best-small-watches-40mm-lead-1631124066.jpg?crop=1.00xw:0.892xh;0,0.0523xh&resize=1200:*',
    label: 'Watch',
    quantity: 35,
  },
  {
    image:
      'https://ik.imagekit.io/bfrs/tr:w-auto,h-auto,pr-true,c-at_max:cm-pad_extract,w-auto,h-auto/image_kkmotors/data/Lights--Electronics1.jpg',
    label: 'Car & Bike Accessories',
    quantity: 35,
  },
  {
    image: 'https://inhabitat.com/wp-content/blogs.dir/1/files/2016/01/modern-energy-efficient-light-bulbs.jpg',
    label: 'Electronic items',
    quantity: 35,
  },
  {
    image: 'https://cairowestmag.com/wp-content/uploads/2020/07/SummerHomeEssentials_Indoor_numbers.jpg',
    label: 'Home essentials',
    quantity: 35,
  },
  {
    image: 'https://vaya.in/wp-content/uploads/2021/06/10-Kitchen-Essentials-You-Need-To-Have.jpg',
    label: 'Kitchen essentials',
    quantity: 35,
  },
  {
    image:
      'https://img.etimg.com/thumb/msid-88313048,width-1200,height-900/industry/cons-products/food/new-pli-scheme-to-benefit-domestic-dairy-sector-icra.jpg',
    label: 'Dairy Products',
    quantity: 35,
  },
  {
    image:
      'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/snacks-in-america.jpg?quality=82&strip=all&w=1200',
    label: 'Snacks',
    quantity: 35,
  },
];
