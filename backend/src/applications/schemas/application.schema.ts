import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  lga: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  matricNumber: string;

  @Prop()
  indigeneFormUrl: string;

  @Prop()
  admissionLetterUrl: string;

  @Prop()
  passportPhotoUrl: string;

  @Prop({ default: 0 })
  quizScore: number;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop()
  academicYear: string;

  @Prop()
  bankName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  accountName: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);