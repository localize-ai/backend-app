import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoragesModule } from './modules/storages/storages.module';
import { PlacesModule } from './modules/places/places.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          ttl: 24 * 60 * 60000,
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            tls: true,
            rejectUnauthorized: false,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 24 * 60 * 60000,
        };
      },
    }),

    UsersModule,
    AuthModule,
    StoragesModule,
    PlacesModule,
  ],
  controllers: [],
})
export class AppModule { }
