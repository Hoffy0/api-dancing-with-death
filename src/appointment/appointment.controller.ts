import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';

import { CreateAppointmentDTO } from "./DTO/appointment.dto";

import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {

    constructor(
        private appointmentService: AppointmentService
    ){ }

    @Post('/add')
    async addAppointment(@Res() res, @Body() createAppointmentDTO: CreateAppointmentDTO ){
        try {
            console.log(createAppointmentDTO);
            const appointment =  await this.appointmentService.addAppointment(createAppointmentDTO)
            return res.status(HttpStatus.OK).json({
            message: 'Appointment scheduled',
            appointment: appointment
        });
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: "402",
                Error: err
            });
        }
    }
}
