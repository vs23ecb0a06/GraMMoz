const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// POST route to create an announcement
app.post('/api/classrooms/:id/announcements', upload.single('file'), async (req, res) => {
  const text = req.body?.text;
  const userId = req.body?.userId;
  const file = req.file;
  const classroomId = req.params.id;
  if (!text || !userId) return res.status(400).json({ error: 'Missing text or userId' });

  // Save announcement with file path if uploaded
  const announcement = {
    text,
    userId,
    classroomId,
    createdAt: new Date(),
    filePath: file ? file.path : null,
    deleted: false,
    status: 'Published',
  };

  // Save to DB (replace with your DB logic)
  // For example:
  // await AnnouncementModel.create(announcement);

  res.status(200).json({ success: true, announcement });
});

// ...existing code for other routes and middleware

module.exports = app;