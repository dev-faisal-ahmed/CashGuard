import { Schema, model } from 'mongoose';
import { AgentType } from './agent.interface';
import { UserRoleConstants } from '../user.constant';

const AgentSchema = new Schema<AgentType>({
  user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
  role: { type: String, enum: [UserRoleConstants.AGENT], required: true },
  balance: { type: Number, required: true, default: 0 },
});

export const AgentModel = model('agent', AgentSchema);
