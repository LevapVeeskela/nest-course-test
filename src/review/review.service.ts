import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { DeleteResult } from 'mongodb';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
    public get reviewModel(): ModelType<ReviewModel> {
        return this._reviewModel;
    }
    constructor(
        @InjectModel(ReviewModel)
        private readonly _reviewModel: ModelType<ReviewModel>,
    ) { }

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(
        productId: string,
    ): Promise<DocumentType<ReviewModel>[]> {
        return this.reviewModel
            .find({ productId: new Types.ObjectId(productId) })
            .exec();
    }

    async deleteByProductId(productId: string): Promise<DeleteResult> {
        return this.reviewModel
            .deleteMany({ productId: new Types.ObjectId(productId) })
            .exec();
    }
}
