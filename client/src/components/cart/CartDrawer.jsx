import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useStore } from '../../contexts/StoreContext';
import { ar } from '../../i18n/ar';
import { formatPrice } from '../../utils/formatCurrency';
import { apiPost } from '../../services/api';

function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateCartQty, clearCart } = useStore();
  const [step, setStep] = useState(1); // 1: Cart Items, 2: Checkout Form
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const totalAmount = cart.reduce((acc, item) => acc + (item.product.currentPrice * item.quantity), 0);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    let newErrors = {};
    const nameTrimmed = formData.fullname.trim();
    if (nameTrimmed.length < 3) newErrors.fullname = 'الاسم قصير جداً (3 حروف على الأقل)';
    if (nameTrimmed.length > 50) newErrors.fullname = 'الاسم طويل جداً (50 حرف كحد أقصى)';
    
    // Arabic phone number pattern or general 9-15 digit phone
    const phoneRegex = /^[0-9+]{9,15}$/;
    const mobileClean = formData.mobile.replace(/\s/g, '');
    if (!phoneRegex.test(mobileClean)) newErrors.mobile = 'رقم الجوال غير صحيح (9-15 رقم)';
    
    const addressTrimmed = formData.address.trim();
    if (addressTrimmed.length < 5) newErrors.address = 'العنوان غير كافٍ (5 حروف على الأقل)';
    if (addressTrimmed.length > 200) newErrors.address = 'العنوان طويل جداً (200 حرف كحد أقصى)';
    
    if (formData.notes.length > 300) newErrors.notes = 'الملاحظات طويلة جداً (300 حرف كحد أقصى)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const sanitizedData = {
        fullname: formData.fullname.trim(),
        mobile: formData.mobile.replace(/[^\d+]/g, ''),
        address: formData.address.trim(),
        notes: formData.notes.trim()
      };

      const orderData = {
        ...sanitizedData,
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.currentPrice
        })),
        totalAmount
      };
      
      await apiPost('/orders', orderData);
      alert('تم إرسال الطلب بنجاح');
      clearCart();
      onClose();
      setStep(1);
      setFormData({ fullname: '', mobile: '', address: '', notes: '' });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">
          {step === 1 ? ar.cart || 'السلة' : 'معلومات التوصيل'}
        </Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      {step === 1 ? (
        <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>السلة فارغة</Typography>
          ) : (
            <List sx={{ pt: 0 }}>
              {cart.map((item) => (
                <Box key={item.product._id}>
                  <ListItem disableGutters>
                    <Box component="img" src={item.product.image} sx={{ width: 60, height: 60, objectFit: 'contain', mr: 2 }} />
                    <ListItemText
                      primary={item.product.name}
                      secondary={`${formatPrice(item.product.currentPrice * item.quantity)} ${ar.currency}`}
                      primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" color="error" onClick={() => removeFromCart(item.product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, mb: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => updateCartQty(item.product._id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size="small" variant="outlined" onClick={() => updateCartQty(item.product._id, item.quantity + 1)}>+</Button>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </List>
          )}
        </Box>
      ) : (
        <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
          <form onSubmit={handleSubmit} id="checkout-form">
            <TextField 
              fullWidth 
              label="الاسم الكامل" 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange} 
              required 
              margin="normal" 
              error={!!errors.fullname}
              helperText={errors.fullname}
              inputProps={{ maxLength: 50 }}
              placeholder="مثال: أحمد محمد"
            />
            <TextField 
              fullWidth 
              label="رقم الجوال" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange} 
              required 
              margin="normal" 
              type="number"
              inputMode="tel"
              error={!!errors.mobile}
              helperText={errors.mobile}
              inputProps={{ maxLength: 15 }}
              placeholder="مثال: 0599000000"
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none',
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              }}
            />
            <TextField 
              fullWidth 
              label="العنوان" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              margin="normal" 
              multiline 
              rows={2} 
              error={!!errors.address}
              helperText={errors.address}
              inputProps={{ maxLength: 200 }}
              placeholder="المدينة، الشارع، المعالم القريبة"
            />
            <TextField 
              fullWidth 
              label="ملاحظات (اختياري)" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              margin="normal" 
              multiline 
              rows={2} 
              error={!!errors.notes}
              helperText={errors.notes}
              inputProps={{ maxLength: 300 }}
            />
          </form>
        </Box>
      )}

      {cart.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">المجموع:</Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">{formatPrice(totalAmount)} {ar.currency}</Typography>
          </Box>
          {step === 1 ? (
            <Button fullWidth variant="contained" size="large" onClick={handleNext} sx={{ borderRadius: '12px' }}>
              متابعة الطلب
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth variant="outlined" size="large" onClick={handleBack} sx={{ borderRadius: '12px' }}>
                رجوع
              </Button>
              <Button fullWidth variant="contained" size="large" type="submit" form="checkout-form" disabled={loading} sx={{ borderRadius: '12px' }}>
                {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  );
}

export default CartDrawer;
