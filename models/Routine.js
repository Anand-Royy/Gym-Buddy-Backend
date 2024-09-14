import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true],
  },
  workoutName: {
    type: String,
    required: [true, 'Please provide workout name'],
    maxlength: 50,
    minlength: 3,
  },
  sets: {
    type: String,
    required: [true, 'Please provide the sets count'],
  },
  reps: {
    type: String,
    required: [true, 'Please provide the reps count'],
  },
});

const RoutineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true],
  },
  exercises: [WorkoutSchema],
  routineName: {
    type: String,
    required: [true, 'Please provide the routine '],
  },
});

export default mongoose.model('Routine', RoutineSchema);
