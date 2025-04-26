import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface MetricData {
  [key: string]: string | number | boolean | null | MetricData | MetricData[];
}

// دالة لحفظ البيانات
export async function saveData(period: string, data: MetricData) {
  try {
    const savedData = await prisma.metrics.upsert({
      where: { period },
      update: { data: JSON.stringify(data) },
      create: { period, data: JSON.stringify(data) }
    });
    return savedData;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// دالة لجلب البيانات
export async function getData(period: string): Promise<MetricData | null> {
  try {
    const data = await prisma.metrics.findUnique({
      where: { period }
    });
    return data ? JSON.parse(data.data) : null;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
} 