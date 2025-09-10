import React, { useEffect, useState } from 'react';
import { getNotices, createNotice, deleteNotice } from '../services/noticeService';
import { TextField, Button, Typography, Paper, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', createdBy: '' });

  const fetchData = async () => {
    const res = await getNotices();
    setNotices(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNotice(form);
    setForm({ title: '', message: '', createdBy: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteNotice(id);
    fetchData();
  };

  return (
    <Paper style={{ padding: 20, margin: 20 }}>
      <Typography variant="h5">Notice Board</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <TextField label="Title" fullWidth margin="normal" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <TextField label="Message" fullWidth margin="normal" multiline rows={4} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <TextField label="Created By" fullWidth margin="normal" value={form.createdBy}
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })} />
        <Button type="submit" variant="contained" color="primary">Post Notice</Button>
      </form>

      <List>
        {notices.map((notice) => (
          <ListItem key={notice.id} divider>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{notice.title}</Typography>
              <Typography>{notice.message}</Typography>
              <Typography variant="caption">Posted by {notice.createdBy} on {notice.date}</Typography>
            </div>
            <IconButton onClick={() => handleDelete(notice.id)}><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NoticeBoard;
