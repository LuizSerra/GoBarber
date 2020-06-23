import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(appointment.date, parsedDate),
    );

    if (findAppointmentInSameDate) {
        return response.status(400).json({
            error: 'Não é possível gravar dois agendamentos com a mesma data',
        });
    }

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentRouter;
