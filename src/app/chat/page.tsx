'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/chat-bubble';
import { Sidebar } from '@/components/sidebar';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am Zero-G. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadConversation = async (id: string) => {
        setIsLoading(true);
        setCurrentConversationId(id);
        try {
            const res = await fetch(`/api/conversations/${id}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error('Failed to load conversation', error);
        } finally {
            setIsLoading(false);
        }
    };

    const startNewChat = () => {
        setMessages([{ role: 'assistant', content: 'Hello! I am Zero-G. How can I assist you today?' }]);
        setCurrentConversationId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    conversationId: currentConversationId
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);
                if (data.conversationId && data.conversationId !== currentConversationId) {
                    setCurrentConversationId(data.conversationId);
                }
            } else {
                throw new Error(data.error || 'Failed to fetch response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activeId={currentConversationId}
                onSelect={loadConversation}
                onNew={startNewChat}
            />

            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <header className="flex-none border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Zero-G Chat
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs text-slate-400">Online</span>
                        </div>
                    </div>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
                    <div className="mx-auto max-w-3xl space-y-2">
                        {messages.map((m, i) => (
                            <ChatBubble key={i} role={m.role} content={m.content} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex-none border-t border-white/10 bg-slate-950/80 backdrop-blur-md p-4">
                    <div className="mx-auto max-w-3xl">
                        <form onSubmit={handleSubmit} className="relative flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1.5 rounded-lg bg-blue-600 p-1.5 text-white transition-all hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 sm:relative sm:right-0 sm:top-0 sm:w-auto sm:px-4 sm:py-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </form>
                        <div className="mt-2 text-center text-xs text-slate-600">
                            Powered by OpenRouter & Next.js
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
