import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRentalDto } from './create-rental.dto.js';
import { UpdateRentalDto } from './update-rental.dto.js';

const ownerSelect = {
  id: true,
  name: true,
  email: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const rentals = await this.prisma.rental.findMany({
      include: { owner: { select: ownerSelect } },
    });
    return {
      rentals: rentals.map((r) => ({
        ...r,
        surface: Number(r.surface),
        price: Number(r.price),
      })),
    };
  }

  async findOne(id: number) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: { owner: { select: ownerSelect } },
    });
    if (!rental) throw new NotFoundException('Location introuvable');
    return { ...rental, surface: Number(rental.surface), price: Number(rental.price) };
  }

  async create(dto: CreateRentalDto, ownerId: number, pictureUrl: string) {
    await this.prisma.rental.create({
      data: {
        name: dto.name,
        surface: dto.surface,
        price: dto.price,
        description: dto.description,
        owner_id: ownerId,
        picture: pictureUrl,
      },
    });
    return { message: 'Location créée!' };
  }

  async update(id: number, dto: UpdateRentalDto, userId: number) {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    if (!rental) throw new NotFoundException('Location introuvable');
    if (rental.owner_id !== userId) throw new ForbiddenException('Accès refusé');
    await this.prisma.rental.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.surface && { surface: dto.surface }),
        ...(dto.price && { price: dto.price }),
        ...(dto.description && { description: dto.description }),
      },
    });
    return { message: 'Location modifiée!' };
  }
}
