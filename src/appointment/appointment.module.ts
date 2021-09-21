import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { MongooseModule } from "@nestjs/mongoose";

import { AppointmentSchema } from './schema/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Appointment', schema: AppointmentSchema}
    ]),
  ],
  controllers: [
    AppointmentController,
  ],
  providers: [
    AppointmentService,
  ]
})
export class AppointmentModule {}
