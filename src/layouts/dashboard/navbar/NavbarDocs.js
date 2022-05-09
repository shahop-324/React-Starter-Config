// @mui
import { WhatsApp } from '@mui/icons-material';
import { Stack, Button, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <img
        src="https://media.istockphoto.com/photos/shopping-cart-with-different-food-products-picture-id1306977522?b=1&k=20&m=1306977522&s=170667a&w=0&h=aCpJcpOWb3U3O6Vh5algE6PNNbgGZUocUo4tRJ3iOKQ="
        alt="cart"
        style={{ height: '200px' }}
      />

      <div>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Send us your feedback
          <br /> 
        </Typography>
      </div>

      <Button startIcon={<WhatsApp />} href={`https://wa.me/+916265081928`} target="_blank" rel="noopener" variant="contained">
        Feedback
      </Button>
    </Stack>
  );
}
