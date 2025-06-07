import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    // In a real application, you would upload to cloud storage
    // For development, we'll simulate the upload
    const uploadDir = path.join(process.cwd(), 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Write file to disk
    fs.writeFileSync(filePath, file.buffer);
    
    // Return the URL (in production, this would be a cloud storage URL)
    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';
    return `${baseUrl}/uploads/${fileName}`;
  }
}