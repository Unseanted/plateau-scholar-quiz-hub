import { IsEmail, IsString, IsEnum, IsDateString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty({ enum: ['male', 'female', 'other'] })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty()
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  lga: string;

  @ApiProperty()
  @IsString()
  institution: string;

  @ApiProperty()
  @IsString()
  course: string;

  @ApiProperty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsString()
  matricNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  indigeneFormUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  admissionLetterUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  passportPhotoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  quizScore?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  academicYear?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accountName?: string;
}