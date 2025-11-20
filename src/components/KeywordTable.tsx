import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, ExternalLink } from 'lucide-react';
import type { KeywordData } from '../types';

interface KeywordTableProps {
    keywords: KeywordData[];
    maxRows?: number;
}

export default function KeywordTable({ keywords, maxRows = 10 }: KeywordTableProps) {
    const displayKeywords = keywords.slice(0, maxRows);

    const getDifficultyColor = (difficulty: number) => {
        if (difficulty >= 70) return 'text-red-600 bg-red-50';
        if (difficulty >= 50) return 'text-orange-600 bg-orange-50';
        return 'text-emerald-600 bg-emerald-50';
    };

    const getCompetitionColor = (competition: number) => {
        if (competition >= 0.7) return 'text-red-600 bg-red-50';
        if (competition >= 0.4) return 'text-orange-600 bg-orange-50';
        return 'text-emerald-600 bg-emerald-50';
    };

    const getIntentColor = (intent: string) => {
        const colors = {
            'Commercial': 'bg-blue-50 text-blue-700 border-blue-200',
            'Informational': 'bg-amber-50 text-amber-700 border-amber-200',
            'Navigational': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'Transactional': 'bg-orange-50 text-orange-700 border-orange-200',
        };
        return colors[intent as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const getPositionChange = (current: number, previous: number) => {
        const change = previous - current;
        if (change > 0) return { icon: ArrowUp, color: 'text-emerald-600', text: `+${change}` };
        if (change < 0) return { icon: ArrowDown, color: 'text-red-600', text: `${change}` };
        return { icon: Minus, color: 'text-gray-400', text: '0' };
    };

    const truncateUrl = (url: string) => {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        if (path.length > 40) {
            return path.substring(0, 37) + '...';
        }
        return path || '/';
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Keyword
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Change
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Volume
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Traffic
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Traffic %
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Traffic Cost
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Difficulty
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Competition
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                CPC
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Intent
                            </th>
                            <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Trend
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                        {displayKeywords.map((keyword, index) => {
                            const trendDirection = keyword.trend[keyword.trend.length - 1] > keyword.trend[0];
                            const positionChange = getPositionChange(keyword.position, keyword.previousPosition);
                            const PositionChangeIcon = positionChange.icon;

                            return (
                                <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-150">
                                    <td className="px-4 py-4">
                                        <div className="max-w-xs">
                                            <span className="text-sm font-semibold text-gray-900 line-clamp-2">{keyword.keyword}</span>
                                            {keyword.serpFeatures && (
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{keyword.serpFeatures}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow-lg">
                                            {keyword.position}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-1">
                                            <PositionChangeIcon className={`w-4 h-4 ${positionChange.color}`} />
                                            <span className={`text-xs font-bold ${positionChange.color}`}>
                                                {positionChange.text}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-gray-900">{keyword.volume.toLocaleString()}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-bold text-gray-900">{keyword.traffic.toLocaleString()}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-semibold text-blue-600">{keyword.trafficPercentage.toFixed(2)}%</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-bold text-emerald-600">${keyword.trafficCost.toLocaleString()}</span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getDifficultyColor(keyword.difficulty)}`}>
                                            {keyword.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getCompetitionColor(keyword.competition)}`}>
                                            {(keyword.competition * 100).toFixed(0)}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-semibold text-gray-900">${keyword.cpc.toFixed(2)}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <a
                                            href={keyword.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 hover:underline group"
                                        >
                                            <span className="max-w-[200px] truncate">{truncateUrl(keyword.url)}</span>
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getIntentColor(keyword.intent)}`}>
                                            {keyword.intent}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-1.5">
                                            {trendDirection ? (
                                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-600" />
                                            )}
                                            <span className={`text-xs font-bold ${trendDirection ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {Math.abs(((keyword.trend[keyword.trend.length - 1] - keyword.trend[0]) / keyword.trend[0]) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
