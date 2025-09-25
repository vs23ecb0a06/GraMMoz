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
  subject: String,
  active: Boolean,
  students: Number,
  userId: String,
});
const Classroom = mongoose.model('Classroom', classroomSchema);

await Menu.deleteMany({});
await Classroom.deleteMany({});

console.log('All menu and classroom data cleared!');
process.exit();
