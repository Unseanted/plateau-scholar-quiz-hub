import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application, ApplicationDocument } from './schemas/application.schema';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const createdApplication = new this.applicationModel({
      ...createApplicationDto,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdApplication.save();
  }

  async findAll(status?: string): Promise<Application[]> {
    const filter = status ? { status } : {};
    return this.applicationModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    const updatedApplication = await this.applicationModel
      .findByIdAndUpdate(
        id,
        { ...updateApplicationDto, updatedAt: new Date() },
        { new: true }
      )
      .exec();

    if (!updatedApplication) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return updatedApplication;
  }

  async updateStatus(id: string, status: string): Promise<Application> {
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const updatedApplication = await this.applicationModel
      .findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
      )
      .exec();

    if (!updatedApplication) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return updatedApplication;
  }

  async uploadDocument(id: string, file: Express.Multer.File, type: string): Promise<{ url: string }> {
    // In a real application, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll simulate the upload
    const application = await this.findOne(id);
    
    const documentUrl = `https://example.com/uploads/${id}/${type}/${file.originalname}`;
    
    // Update the application with the document URL
    const updateData: any = { updatedAt: new Date() };
    updateData[`${type}Url`] = documentUrl;
    
    await this.applicationModel.findByIdAndUpdate(id, updateData).exec();
    
    return { url: documentUrl };
  }

  async remove(id: string): Promise<void> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }
}