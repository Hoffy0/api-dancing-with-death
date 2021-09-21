import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { MongooseModule } from "@nestjs/mongoose";

import { db } from "../db.const";

@Module({
  imports: [
    AppointmentModule,
    MongooseModule.forRoot(db.uri),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
