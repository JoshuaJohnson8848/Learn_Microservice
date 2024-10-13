import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductsDto, UpdateProductsDto } from './products.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly _productService: ProductsService, @Inject('CATEGORY_SERVICE') private readonly categoryClient: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductsDto) {
    try {
      const result = await this._productService.createProduct(createProductDto);
      if (!result) {
        throw new HttpException('Product not created', HttpStatus.CONFLICT);
      }

      return {
        status: true,
        data: result,
        message: "Product Created Successfully"

      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getProducts() {
    try {
      const result = await this._productService.getProducts();

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    try {
      let categoryResult: any;
      let category: any;

      const result = await this._productService.getProductById(Number(id));

      if (!result) {
        throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
      }

      if(result){
        categoryResult = await firstValueFrom(this.categoryClient.send('get_category', { id: Number(result?.category_id)}))
      }
      console.log({...result, category: categoryResult?.data?.name});
      return {
        status: true,
        data: {...result, category: categoryResult?.data?.name},
        message: "Product Fetched Successfully"
      };
      
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const result = await this._productService.deleteProduct(Number(id));
      if (!result) {
        throw new HttpException('Product Not Deleted', HttpStatus.EXPECTATION_FAILED);
      }
      return {
        status: true,
        data: result,
        message: "Product Deleted Successfully"
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductsDto) {
    try {
      const result = await this._productService.updateProduct(Number(id), updateProductDto);
      if (!result) {
        throw new HttpException('Product not updated', HttpStatus.CONFLICT);
      }

      return {
        status: true,
        data: result,
        message: "Product Updated Successfully"
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
