import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) {
  }

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('byProduct/:productId')
  async get(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteDoc = this.reviewService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deleteDoc;
  }
}
