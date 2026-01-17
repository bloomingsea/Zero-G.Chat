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

        // Fetch previous messages for context
        const previousMessages = await prisma.message.findMany({
            where: { conversationId: targetConversationId },
            orderBy: { createdAt: 'asc' },
            take: 20, // Limit context window
        });

        const formattedMessages = previousMessages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }));

        const completion = await openRouter.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: formattedMessages,
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
