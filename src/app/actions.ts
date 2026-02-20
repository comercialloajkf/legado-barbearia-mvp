"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAppointment(data: {
    serviceId: string;
    date: Date;
    time: string;
    customerName: string;
    customerPhone: string;
}) {
    const [hours, minutes] = data.time.split(":");
    const appointmentDate = new Date(data.date);
    appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    let customer = await prisma.customer.findUnique({
        where: { phone: data.customerPhone }
    });

    if (!customer) {
        customer = await prisma.customer.create({
            data: {
                name: data.customerName,
                phone: data.customerPhone
            }
        });
    }

    let professional = await prisma.professional.findFirst();
    if (!professional) {
        professional = await prisma.professional.create({
            data: { name: "Wagner Black" }
        });
    }

    const appointment = await prisma.appointment.create({
        data: {
            customerId: customer.id,
            professionalId: professional.id,
            serviceId: data.serviceId,
            date: appointmentDate,
            status: "PENDING"
        }
    });

    return appointment;
}
