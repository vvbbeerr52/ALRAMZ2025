import { MetricData } from '../api/data';

// دالة لحفظ البيانات في السيرفر
export async function saveDataToServer(period: string, data: MetricData) {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ period, data }),
    });

    if (!response.ok) {
      throw new Error('Failed to save data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving data to server:', error);
    throw error;
  }
}

// دالة لجلب البيانات من السيرفر
export async function getDataFromServer(period: string): Promise<MetricData | null> {
  try {
    const response = await fetch(`/api/data/${period}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
} 