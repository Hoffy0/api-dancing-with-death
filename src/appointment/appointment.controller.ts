import { Controller, Get, Post, Put, Delete, Res, Body, Param, HttpStatus, NotFoundException } from '@nestjs/common';

import { CreateAppointmentDTO } from "./DTO/appointment.dto";

import { AppointmentService } from './appointment.service';
import { startSession } from 'mongoose';

@Controller('appointment')
export class AppointmentController {

    constructor(
        private appointmentService: AppointmentService
    ){ }
    
    /***************** CREATE *****************/
    @Post('/add')
    async addAppointment(@Res() res, @Body() createAppointmentDTO: CreateAppointmentDTO ){
        let currentDate = new Date()
        currentDate.setHours(currentDate.getHours() - 3);
        // console.log(this.currentYear)
        // console.log(new Date(createAppointmentDTO.startAppointment).getFullYear() == this.currentYear)
        let startAppointment = new Date(createAppointmentDTO.startAppointment).getHours() + 3; //Se suma mas 3 por la diferencia horaria
        let endAppointment   = new Date(createAppointmentDTO.endAppointment).getHours() + 3;

        const exist = await this.appointmentService.verifyIfApointmentExist(new Date(createAppointmentDTO.startAppointment))

        try {
            console.log(exist)
            if(!exist){
                if(new Date(createAppointmentDTO.startAppointment) >= currentDate){   
                    if((endAppointment - startAppointment) == 1){
                        if(startAppointment >= 9 && startAppointment <= 18){
                            const appointment =  await this.appointmentService.addAppointment(createAppointmentDTO)
                            return res.status(HttpStatus.OK).json({
                                message: 'Appointment scheduled',
                                appointment
                        });
                        }else{
                            throw new Error('Date is invalid: The hours must be between 9 a.m. and 6 p.m.').message;
                        }
                    }else{
                        throw new Error('Date is invalid: the difference between startAppointment and endAppointment must be 1 hour').message;
                    }
                }else{
                    throw new Error('Date is invalid: must be greater than current date').message;
                };
            }else{
                throw new Error('Date is invalid: this appointment already exist').message;
            }
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: "Invalid format of date",
                Error: err
            });
        }
    }

    /*************** READ ********************/
    @Get('/:uid')
    async getAppointment(@Res() res, @Param('uid') uid){
        try {
            const appointment = await this.appointmentService.getAppointment(uid);
            return res.status(HttpStatus.OK).json({
                message: 'appointment found',
                appointment
            });
        } catch (err) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Appointment not found",
                Error: err
            });
        }
    }

    @Get('/')
    async getAllAppointments(@Res() res){
        try {
            const appointments = await this.appointmentService.getAppointments();
            return res.status(HttpStatus.OK).json({
                message: 'List of appointments',
                appointments
            });
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "",
                Error: err
            });
        }
    }

    /************* UPDATE  *******************/
    @Put('/update/:uid')
    async updateAppointment(@Res() res, @Body() createAppointmentDTO: CreateAppointmentDTO, @Param('uid') uid){
        try {
            const appointments = await this.appointmentService.updateAppointment(uid, createAppointmentDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Appointment Succefully Updated',
                appointments
            });
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Appointment Not Found",
                Error: err
            });
        }
    }

    /************* DELETE ********************/
    @Delete('/delete/:uid')
    async deleteAppointment(@Res() res, @Param('uid') uid){
        try {
            const appointmentDeleted = await this.appointmentService.deleteAppointment(uid);
            if(!appointmentDeleted) throw new NotFoundException('Not found appointment to delete')
            return res.status(HttpStatus.OK).json({
                message: 'Appointment Deleted',
                appointmentDeleted
            });
        } catch (err) {
            console.error(err)
            return res.status(HttpStatus.NOT_FOUND).json({
                message: "Appointment not found",
                Error: err
            });
        }
    }
}
