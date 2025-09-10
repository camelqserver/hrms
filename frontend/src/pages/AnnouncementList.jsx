import React, { useEffect, useState } from 'react';
import { getAnnouncements } from '../services/announcementService';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Announcements
      </Typography>

      {announcements.map((ann) => (
        <Card key={ann.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{ann.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              {ann.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              | For: {ann.role}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {announcements.length === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No announcements available.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
