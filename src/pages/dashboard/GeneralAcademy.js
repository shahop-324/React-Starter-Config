/* eslint-disable react/jsx-key */
import React from 'react';
import { Stack, Typography, Card, CardActionArea, CardMedia, CardContent, Box } from '@mui/material';

const GeneralAcademy = () => (
    <>
      <Stack direction="row" sx={{ px: 4, mb: 4 }}>
        {' '}
        <Typography variant="h6">Academy</Typography>
      </Stack>

      <Stack direction="row" sx={{ px: 4 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {videos.map((el) => <Card
              onClick={() => {
                //
              }}
              sx={{ width: '100%' }}
            >
              <CardActionArea>
                <CardMedia component="img" height="240" image={el.image} alt={el.label} />
                <CardContent>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <Typography gutterBottom variant="subtitle2" component="div">
                      {el.label}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>)}
        </Box>
      </Stack>
    </>
  );

export default GeneralAcademy;

const videos = [
  {
    label: 'How to Setup Delivery?',
    image: 'https://brings.co.in/wp-content/uploads/2020/11/hello1.png',
    index: '123',
  },
  {
    label: 'How to Connect Instagram?',
    image: 'https://jumpseller.com/images/learn/instagram-shopping/instagram-shopping.png',
    index: '123',
  },
  {
    label: 'How to Connect WhatsApp?',
    image: 'https://i.insider.com/5f57ecb17ed0ee001e25e112?width=1136&format=jpeg',
    index: '123',
  },
  {
    label: 'How to Setup UPI?',
    image: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/09/07/994953-947635-upi-transactions-india.jpg',
    index: '123',
  },
  {
    label: 'How to Offer Discount?',
    image: 'https://www.marketing91.com/wp-content/uploads/2020/03/Factors-affecting-Sales-discount.jpg',
    index: '123',
  },
  {
    label: 'How to Process Orders?',
    image: 'https://www.gannett-cdn.com/-mm-/b6d84c079eeddce9de2b2e2be1944ad2472390ff/c=0-112-2119-1304/local/-/media/2020/03/27/USATODAY/usatsports/online-shopping-getty.jpg',
    index: '123',
  },
  {
    label: 'How to Marketing?',
    image: 'https://mouseflow.com/wp-content/uploads/2019/04/ecommerce-strategies.jpg',
    index: '123',
  },
  {
    label: 'How to Promote using Google & Facebook?',
    image: 'https://i.pinimg.com/originals/ef/cf/6d/efcf6ddcc09ed52beb9a5e8384a960b0.png',
    index: '123',
  },
  
];
