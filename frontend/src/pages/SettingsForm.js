import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '../../services/appSettingService';
import {
  Box, TextField, FormControlLabel, Switch, Button, MenuItem, Typography
} from '@mui/material';

const timeZones = ['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London'];
const languages = ['en', 'hi', 'es', 'fr'];
const themes = ['light', 'dark'];

export default function SettingsForm() {
  const [settings, setSettings] = useState({
    timeZone: '',
    language: '',
    notificationsEnabled: true,
    theme: ''
  });

  useEffect(() => {
    getSettings().then(res => setSettings(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings(settings);
    alert("Settings updated successfully");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h6">App Settings</Typography>

      <TextField
        select
        fullWidth
        margin="normal"
        label="Time Zone"
        name="timeZone"
        value={settings.timeZone}
        onChange={handleChange}
      >
        {timeZones.map(zone => (
          <MenuItem key={zone} value={zone}>{zone}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        label="Language"
        name="language"
        value={settings.language}
        onChange={handleChange}
      >
        {languages.map(lang => (
          <MenuItem key={lang} value={lang}>{lang}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        label="Theme"
        name="theme"
        value={settings.theme}
        onChange={handleChange}
      >
        {themes.map(theme => (
          <MenuItem key={theme} value={theme}>{theme}</MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Switch
            checked={settings.notificationsEnabled}
            onChange={handleChange}
            name="notificationsEnabled"
          />
        }
        label="Enable Notifications"
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save Settings
      </Button>
    </Box>
  );
}
