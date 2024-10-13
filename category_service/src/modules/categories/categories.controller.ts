import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from 'src/services/categories/categories.service';
import { CreateCategoriesDto, UpdateCategoriesDto } from './categories.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly _categoryService: CategoriesService) {}

  @Get()
  async getCategories() {
    try {
      const result = await this._categoryService.getCategories();

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: string) {
    try {
      const result = await this._categoryService.getCategoryById(Number(id));

      if (!result) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @MessagePattern('get_category')
  async getCategoryByIdRPC(@Payload() data: { id: number }) {
    try {
      const result = await this._categoryService.getCategoryById(
        Number(data.id),
      );

      if (!result) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createCatgeory(@Body() createCategoryDto: CreateCategoriesDto) {
    try {
      const result =
        await this._categoryService.createCategory(createCategoryDto);

      if (!result) {
        throw new HttpException('Category not created', HttpStatus.CONFLICT);
      }

      return {
        status: true,
        data: result,
        message: 'Product created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  async updateCatgeory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoriesDto,
  ) {
    try {
      const result = await this._categoryService.updateCategory(
        Number(id),
        updateCategoryDto,
      );

      if (!result) {
        throw new HttpException('Category not updated', HttpStatus.CONFLICT);
      }

      return {
        status: true,
        data: result,
        message: 'Product updated successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteCatgeory(@Param('id') id: string) {
    try {
      const result = await this._categoryService.deleteCategory(Number(id));

      if (!result) {
        throw new HttpException('Category not deleted', HttpStatus.CONFLICT);
      }

      return {
        status: true,
        data: result,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
