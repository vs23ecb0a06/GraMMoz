import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: path.join(process.cwd(), 'uploads/') });

mongoose.connect('mongodb://localhost:27017/gramozdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const menuSchema = new mongoose.Schema({
  icon: String,
  label: String,
  href: String,
});
const Menu = mongoose.model('Menu', menuSchema);

const classroomSchema = new mongoose.Schema({
  name: String,
  subject: String,
  active: Boolean,
  students: Number,
  userId: String, // creator
  members: [String], // userIds of joined members
  inviteCode: String // unique code for invite link
});
const Classroom = mongoose.model('Classroom', classroomSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const announcementSchema = new mongoose.Schema({
  classroomId: String,
  userId: String,
  authorName: String,
  title: String,
  text: String,
  filePath: String,
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Announcement = mongoose.model('Announcement', announcementSchema);

const chatMessageSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// API routes
app.get('/api/menu', async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

app.get('/api/classrooms', async (req, res) => {
  const userId = req.query.userId || 'demo-user';
  const classrooms = await Classroom.find({
    $or: [
      { userId },
      { members: userId }
    ]
  });
  res.json(classrooms);
});

app.get('/api/dashboard', async (req, res) => {
  const userId = req.query.userId || 'demo-user';
  const classrooms = await Classroom.find({ userId });
  const activeClassrooms = classrooms.filter(c => c.active).length;
  const totalClassrooms = classrooms.length;
  const totalStudents = classrooms.reduce((sum, c) => sum + (c.students || 0), 0);
  res.json({ activeClassrooms, totalClassrooms, totalStudents });
});
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ ok: true, message: 'Backend is reachable!' });
});
app.post('/api/classrooms', async (req, res) => {
  console.log('POST /api/classrooms called');
  console.log('Request body:', req.body);
  try {
    const { name, subject, active, students, userId } = req.body;
    if (!name || !subject || !userId) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const classroom = new Classroom({ name, subject, active, students, userId });
    await classroom.save();
    console.log('Classroom created:', classroom);
    res.status(200).json(classroom);
  } catch (err) {
    console.error('Error creating classroom:', err);
    res.status(500).json({ message: 'Error creating classroom', error: err.message });
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash });
  await user.save();
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '7d' });
  res.json({ token });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '7d' });
  res.json({ token });
});

app.get('/api/user', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ message: 'Missing userId' });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      name: user.name,
      email: user.email,
      profilePic: user.profilePic || ""
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

app.get('/api/classrooms/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classroom', error: err.message });
  }
});

app.get('/api/classrooms/:id/announcements', async (req, res) => {
  const classroomId = req.params.id;
  const announcements = await Announcement.find({ classroomId, deleted: false }).sort({ createdAt: -1 });
  res.json(announcements);
});

app.post('/api/classrooms/:id/announcements', upload.single('file'), async (req, res) => {
  const classroomId = req.params.id;
  const title = req.body?.title;
  const text = req.body?.text;
  const userId = req.body?.userId;
  const file = req.file;
  if (!title || !text || !userId) return res.status(400).json({ message: 'Missing title, text or userId' });
  const user = await User.findById(userId);
  const announcement = new Announcement({
    classroomId,
    userId,
    authorName: user ? user.name : 'Unknown',
    title,
    text,
    filePath: file ? file.path : undefined,
  });
  await announcement.save();
  res.json(announcement);
});

app.delete('/api/classrooms/:id/announcements/:announcementId', async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.announcementId);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting announcement', error: err.message });
  }
});

app.put('/api/classrooms/:id/announcements/:announcementId', upload.single('file'), async (req, res) => {
  try {
    const update = {};
    if (req.body.title !== undefined) update.title = req.body.title;
    if (req.body.text !== undefined) update.text = req.body.text;
    if (req.file) update.filePath = req.file.path;
    if (req.body.deleted !== undefined) update.deleted = req.body.deleted;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      update,
      { new: true }
    );
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: 'Error updating announcement', error: err.message });
  }
});

// Generate invite link for classroom
app.post('/api/classrooms/:id/invite', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    // Generate a unique invite code if not present
    if (!classroom.inviteCode) {
      classroom.inviteCode = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      await classroom.save();
    }
    res.json({ inviteLink: `http://localhost:3000/join/${classroom.inviteCode}` });
  } catch (err) {
    res.status(500).json({ message: 'Error generating invite link', error: err.message });
  }
});

// Join classroom using invite code
app.post('/api/classrooms/join/:inviteCode', async (req, res) => {
  try {
    const { userId } = req.body;
    const classroom = await Classroom.findOne({ inviteCode: req.params.inviteCode });
    if (!classroom) return res.status(404).json({ message: 'Invalid invite code' });
    if (!classroom.members.includes(userId)) {
      classroom.members.push(userId);
      await classroom.save();
    }
    res.json({ message: 'Joined classroom', classroom });
  } catch (err) {
    res.status(500).json({ message: 'Error joining classroom', error: err.message });
  }
});

// Get all chat messages
app.get('/api/chat', async (req, res) => {
  const messages = await ChatMessage.find().sort({ createdAt: 1 });
  res.json(messages);
});

// Post a new chat message
app.post('/api/chat', async (req, res) => {
  const { userId, userName, text } = req.body;
  if (!userId || !text) return res.status(400).json({ message: 'Missing userId or text' });
  const message = new ChatMessage({ userId, userName, text });
  await message.save();
  res.json(message);
});

app.listen(4000, () => {
  console.log('GraMoz backend running on port 4000');
});
