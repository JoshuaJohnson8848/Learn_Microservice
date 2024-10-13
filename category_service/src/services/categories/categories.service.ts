import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    try {
      return await this.prisma.categories.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async getCategoryById(id: number) {
    try {
      return await this.prisma.categories.findUnique({ where: { id: id } });
    } catch (error) {
      console.log(error);
    }
  }

  async createCategory(data: { name: string; desc?: string }) {
    try {
      return await this.prisma.categories.create({
        data: {
          name: data?.name,
          desc: data?.desc,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(id: number, data: { name: string; desc?: string }) {
    try {
      return await this.prisma.categories.update({
        where: { id: id },
        data: {
          name: data?.name,
          desc: data?.desc,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(id: number) {
    try {
      return await this.prisma.categories.delete({where: { id: id}})
    } catch (error) {
      console.log(error);
    }
  }
}
