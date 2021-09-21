import { Document } from 'mongoose';

export interface Appointment extends Document {
    name: string;
    email: string;
    startAppointment: Date;
    endAppointment: Date;
}