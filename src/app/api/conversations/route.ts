import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: [
                { isPinned: 'desc' },
                { createdAt: 'desc' }
            ],
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    take: 1
                }
            }
        });
        return NextResponse.json(conversations);
    } catch (error) {
        console.error('Failed to fetch conversations:', error);
        return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title } = await req.json().catch(() => ({}));
        const conversation = await prisma.conversation.create({
            data: {
                title: title || 'New Conversation',
            },
        });
        return NextResponse.json(conversation);
    } catch (error) {
        console.error('Failed to create conversation:', error);
        return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
    }
}
