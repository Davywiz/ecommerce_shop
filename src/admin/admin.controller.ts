import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ProductDto, UpdateProductDto } from './common/dto';
import { AdminGuard } from './common/guards';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get('get-products')
    getAllProduct() {
        return this.adminService.getAllProduct();
    }

    @Get('get-product/:id')
    getProductById(@Param('id', ParseIntPipe) prodId: number,) {
        return this.adminService.getProduct(prodId);
    }

    @Post('add-product')
    addProduct(@Body() dto: ProductDto) {
        return this.adminService.addProduct(dto);
    }

    @Patch('update-product/:id')
    updateProduct(@Body() dto: UpdateProductDto, @Param('id', ParseIntPipe) prodId: number,) {
        return this.adminService.updateProduct(prodId, dto);
    }

    @Delete('delete-product/:id')
    deleteProduct(@Param('id', ParseIntPipe) prodId: number,) {
        return this.adminService.deleteProduct(prodId);
    }
}
