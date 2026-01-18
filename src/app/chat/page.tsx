'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/chat-bubble';
import { useSession, signOut } from "next-auth/react";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am Zero-G. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (messages.length > 1) {
            scrollToBottom();
        }
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

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    const isInitialState = messages.length === 1 && messages[0].role === 'assistant';

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased h-screen flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`w-72 bg-white dark:bg-sidebar-dark border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ${isSidebarOpen ? '' : '-ml-72'}`}>
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-icons-round text-white text-xl">blur_on</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Zero-G</span>
                </div>
                <div className="flex-1 overflow-y-auto px-4 space-y-6">
                    <div className="space-y-1">
                        <button
                            onClick={startNewChat}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            <span className="material-icons-round text-sm">add</span>
                            <span>New Chat</span>
                        </button>
                        <div className="relative mt-4">
                            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                            <input className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl pl-10 text-sm focus:ring-2 focus:ring-primary outline-none py-2" placeholder="Search chats..." type="text" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pinned Folders</span>
                            <button className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <span className="material-icons-round text-sm">add</span>
                            </button>
                        </div>
                        <nav className="space-y-1">
                            <a className="flex items-center justify-between px-3 py-2 rounded-lg sidebar-item-active group cursor-pointer" href="#">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-sm">folder</span>
                                    <span className="text-sm font-medium">General</span>
                                </div>
                                <span className="material-icons-round text-xs opacity-0 group-hover:opacity-100">more_horiz</span>
                            </a>
                            <a className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 group transition-all cursor-pointer" href="#">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-sm">folder</span>
                                    <span className="text-sm font-medium">Design</span>
                                </div>
                                <span className="material-icons-round text-xs opacity-0 group-hover:opacity-100">more_horiz</span>
                            </a>
                            <a className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 group transition-all cursor-pointer" href="#">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-sm">folder</span>
                                    <span className="text-sm font-medium">Management</span>
                                </div>
                                <span className="material-icons-round text-xs opacity-0 group-hover:opacity-100">more_horiz</span>
                            </a>
                        </nav>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2 block">Today</span>
                        <nav className="space-y-1">
                            {/* Placeholder for recent chats */}
                            <a className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg cursor-pointer" href="#">
                                <span className="material-icons-round text-sm">chat_bubble_outline</span>
                                <span className="truncate">Marketing plan for Q4</span>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 relative">
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer relative"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-icons-round text-slate-400 text-lg">person</span>
                            )}
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-xs font-semibold truncate max-w-[120px]">{session?.user?.name || "User"}</p>
                            <p className="text-[10px] text-slate-500">Standard Plan</p>
                        </div>
                        <span className="material-icons-round text-slate-400 text-sm">settings</span>
                    </button>

                    {/* Settings Dropdown */}
                    {isSettingsOpen && (
                        <div className="absolute bottom-full left-0 w-full p-2 mb-2 z-50">
                            <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200">
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-sm font-medium cursor-pointer"
                                >
                                    <span className="material-icons-round text-sm">logout</span>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gradient-mesh relative overflow-hidden">
                <header className="h-16 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-icons-round">menu_open</span>
                        </button>
                        <span className="text-sm font-medium text-slate-400">Zero-G</span>
                        <span className="text-slate-300 dark:text-slate-700">/</span>
                        <span className="text-sm font-semibold truncate max-w-[200px]">
                            {isInitialState ? 'New Conversation' : messages[messages.length - 1]?.content.slice(0, 30) + '...'}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Update Available
                        </button>
                        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                            <span className="material-icons-round text-slate-500">settings</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto flex flex-col p-8 scroll-smooth" id="chat-container">
                    {isInitialState ? (
                        <div className="max-w-4xl w-full mx-auto text-center space-y-8 my-auto">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex items-center justify-center animate-bounce duration-1000">
                                    <span className="material-icons-round text-primary text-4xl">blur_on</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    How can we <span className="text-primary italic">assist</span> you today?
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                                    Get expert guidance powered by AI agents specializing in Sales, Marketing, and Negotiation. Choose the agent that suits your needs.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
                                {[
                                    { icon: 'insights', color: 'text-primary', bg: 'bg-primary/10', title: 'Marketing Insights', desc: 'Discover the best marketing strategies to showcase your properties.' },
                                    { icon: 'handshake', color: 'text-orange-500', bg: 'bg-orange-500/10', title: 'Negotiation Tactics', desc: 'Learn expert negotiation tips to close deals more effectively.' },
                                    { icon: 'trending_up', color: 'text-blue-500', bg: 'bg-blue-500/10', title: 'Sales Strategies', desc: 'Get tailored advice on increasing property visibility and sales.' },
                                    { icon: 'support_agent', color: 'text-pink-500', bg: 'bg-pink-500/10', title: 'General Support', desc: 'Need help with something else? Ask away and we\'ll guide you.' },
                                ].map((card, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setInput(card.desc)}
                                        className="p-5 text-left bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary dark:hover:border-primary transition-all group cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`material-icons-round ${card.color} ${card.bg} p-2 rounded-lg`}>{card.icon}</span>
                                            <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors text-sm">north_east</span>
                                        </div>
                                        <h3 className="font-bold text-sm mb-2">{card.title}</h3>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl w-full mx-auto space-y-4 pb-4">
                            {messages.map((m, i) => (
                                <ChatBubble key={i} role={m.role} content={m.content} />
                            ))}
                            {isLoading && (
                                <div className="flex justify-start mb-4">
                                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1 shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                <div className="p-8 pt-0 z-10">
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <form onSubmit={handleSubmit} className="relative bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-2 flex items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-primary/50">
                            <button type="button" className="p-3 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <span className="material-icons-round">attach_file</span>
                            </button>
                            <input
                                className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white placeholder:text-slate-400 px-2 outline-none"
                                placeholder="Type your message here..."
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <div className="flex items-center gap-2 pr-1">
                                <button type="button" className="p-3 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                    <span className="material-icons-round">mic</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                                >
                                    <span className="material-icons-round">arrow_upward</span>
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-[10px] text-slate-400 mt-4 tracking-wide">
                            Zero-G AI can provide helpful info but is still learning. Please verify important information.
                        </p>
                    </div>
                </div>

                <button
                    className="fixed bottom-6 right-6 p-3 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-full shadow-lg z-50 text-slate-500 dark:text-slate-400 hover:scale-110 transition-transform cursor-pointer"
                    onClick={toggleTheme}
                >
                    <span className="material-icons-round dark:hidden">dark_mode</span>
                    <span className="material-icons-round hidden dark:block">light_mode</span>
                </button>
            </main>
        </div>
    );
}
