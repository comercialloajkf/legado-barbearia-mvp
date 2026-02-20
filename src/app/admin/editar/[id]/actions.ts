"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateAppointmentDetails(
    id: string,
    data: { serviceId: string, date: Date, time: string, status: string }
) {
    try {
        const [hours, minutes] = data.time.split(":");
        const appointmentDate = new Date(data.date);
        appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

        await prisma.appointment.update({
            where: { id },
            data: {
                serviceId: data.serviceId,
                date: appointmentDate,
                status: data.status
            }
        });

        // Revalidate admin pages
        revalidatePath('/admin');
        revalidatePath('/admin/agenda');

        return { success: true };
    } catch (error) {
        console.error("Failed to update appointment:", error);
        return { success: false, error: "Failed to update appointment" };
    }
}
