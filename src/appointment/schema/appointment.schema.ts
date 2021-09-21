import { Schema } from 'mongoose';

export const AppointmentSchema =  new Schema({
    name: { 
        type: String, 
        require: true
    },
    email: { 
        type: String, 
        require: true
    },
    startAppointment: { 
        type: Date, 
        require: true
    },
    endAppointment: { 
        type: Date, 
        require: true
    }
});