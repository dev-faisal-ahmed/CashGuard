import { Schema, model } from 'mongoose';
import { AgentType } from './agent.interface';

const AgentSchema = new Schema<AgentType>({
  user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
  balance: { type: Number, required: true, default: 0 },
});

export const AgentModel = model('agent', AgentSchema);
