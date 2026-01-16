import React from 'react';
import { useEffect, useState } from 'react';

interface Conversation {
    id: string;
    title: string;
}

interface SidebarProps {
    activeId: string | null;
    onSelect: (id: string) => void;
    onNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, onNew }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        fetch('/api/conversations')
            .then(res => res.json())
            .then(setConversations)
            .catch(console.error);
    }, [activeId]); // Refresh list when active ID changes (e.g. new chat created)

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col h-screen">
            <div className="p-4">
                <button
                    onClick={onNew}
                    className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <span className="text-sm font-medium">New Chat</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {conversations.map((conv) => (
                    <button
                        key={conv.id}
                        onClick={() => onSelect(conv.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${activeId === conv.id
                                ? 'bg-white/10 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }`}
                    >
                        {conv.title || 'Untitled Conversation'}
                    </button>
                ))}
            </div>
        </aside>
    );
};
