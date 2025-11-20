import { TrendingUp, TrendingDown, Clock, MousePointer, FileText, ShoppingCart } from 'lucide-react';

interface TrafficTrendData {
    week: string;
    uniqueVisitors: number;
    visits: number;
    bounceRate: number;
    avgVisitDuration: number;
    pagesPerVisit: number;
    purchaseConversion: number;
}

interface TrafficTrendChartProps {
    data: TrafficTrendData[];
}

const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default function TrafficTrendChart({ data }: TrafficTrendChartProps) {
    const maxVisitors = Math.max(...data.map(d => d.uniqueVisitors));
    const maxVisits = Math.max(...data.map(d => d.visits));

    const firstWeek = data[0];
    const lastWeek = data[data.length - 1];

    const visitorChange = ((lastWeek.uniqueVisitors - firstWeek.uniqueVisitors) / firstWeek.uniqueVisitors) * 100;
    const visitChange = ((lastWeek.visits - firstWeek.visits) / firstWeek.visits) * 100;

    const avgBounceRate = data.reduce((acc, d) => acc + d.bounceRate, 0) / data.length;
    const avgDuration = data.reduce((acc, d) => acc + d.avgVisitDuration, 0) / data.length;
    const avgPages = data.reduce((acc, d) => acc + d.pagesPerVisit, 0) / data.length;
    const avgConversion = data.reduce((acc, d) => acc + d.purchaseConversion, 0) / data.filter(d => d.purchaseConversion > 0).length;

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Traffic Trend Overview</h3>
                <p className="text-sm text-gray-600">Weekly visitor and engagement metrics</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200/50">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-blue-700">Unique Visitors</span>
                        {visitorChange < 0 ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                        ) : (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                        )}
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {lastWeek.uniqueVisitors.toLocaleString()}
                    </div>
                    <div className={`text-xs font-semibold ${visitorChange < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {visitorChange > 0 ? '+' : ''}{visitorChange.toFixed(1)}% from start
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200/50">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-emerald-700">Total Visits</span>
                        {visitChange < 0 ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                        ) : (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                        )}
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {lastWeek.visits.toLocaleString()}
                    </div>
                    <div className={`text-xs font-semibold ${visitChange < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {visitChange > 0 ? '+' : ''}{visitChange.toFixed(1)}% from start
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 border border-amber-200/50">
                    <div className="flex items-center gap-1 mb-1">
                        <MousePointer className="w-3 h-3 text-amber-700" />
                        <span className="text-xs font-semibold text-amber-700">Avg Bounce Rate</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {avgBounceRate.toFixed(1)}%
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                        Engagement quality
                    </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl p-3 border border-violet-200/50">
                    <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3 text-violet-700" />
                        <span className="text-xs font-semibold text-violet-700">Avg Duration</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {formatDuration(Math.round(avgDuration))}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                        Time on site
                    </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-xl p-3 border border-cyan-200/50">
                    <div className="flex items-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-cyan-700" />
                        <span className="text-xs font-semibold text-cyan-700">Pages/Visit</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {avgPages.toFixed(2)}
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                        Content depth
                    </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-xl p-3 border border-rose-200/50">
                    <div className="flex items-center gap-1 mb-1">
                        <ShoppingCart className="w-3 h-3 text-rose-700" />
                        <span className="text-xs font-semibold text-rose-700">Conversion</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-0.5">
                        {avgConversion.toFixed(2)}%
                    </div>
                    <div className="text-xs font-semibold text-gray-600">
                        Purchase rate
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4 text-xs">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow"></div>
                    <span className="font-semibold text-blue-700">Unique Visitors</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow"></div>
                    <span className="font-semibold text-emerald-700">Total Visits</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow"></div>
                    <span className="font-semibold text-amber-700">Bounce Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 shadow"></div>
                    <span className="font-semibold text-violet-700">Duration</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 shadow"></div>
                    <span className="font-semibold text-cyan-700">Pages/Visit</span>
                </div>
            </div>

            <div className="space-y-3">
                {data.map((item, index) => {
                    const visitorHeightPercent = (item.uniqueVisitors / maxVisitors) * 100;
                    const visitHeightPercent = (item.visits / maxVisits) * 100;

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">{item.week}</span>
                                <div className="flex items-center space-x-4 text-xs">
                                    <span className="text-blue-700 font-semibold">
                                        {item.uniqueVisitors.toLocaleString()}
                                    </span>
                                    <span className="text-emerald-700 font-semibold">
                                        {item.visits.toLocaleString()}
                                    </span>
                                    <span className="text-amber-700 font-semibold">
                                        {item.bounceRate.toFixed(1)}%
                                    </span>
                                    <span className="text-violet-700 font-semibold">
                                        {formatDuration(item.avgVisitDuration)}
                                    </span>
                                    <span className="text-cyan-700 font-semibold">
                                        {item.pagesPerVisit.toFixed(1)}p
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="relative h-6 bg-blue-50 rounded-lg overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer rounded-lg flex items-center justify-start px-2"
                                        style={{ width: `${visitorHeightPercent}%` }}
                                        title={`Unique Visitors: ${item.uniqueVisitors.toLocaleString()}`}
                                    >
                                        <span className="text-xs font-semibold text-white whitespace-nowrap">
                                            {item.uniqueVisitors.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative h-6 bg-emerald-50 rounded-lg overflow-hidden">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all cursor-pointer rounded-lg flex items-center justify-start px-2"
                                        style={{ width: `${visitHeightPercent}%` }}
                                        title={`Total Visits: ${item.visits.toLocaleString()}`}
                                    >
                                        <span className="text-xs font-semibold text-white whitespace-nowrap">
                                            {item.visits.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
