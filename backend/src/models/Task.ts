import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  priority: number;  
  status: 'pending' | 'finished'; 
  user: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },  
    endTime: { type: Date, required: true },    
    priority: { type: Number, required: true, min: 1, max: 5 }, 
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'finished'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);
