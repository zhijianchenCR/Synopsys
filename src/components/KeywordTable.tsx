import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, ExternalLink, Info } from 'lucide-react';
import { useState, useRef } from 'react';
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

    const getIntentColor = (intent: string | undefined) => {
        if (!intent) return 'bg-gray-50 text-gray-700 border-gray-200';

        const intentStr = String(intent);
        const colors = {
            'Commercial': 'bg-blue-50 text-blue-700 border-blue-200',
            'Informational': 'bg-amber-50 text-amber-700 border-amber-200',
            'Navigational': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'Transactional': 'bg-orange-50 text-orange-700 border-orange-200',
        };

        for (const [key, value] of Object.entries(colors)) {
            if (intentStr.includes(key)) {
                return value;
            }
        }

        return 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const formatIntent = (intent: string | undefined): string => {
        if (!intent) return 'Unknown';

        const intentStr = String(intent);
        if (intentStr.includes('Commercial')) return 'Commercial';
        if (intentStr.includes('Informational')) return 'Informational';
        if (intentStr.includes('Navigational')) return 'Navigational';
        if (intentStr.includes('Transactional')) return 'Transactional';

        return intentStr.split(',')[0] || 'Unknown';
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

    const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const columnInfo: Record<string, string> = {
        title: 'Ad title or page title displayed in search results',
        description: 'Ad description or meta description shown in search results',
        keyword: 'The search term users type into search engines to find content',
        position: 'Current ranking position in search results (lower is better)',
        change: 'Position change compared to previous period (↑ up is good, ↓ down is bad)',
        volume: 'Average monthly search volume - how many times this keyword is searched',
        traffic: 'Estimated monthly traffic this keyword brings to your site',
        trafficPercent: 'Percentage of total site traffic from this keyword',
        trafficCost: 'Estimated value of traffic if you had to pay for it via ads',
        trafficCostPercent: 'Percentage of total traffic cost from this keyword',
        difficulty: 'SEO difficulty score (0-100). Higher = harder to rank for',
        competition: 'Paid advertising competition level (0-100%). Higher = more competitive',
        numberOfResults: 'Total number of search results for this keyword',
        cpc: 'Cost Per Click - average cost for paid ads on this keyword',
        visibleUrl: 'The visible URL shown in search results',
        url: 'The actual page URL that ranks for this keyword',
        intent: 'User search intent: Commercial (buying research), Informational (learning), Navigational (finding site), Transactional (ready to buy)',
        trend: 'Search volume trend over the past 12 months',
        lastSeen: 'Date when this keyword was last seen ranking'
    };

    const handleMouseEnter = (column: string, event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setHoveredColumn(column);
        setTooltipPosition({
            top: rect.bottom + 8,
            left: rect.left + rect.width / 2
        });
    };

    return (
        <>
            <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
                <div className="max-h-[600px] overflow-auto">
                    <table className="w-full min-w-[2200px]">
                        <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('keyword', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Keyword</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('position', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Position</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('change', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Change</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('volume', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Volume</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('traffic', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Traffic</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('trafficPercent', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Traffic %</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('trafficCost', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Traffic Cost</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('trafficCostPercent', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Cost %</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('difficulty', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Difficulty</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('competition', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Competition</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('cpc', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>CPC</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('numberOfResults', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Results</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('visibleUrl', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Visible URL</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('url', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>URL</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('lastSeen', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Last Seen</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('intent', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Intent</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider sticky top-0 bg-gradient-to-r from-gray-50/95 to-gray-100/95 backdrop-blur-sm z-10">
                                    <div className="flex items-center justify-center gap-1.5"
                                        onMouseEnter={(e) => handleMouseEnter('trend', e)}
                                        onMouseLeave={() => setHoveredColumn(null)}>
                                        <span>Trend</span>
                                        <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
                                    </div>
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
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-semibold text-blue-600">{keyword.trafficCostPercentage.toFixed(2)}%</span>
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
                                            <span className="text-sm font-medium text-gray-700">{keyword.numberOfResults.toLocaleString()}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-xs text-gray-600 max-w-[150px] truncate block">{keyword.visibleUrl}</span>
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
                                        <td className="px-4 py-4">
                                            <span className="text-xs text-gray-600">{keyword.lastSeen}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getIntentColor(keyword.intent)}`}>
                                                {formatIntent(keyword.intent)}
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

            {hoveredColumn && (
                <div
                    className="fixed z-[9999] pointer-events-none"
                    style={{
                        top: `${tooltipPosition.top}px`,
                        left: `${tooltipPosition.left}px`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="bg-gray-900 text-white text-sm p-3 rounded-lg shadow-2xl max-w-sm">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>
                        {columnInfo[hoveredColumn]}
                    </div>
                </div>
            )}
        </>
    );
}
