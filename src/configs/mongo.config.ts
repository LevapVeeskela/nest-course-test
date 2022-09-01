import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose/dist/typegoose-options.interface';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions()
    };
};

const getMongoString = (configService: ConfigService) =>
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASWWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
    // useNewUrlParser: true, // устарели в mongoose 6+ по умолчанию в true
    // useCreateIndex: true,
    // useUnifiedTopology: true
});