import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    console.log(file);

    const newProduct = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      image: file.filename,
    });
    return this.productRepository.save(newProduct);
  }

  async findAll() {
    const cachedProducts = await this.cacheManager.get('products');
    console.log('hello ' + cachedProducts);

    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.productRepository.find();
    await this.cacheManager.set('products', products);
    return products;
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.findOne(id);
    if (!product) {
      return `Product with id ${id} not found`;
    }

    const updatedProduct = {
      ...product,
      ...updateProductDto,
      image: file ? file.filename : product.image,
    };

    await this.productRepository.update(id, updatedProduct);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      return `Product with id ${id} not found`;
    }
    return this.productRepository
      .createQueryBuilder()
      .softDelete()
      .where('id=:id', { id: id })
      .execute();
  }
}
