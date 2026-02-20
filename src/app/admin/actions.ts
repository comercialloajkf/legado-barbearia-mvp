"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateAppointmentStatus(id: string, newStatus: string) {
    try {
        await prisma.appointment.update({
            where: { id },
            data: { status: newStatus }
        });

        // Revalidate the admin page so the UI updates immediately
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function deleteAppointment(id: string) {
    try {
        await prisma.appointment.delete({
            where: { id }
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete appointment:", error);
        return { success: false, error: "Failed to delete" };
    }
}
