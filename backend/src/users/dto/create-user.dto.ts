import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: ['admin', 'manager', 'viewer', 'student'] })
  @IsEnum(['admin', 'manager', 'viewer', 'student'])
  @IsOptional()
  role?: 'admin' | 'manager' | 'viewer' | 'student';
}