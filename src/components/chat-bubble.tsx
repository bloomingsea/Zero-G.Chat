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
                className={`max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-md transition-all duration-200 shadow-sm ${isUser
                    ? 'bg-primary text-white rounded-br-none shadow-primary/20'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-gray-100 rounded-bl-none shadow'
                    }`}
            >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    );
};
