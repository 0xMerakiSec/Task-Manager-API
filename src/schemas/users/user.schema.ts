import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.schema';
export type UserDocument = HydratedDocument<User>;
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password; // Removes password from the returned object
      delete ret.access_token;
      return ret;
    },
  },
})
export class User {
  @Prop()
  id: string;
  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, enum: Object.values(Role), default: Role.USER })
  role: Role;

  @Prop({ required: false })
  access_token: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
  async comparePassword(password: string): Promise<boolean> {
    if (!this.password || !password) return false;
    return await bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
//Database level unique indexing
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

//Password hashing
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
  } catch (error) {
    next(error as Error);
  }
});

//Compare password
UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};
