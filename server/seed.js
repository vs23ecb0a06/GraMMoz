import mongoose from 'mongoose';

await mongoose.connect('mongodb://localhost:27017/gramozdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const menuSchema = new mongoose.Schema({
  icon: String,
  label: String,
  href: String,
});
const Menu = mongoose.model('Menu', menuSchema);

const classroomSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  students: Number,
  userId: String,
});
const Classroom = mongoose.model('Classroom', classroomSchema);

// Insert mock menu items
await Menu.deleteMany({});
await Menu.insertMany([
  { icon: 'Home', label: 'Dashboard', href: '/' },
  { icon: 'Bell', label: 'Notifications', href: '/notifications' },
  { icon: 'MessageSquare', label: 'Chat', href: '/chat' },
  { icon: 'Settings', label: 'Settings', href: '/settings' },
]);

// Insert mock classrooms
await Classroom.deleteMany({});
await Classroom.insertMany([
  { name: 'Math 101', active: true, students: 28, userId: 'demo-user' },
  { name: 'Physics', active: true, students: 25, userId: 'demo-user' },
  { name: 'Comp Sci', active: false, students: 35, userId: 'demo-user' },
]);

console.log('Mock data inserted!');
process.exit();
