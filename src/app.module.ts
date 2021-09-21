import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';

//import { db } from "../db.const";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppointmentModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      tls: true,
      tlsInsecure: true
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
