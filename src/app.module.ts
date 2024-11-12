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
    // CacheModule.registerAsync(RedisOptions),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore as unknown as CacheStore,
    //   url: process.env.REDIS_URL,
    // }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const redisUrl = process.env.REDIS_URL;
        const store = await redisStore({
          socket: {
            // tls: (redisUrl.match(/rediss:/) != null),
            // rejectUnauthorized: false,
            // host: process.env.REDIS_HOST,
            // port: parseInt(process.env.REDIS_PORT),
          }
        });

        return {
          url: redisUrl,
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      },
    }),
    // CacheModule.register({
    //   isGlobal: true,
    // }),
    UsersModule,
    AuthModule,
    StoragesModule,
    PlacesModule,
  ],
  controllers: [],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor,
  //   },
  // ],
})
export class AppModule { }
