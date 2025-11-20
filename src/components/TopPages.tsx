import { ExternalLink, KeyRound, TrendingUp, TrendingDown, Users, Target, Globe } from 'lucide-react';

interface TopPage {
    url: string;
    traffic: number;
    trafficPercentage: number;
    keywords: number;
    trafficChange: number;
    commercialTraffic: number;
    informationalTraffic: number;
    navigationalTraffic: number;
}

interface TopPagesProps {
    pages: TopPage[];
}

export default function TopPages({ pages }: TopPagesProps) {
    if (!pages || pages.length === 0) {
        return (
            <div className="glass-card rounded-2xl shadow-xl p-6">
                <div className="text-center text-gray-600">No page data available</div>
            </div>
        );
    }

    const getTrafficChangeColor = (change: number) => {
        if (change > 0) return 'text-emerald-600 bg-emerald-50';
        if (change < 0) return 'text-red-600 bg-red-50';
        return 'text-gray-600 bg-gray-50';
    };

    const getDominantIntent = (page: TopPage) => {
        const intents = [
            { type: 'Commercial', value: page.commercialTraffic, color: 'bg-blue-100 text-blue-700' },
            { type: 'Informational', value: page.informationalTraffic, color: 'bg-amber-100 text-amber-700' },
            { type: 'Navigational', value: page.navigationalTraffic, color: 'bg-emerald-100 text-emerald-700' }
        ];
        return intents.reduce((max, intent) => intent.value > max.value ? intent : max);
    };

    const shortenUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            const path = urlObj.pathname;
            if (path.length > 50) {
                return path.substring(0, 47) + '...';
            }
            return path || '/';
        } catch {
            return url;
        }
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Top Performing Pages</h3>
                <p className="text-sm text-gray-600">Pages driving the most organic traffic</p>
            </div>

            <div className="space-y-4">
                {pages.map((page, index) => {
                    const dominantIntent = getDominantIntent(page);
                    const isPositiveChange = page.trafficChange > 0;

                    return (
                        <div key={index} className="border-2 border-gray-200/50 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group bg-white/50 backdrop-blur-sm">
                            <div className="flex items-start justify-between mb-4">
                                <a
                                    href={page.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start space-x-2 flex-1 min-w-0 group/link"
                                >
                                    <ExternalLink className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm font-semibold text-blue-600 group-hover/link:text-blue-800 group-hover/link:underline line-clamp-2 break-all">
                                            {shortenUrl(page.url)}
                                        </span>
                                    </div>
                                </a>
                                <span className={`ml-3 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${dominantIntent.color}`}>
                                    {dominantIntent.type}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow">
                                        <Users className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Traffic</p>
                                        <p className="text-sm font-bold text-gray-900">{page.traffic.toLocaleString()}</p>
                                        <p className="text-xs text-blue-600 font-semibold">{page.trafficPercentage}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow">
                                        <KeyRound className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Keywords</p>
                                        <p className="text-sm font-bold text-gray-900">{page.keywords.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className={`bg-gradient-to-br p-2 rounded-lg shadow ${isPositiveChange ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'}`}>
                                        {isPositiveChange ? (
                                            <TrendingUp className="w-4 h-4 text-white" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Change</p>
                                        <p className={`text-sm font-bold ${isPositiveChange ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {isPositiveChange ? '+' : ''}{page.trafficChange.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Target className="w-4 h-4 text-amber-600" />
                                    <p className="text-xs text-gray-600 font-semibold">Intent Mix</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {page.commercialTraffic > 0 && (
                                        <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-xs text-gray-700">
                                                <span className="font-bold text-blue-700">{page.commercialTraffic.toLocaleString()}</span>
                                                <span className="text-gray-500 ml-1">Commercial</span>
                                            </span>
                                        </div>
                                    )}
                                    {page.informationalTraffic > 0 && (
                                        <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                            <span className="text-xs text-gray-700">
                                                <span className="font-bold text-amber-700">{page.informationalTraffic.toLocaleString()}</span>
                                                <span className="text-gray-500 ml-1">Informational</span>
                                            </span>
                                        </div>
                                    )}
                                    {page.navigationalTraffic > 0 && (
                                        <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-xs text-gray-700">
                                                <span className="font-bold text-emerald-700">{page.navigationalTraffic.toLocaleString()}</span>
                                                <span className="text-gray-500 ml-1">Navigational</span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
