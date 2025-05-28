import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ default: 'student' })
  role: 'admin' | 'manager' | 'viewer' | 'student';

  @Prop()
  googleId?: string;

  @Prop({ default: 'active' })
  status: 'active' | 'inactive' | 'suspended';

  @Prop()
  registrationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);