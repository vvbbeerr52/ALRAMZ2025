import { saveData, getData } from './data';

export async function handleApiRequest(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  if (path === '/api/data' && method === 'POST') {
    const body = await req.json();
    const { period, data } = body;
    const result = await saveData(period, data);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('/api/data/') && method === 'GET') {
    const period = path.split('/').pop();
    if (!period) {
      return new Response('Period is required', { status: 400 });
    }
    const data = await getData(period);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not Found', { status: 404 });
} 