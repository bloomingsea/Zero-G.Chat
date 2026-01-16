import React from 'react';

interface ChatBubbleProps {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-md transition-all duration-200 ${isUser
                        ? 'bg-blue-600/90 text-white rounded-br-none shadow-lg shadow-blue-900/20'
                        : 'bg-white/10 border border-white/10 text-gray-100 rounded-bl-none shadow-lg shadow-black/10'
                    }`}
            >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    );
};
