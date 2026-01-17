import React from 'react';
import { useEffect, useState } from 'react';

interface Conversation {
    id: string;
    title: string;
    isPinned: boolean;
}

interface SidebarProps {
    activeId: string | null;
    onSelect: (id: string) => void;
    onNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, onNew }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    useEffect(() => {
        fetchConversations();
    }, [activeId]);

    const fetchConversations = () => {
        fetch('/api/conversations')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setConversations(data);
                }
            })
            .catch(console.error);
    };

    const handlePin = async (e: React.MouseEvent, id: string, currentPinned: boolean) => {
        e.stopPropagation();
        try {
            await fetch(`/api/conversations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPinned: !currentPinned }),
            });
            fetchConversations();
        } catch (error) {
            console.error('Failed to pin/unpin', error);
        }
        setMenuOpenId(null);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this chat?')) return;

        try {
            await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
            if (activeId === id) {
                onSelect(''); // Deselect if active
                // ideally redirect to home or new chat, handled by parent or by just clearing activeId
                window.location.href = '/';
            }
            fetchConversations();
        } catch (error) {
            console.error('Failed to delete', error);
        }
        setMenuOpenId(null);
    };

    const startRename = (e: React.MouseEvent, conv: Conversation) => {
        e.stopPropagation();
        setEditingId(conv.id);
        setEditTitle(conv.title || '');
        setMenuOpenId(null);
    };

    const saveRename = async (id: string) => {
        try {
            await fetch(`/api/conversations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle }),
            });
            setEditingId(null);
            fetchConversations();
        } catch (error) {
            console.error('Failed to rename', error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            saveRename(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col h-screen" onClick={() => setMenuOpenId(null)}>
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
                    <div
                        key={conv.id}
                        className={`group relative flex items-center w-full rounded-lg transition-colors ${activeId === conv.id
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }`}
                    >
                        {/* Pin Indicator */}
                        {conv.isPinned && (
                            <div className="absolute left-1 w-1 h-1 bg-yellow-400 rounded-full" />
                        )}

                        {editingId === conv.id ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, conv.id)}
                                onBlur={() => saveRename(conv.id)}
                                autoFocus
                                className="w-full bg-transparent border border-blue-500 rounded px-2 py-1 text-sm text-white focus:outline-none ml-2"
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <button
                                onClick={() => onSelect(conv.id)}
                                className="flex-1 text-left px-3 py-2 text-sm truncate pr-8"
                            >
                                {conv.title || 'Untitled Conversation'}
                            </button>
                        )}

                        {/* Menu Button */}
                        {!editingId && (
                            <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpenId(menuOpenId === conv.id ? null : conv.id);
                                    }}
                                    className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                                    </svg>
                                </button>

                                {menuOpenId === conv.id && (
                                    <div className="absolute right-0 top-full mt-1 w-32 bg-slate-800 border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden py-1">
                                        <button
                                            onClick={(e) => handlePin(e, conv.id, conv.isPinned)}
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V6A2.5 2.5 0 0011 3.5H9A2.5 2.5 0 006.5 6v8H4.25a2.25 2.25 0 01-2.25-2.25v-6.5a2.25 2.25 0 012.012-2.238l9.988-.988z" clipRule="evenodd" />
                                            </svg>
                                            {conv.isPinned ? 'Unpin' : 'Pin'}
                                        </button>
                                        <button
                                            onClick={(e) => startRename(e, conv)}
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                            </svg>
                                            Rename
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, conv.id)}
                                            className="w-full text-left px-3 py-2 text-xs hover:bg-red-500/10 text-red-400 hover:text-red-300 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" clipRule="evenodd" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};
