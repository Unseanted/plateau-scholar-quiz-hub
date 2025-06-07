import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scholarship application' })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all applications (admin only)' })
  findAll(@Query('status') status?: string) {
    return this.applicationsService.findAll(status);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application by ID' })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application' })
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update application status' })
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.applicationsService.updateStatus(id, body.status);
  }

  @Post(':id/documents')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload application document' })
  uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { type: string }
  ) {
    return this.applicationsService.uploadDocument(id, file, body.type);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete application' })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}