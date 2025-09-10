import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button
} from '@mui/material';
import PayslipForm from '../components/PayslipForm';
import PayslipList from '../components/PayslipList';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

const PayslipPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar */}
        <Box sx={{ width: 240 }}>
          <HRSidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
          <Container maxWidth="100%">
            <Typography variant="h4" gutterBottom>
              Payslip Generation
            </Typography>

            {/* Generate Payslip Button */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Generate Payslip
            </Button>

            {/* Popup Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle>Generate Payslip</DialogTitle>
              <DialogContent>
                <PayslipForm onClose={handleClose} />
              </DialogContent>
            </Dialog>

            <Divider sx={{ my: 4 }} />

            {/* Payslip List */}
            <PayslipList />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PayslipPage;
