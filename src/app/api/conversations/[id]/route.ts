import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const conversation = await prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        return NextResponse.json(conversation);
    } catch (error) {
        console.error('Failed to fetch conversation:', error);
        return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.conversation.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete conversation:', error);
        return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
    }
}
