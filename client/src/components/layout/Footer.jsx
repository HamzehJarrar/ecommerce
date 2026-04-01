import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Apple as AppleIcon,
  Android as AndroidIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0989FF',
        color: 'white',
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              MegaMart
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              {t.footer.contactUs}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">support@megamart.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body2">+1 202 918 2132</Typography>
            </Box>
          </Grid>

          {/* Most Popular Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t.footer.mostPopularCategories}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.staples}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.beverages}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.personalCare}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.homeCare}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.babyCare}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.vegetablesFruits}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.snacksFoods}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.dairyBakery}
              </Link>
            </Box>
          </Grid>

          {/* Customer Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t.footer.customerServices}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.aboutUs}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.termsConditions}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.faq}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.privacyPolicy}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.ewastePolicy}
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                {t.footer.cancellationReturn}
              </Link>
            </Box>
          </Grid>

          {/* Download App */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t.footer.downloadApp}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  p: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <AppleIcon sx={{ fontSize: '2rem', mr: 1.5 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {t.footer.downloadOn}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {t.footer.appStore}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  p: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <AndroidIcon sx={{ fontSize: '2rem', mr: 1.5 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {t.footer.getItOn}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {t.footer.googlePlay}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {currentYear} {t.footer.allRightsReserved}. Reliance Retail Ltd.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
