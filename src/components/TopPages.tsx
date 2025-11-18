import { ExternalLink, KeyRound, DollarSign } from 'lucide-react';

interface TopPage {
    url: string;
    traffic: number;
    keywords: number;
    value: number;
}

interface TopPagesProps {
    pages: TopPage[];
}

export default function TopPages({ pages }: TopPagesProps) {
    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Top Performing Pages</h3>
                <p className="text-sm text-gray-600">Pages driving the most organic traffic</p>
            </div>

            <div className="space-y-3">
                {pages.map((page, index) => (
                    <div key={index} className="border-2 border-gray-200/50 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group bg-white/50 backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-2 flex-1 min-w-0">
                                <ExternalLink className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-semibold text-gray-900 truncate">{page.url}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Traffic</p>
                                    <p className="text-sm font-bold text-gray-900">{page.traffic.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow">
                                    <KeyRound className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Keywords</p>
                                    <p className="text-sm font-bold text-gray-900">{page.keywords}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow">
                                    <DollarSign className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Value</p>
                                    <p className="text-sm font-bold text-gray-900">${(page.value / 1000).toFixed(1)}K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
