import { openRouter } from '@/lib/openrouter';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { prompt, conversationId } = await req.json();

        let targetConversationId = conversationId;

        // Create conversation if not exists
        if (!targetConversationId) {
            const newConv = await prisma.conversation.create({
                data: {
                    title: prompt.slice(0, 30) + '...',
                },
            });
            targetConversationId = newConv.id;
        }

        // Save User Message
        await prisma.message.create({
            data: {
                role: 'user',
                content: prompt,
                conversationId: targetConversationId,
            },
        });

        const completion = await openRouter.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: [
                { role: 'user', content: prompt }
            ],
        });

        const aiContent = completion.choices[0].message.content || '...';

        // Save AI Message
        await prisma.message.create({
            data: {
                role: 'assistant',
                content: aiContent,
                conversationId: targetConversationId,
            },
        });

        return NextResponse.json({
            result: aiContent,
            conversationId: targetConversationId
        });
    } catch (error) {
        console.error('OpenRouter Error:', error);
        return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 });
    }
}
