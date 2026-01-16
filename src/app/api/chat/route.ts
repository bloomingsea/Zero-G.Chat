import { openRouter } from '@/lib/openrouter';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const completion = await openRouter.chat.completions.create({
            model: 'openai/gpt-3.5-turbo', // You can change this to any supported model
            messages: [
                { role: 'user', content: prompt || 'Hello, world!' }
            ],
        });

        return NextResponse.json({ result: completion.choices[0].message.content });
    } catch (error) {
        console.error('OpenRouter Error:', error);
        return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 });
    }
}
