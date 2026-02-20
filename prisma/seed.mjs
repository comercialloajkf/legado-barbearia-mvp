import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const count = await prisma.service.count()
    if (count === 0) {
        await prisma.service.createMany({
            data: [
                { name: 'Corte Social/Tesoura', price: 35.0, durationMinutes: 30 },
                { name: 'Corte Navalhado', price: 40.0, durationMinutes: 45 },
                { name: 'Barboterapia', price: 30.0, durationMinutes: 30 },
                { name: 'Combo (Corte + Barba)', price: 65.0, durationMinutes: 60 },
                { name: 'Luzes', price: 80.0, durationMinutes: 90 },
            ],
        })
        console.log("Services seeded successfully.")
    } else {
        console.log("Services already seeded.")
    }
}
main().then(() => prisma.$disconnect()).catch(console.error)
