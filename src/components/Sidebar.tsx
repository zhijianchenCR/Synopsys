import { useState } from 'react';
import { TrendingUp, Menu, X, LayoutDashboard, Globe, Search, Users, Bot } from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <aside
                className={`fixed top-0 left-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl transition-all duration-300 z-40 ${isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full'
                    }`}
            >
                <div className={`${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
                    <div className="p-8 pt-20 border-b border-white/10">
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl blur-lg opacity-60"></div>
                                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-2xl">
                                    <TrendingUp className="w-8 h-8 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent tracking-tight">
                                    Synopsys
                                </h2>
                                <p className="text-sm text-blue-200/90 font-medium">
                                    Digital Marketing
                                </p>
                                <p className="text-xs text-blue-200/70">
                                    Performance & Analytics
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="p-6">
                        <div className="text-blue-200/70 text-xs font-semibold tracking-wider uppercase mb-4">
                            Navigation
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => onNavigate('dashboard')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === 'dashboard'
                                        ? 'bg-blue-500/20 text-white border border-blue-400/30'
                                        : 'text-blue-200/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span className="font-medium">Dashboard</span>
                            </button>
                            <button
                                onClick={() => onNavigate('traffic')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === 'traffic'
                                        ? 'bg-blue-500/20 text-white border border-blue-400/30'
                                        : 'text-blue-200/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Globe className="w-5 h-5" />
                                <span className="font-medium">Traffic & Geographic</span>
                            </button>
                            <button
                                onClick={() => onNavigate('keywords')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === 'keywords'
                                        ? 'bg-blue-500/20 text-white border border-blue-400/30'
                                        : 'text-blue-200/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Search className="w-5 h-5" />
                                <span className="font-medium">Keyword Performance</span>
                            </button>
                            <button
                                onClick={() => onNavigate('competitive')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === 'competitive'
                                        ? 'bg-blue-500/20 text-white border border-blue-400/30'
                                        : 'text-blue-200/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Users className="w-5 h-5" />
                                <span className="font-medium">Pages & Competitive</span>
                            </button>
                        </div>

                        <div className="text-blue-200/70 text-xs font-semibold tracking-wider uppercase mb-4 mt-8">
                            AI Tools
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => onNavigate('ai-assistant')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentPage === 'ai-assistant'
                                        ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white border border-cyan-400/40'
                                        : 'text-blue-200/80 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Bot className="w-5 h-5" />
                                <span className="font-medium">Synopsys Chatbot</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            <div
                className={`transition-all duration-300 ${isOpen ? 'ml-72' : 'ml-0'}`}
            />
        </>
    );
};

export default Sidebar;
