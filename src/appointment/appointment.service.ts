import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Appointment } from './interfaces/appointment.interface';
import { CreateAppointmentDTO } from './DTO/appointment.dto';
import { AppointmentModule } from './appointment.module';

@Injectable()
export class AppointmentService {
    
    constructor(@InjectModel('Appointment') private _appointmentModel: Model<Appointment>) { }

    /******************************* CREATE **********************************/
    async addAppointment(addAppointmentDTO: CreateAppointmentDTO): Promise<Appointment>{
        const appointment = await new this._appointmentModel(addAppointmentDTO);
        return await appointment.save();
    }

    /******************************* READ *************************************/
    async getAppointments(): Promise<Appointment[]>{
        const appointments = await this._appointmentModel.find();
        return appointments;
    }

    async getAppointment(uid): Promise<Appointment>{
        const appointment = await this._appointmentModel.findById(uid);
        return appointment;
    }

    /******************************* UPDATE **********************************/
    async updateAppointment(uid, addAppointmentDTO: CreateAppointmentDTO): Promise<Appointment>{ 
        const updatedAppointment = await this._appointmentModel.findByIdAndUpdate(uid, addAppointmentDTO, {new: true})
        return updatedAppointment;
    }

    /******************************* DELETE **********************************/
    async deleteAppointment(uid): Promise<Appointment>{
        return await this._appointmentModel.findByIdAndDelete(uid);
    }

}
