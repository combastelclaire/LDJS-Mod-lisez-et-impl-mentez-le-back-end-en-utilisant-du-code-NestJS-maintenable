import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateRentalDto } from './create-rental.dto.js';
import { RentalsService } from './rentals.service.js';
import { UpdateRentalDto } from './update-rental.dto.js';

interface RequestWithUser extends Request {
  user: { id: number; email: string };
}

const multerStorage = diskStorage({
  destination: `${process.cwd()}/uploads`,
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    cb(null, unique);
  },
});

const imageFilter = (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images au format JPEG, PNG et WebP sont acceptées'), false);
  }
};

@ApiBearerAuth()
@ApiTags('Rentals')
@UseGuards(JwtAuthGuard)
@Controller('api/rentals')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Appartement Poitiers' },
        surface: { type: 'number', example: 70 },
        price: { type: 'number', example: 800 },
        description: { type: 'string', example: 'Appartement traversant au coeur de Poitiers' },
        picture: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('picture', { storage: multerStorage, fileFilter: imageFilter }))
  create(
    @Body() dto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: RequestWithUser,
  ) {
    const pictureUrl = file ? `http://localhost:3001/uploads/${file.filename}` : '';
    return this.rentalsService.create(dto, req.user.id, pictureUrl);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('picture', { storage: multerStorage, fileFilter: imageFilter }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRentalDto, @Request() req: RequestWithUser) {
    return this.rentalsService.update(id, dto, req.user.id);
  }
}
