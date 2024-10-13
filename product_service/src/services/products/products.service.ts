import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
    return await this.prisma.products.findMany();
  }

  async getProductById(id: number) {
    return await this.prisma.products.findUnique({ where: { id: id } });
  }

  async createProduct(data: { title: string; price: number; desc?: string; category: number }) {
    try {
      return await this.prisma.products.create({
        data: {
          title: data.title,
          price: data.price,
          desc: data.desc,
          category_id: data.category
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(
    id: number,
    data: { title: string; price: number; desc?: string; category: number },
  ) {
    return await this.prisma.products.update({
      where: { id: id },
      data: {
        title: data.title,
        price: data.price,
        desc: data.desc,
        category_id: data.category
      },
    });
  }

  async deleteProduct(id: number) {
    return await this.prisma.products.delete({ where: { id: id } });
  }
  
}
