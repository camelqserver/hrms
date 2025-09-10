import React, { useEffect, useState } from 'react';
import { getOrgSettings, saveOrgSettings } from '../../services/settingsService';
import { TextField, Button, Box } from '@mui/material';

export default function OrgSettingForm() {
  const [form, setForm] = useState({
    companyName: '', address: '', workingDays: '', workingHours: '', leavePolicy: '', logoUrl: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getOrgSettings();
        if (res.data) setForm(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveOrgSettings(form);
      alert("Settings saved successfully");
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <TextField fullWidth label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} margin="normal" required />
      <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Working Days" name="workingDays" value={form.workingDays} onChange={handleChange} margin="normal" placeholder="Mon,Tue,Wed..." />
      <TextField fullWidth label="Working Hours" name="workingHours" value={form.workingHours} onChange={handleChange} margin="normal" placeholder="09:00-17:00" />
      <TextField fullWidth label="Leave Policy" name="leavePolicy" value={form.leavePolicy} onChange={handleChange} margin="normal" multiline rows={3} />
      <TextField fullWidth label="Logo URL" name="logoUrl" value={form.logoUrl} onChange={handleChange} margin="normal" />
      <Button type="submit" variant="contained" color="primary">Save Settings</Button>
    </Box>
  );
}
