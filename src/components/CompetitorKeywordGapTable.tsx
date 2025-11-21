import { useEffect, useState } from 'react';
import { Target, ChevronDown, ChevronRight, ExternalLink, TrendingUp, AlertCircle, Trophy, Award } from 'lucide-react';
import { parseCompetitorKeywords, CompetitorKeywordData } from '../utils/competitorParser';

type CategoryType = 'all' | 'advantages' | 'opportunities' | 'gaps' | 'quick_wins' | 'strategic';

export default function CompetitorKeywordGapTable() {
    const [allData, setAllData] = useState<CompetitorKeywordData[]>([]);
    const [filteredData, setFilteredData] = useState<CompetitorKeywordData[]>([]);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await parseCompetitorKeywords();
                setAllData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error loading competitor data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        let filtered = [...allData];

        switch (activeCategory) {
            case 'advantages':
                filtered = allData.filter(item => {
                    if (item.rankings.synopsys === 0 || item.rankings.synopsys > 10) return false;
                    const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                    const worse = competitors.filter(r => r === 0 || r > item.rankings.synopsys);
                    return worse.length >= 3 && item.volume >= 40;
                });
                break;
            case 'opportunities':
                filtered = allData.filter(item => {
                    const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                    const better = competitors.filter(r => r > 0 && r < item.rankings.synopsys);
                    return better.length >= 1 && item.volume >= 50;
                }).sort((a, b) => b.volume - a.volume);
                break;
            case 'gaps':
                filtered = allData.filter(item => {
                    const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                    const better = competitors.filter(r => r > 0 && r < item.rankings.synopsys);
                    return better.length >= 2;
                });
                break;
            case 'quick_wins':
                filtered = allData.filter(item =>
                    item.volume >= 50 && item.difficulty <= 40 && (item.rankings.synopsys === 0 || item.rankings.synopsys > 20)
                );
                break;
            case 'strategic':
                filtered = allData.filter(item => item.volume >= 100 && item.rankings.synopsys === 0);
                break;
        }

        setFilteredData(filtered);
    }, [activeCategory, allData]);

    const toggleRow = (index: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedRows(newExpanded);
    };

    const getCompetitorStatus = (synopsysRank: number, competitorRank: number) => {
        if (competitorRank === 0) return { text: 'Not Ranking', color: 'text-gray-400', bg: 'bg-gray-50' };
        if (competitorRank < synopsysRank || synopsysRank === 0) {
            return { text: `#${competitorRank}`, color: 'text-red-700', bg: 'bg-red-50' };
        }
        if (competitorRank > synopsysRank) {
            return { text: `#${competitorRank}`, color: 'text-green-700', bg: 'bg-green-50' };
        }
        return { text: `#${competitorRank}`, color: 'text-gray-700', bg: 'bg-gray-50' };
    };

    const getCategoryBadge = (item: CompetitorKeywordData) => {
        const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
        const betterCompetitors = competitors.filter(r => r > 0 && r < (item.rankings.synopsys || 999)).length;

        if (item.rankings.synopsys <= 10) {
            const worse = competitors.filter(r => r === 0 || r > item.rankings.synopsys);
            if (worse.length >= 3) return { icon: Trophy, text: 'Advantage', color: 'text-teal-700 bg-teal-50 border-teal-200' };
        }

        if (betterCompetitors >= 2) {
            return { icon: AlertCircle, text: 'Critical Gap', color: 'text-red-700 bg-red-50 border-red-200' };
        }

        if (item.volume >= 50 && item.difficulty <= 40 && (item.rankings.synopsys === 0 || item.rankings.synopsys > 20)) {
            return { icon: TrendingUp, text: 'Quick Win', color: 'text-violet-700 bg-violet-50 border-violet-200' };
        }

        if (betterCompetitors >= 1) {
            return { icon: Award, text: 'Opportunity', color: 'text-blue-700 bg-blue-50 border-blue-200' };
        }

        return null;
    };

    if (loading) {
        return (
            <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    const categories = [
        { id: 'all', name: 'All Keywords', count: allData.length },
        {
            id: 'advantages', name: 'Competitive Advantages', count: allData.filter(item => {
                if (item.rankings.synopsys === 0 || item.rankings.synopsys > 10) return false;
                const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                const worse = competitors.filter(r => r === 0 || r > item.rankings.synopsys);
                return worse.length >= 3 && item.volume >= 40;
            }).length
        },
        {
            id: 'opportunities', name: 'Top Opportunities', count: allData.filter(item => {
                const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                const better = competitors.filter(r => r > 0 && r < item.rankings.synopsys);
                return better.length >= 1 && item.volume >= 50;
            }).length
        },
        {
            id: 'gaps', name: 'Critical Gaps', count: allData.filter(item => {
                const competitors = [item.rankings.semiengineering, item.rankings.ansys, item.rankings.imagination, item.rankings.mobileye];
                const better = competitors.filter(r => r > 0 && r < item.rankings.synopsys);
                return better.length >= 2;
            }).length
        },
        {
            id: 'quick_wins', name: 'Quick Wins', count: allData.filter(item =>
                item.volume >= 50 && item.difficulty <= 40 && (item.rankings.synopsys === 0 || item.rankings.synopsys > 20)
            ).length
        },
        { id: 'strategic', name: 'Strategic Priorities', count: allData.filter(item => item.volume >= 100 && item.rankings.synopsys === 0).length }
    ];

    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Competitive Keyword Intelligence</h2>
                        <p className="text-sm text-gray-600 font-medium">Synopsys vs. 4 key competitors across {allData.length} keywords</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id as CategoryType)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeCategory === cat.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {cat.name}
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${activeCategory === cat.id ? 'bg-blue-500' : 'bg-gray-200'
                            }`}>
                            {cat.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="bg-white/80 rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase w-8"></th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase">Keyword</th>
                                <th className="text-center py-4 px-3 text-xs font-bold text-gray-700 uppercase">Volume</th>
                                <th className="text-center py-4 px-3 text-xs font-bold text-gray-700 uppercase">Difficulty</th>
                                <th className="text-center py-4 px-3 text-xs font-bold text-gray-700 uppercase">CPC</th>
                                <th className="text-center py-4 px-3 text-xs font-bold text-gray-700 uppercase">Synopsys</th>
                                <th className="text-center py-4 px-3 text-xs font-bold text-gray-700 uppercase">Competitors</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => {
                                const isExpanded = expandedRows.has(index);
                                const badge = getCategoryBadge(item);
                                const BadgeIcon = badge?.icon;
                                const competitors = [
                                    { name: 'Semi Engineering', rank: item.rankings.semiengineering, page: item.pages.semiengineering },
                                    { name: 'Ansys', rank: item.rankings.ansys, page: item.pages.ansys },
                                    { name: 'Imagination Tech', rank: item.rankings.imagination, page: item.pages.imagination },
                                    { name: 'Mobileye', rank: item.rankings.mobileye, page: item.pages.mobileye }
                                ];
                                const betterCompetitors = competitors.filter(c => c.rank > 0 && c.rank < (item.rankings.synopsys || 999));

                                return (
                                    <>
                                        <tr
                                            key={index}
                                            onClick={() => toggleRow(index)}
                                            className="border-b border-gray-100 hover:bg-blue-50/30 cursor-pointer transition-colors"
                                        >
                                            <td className="py-3 px-4">
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-gray-600" />
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{item.keyword}</p>
                                                    <p className="text-xs text-gray-500 capitalize mt-0.5">{item.intent}</p>
                                                </div>
                                            </td>
                                            <td className="text-center py-3 px-3">
                                                <span className="text-sm font-bold text-blue-600">{item.volume.toLocaleString()}</span>
                                            </td>
                                            <td className="text-center py-3 px-3">
                                                <span className={`text-sm font-bold px-2 py-1 rounded ${item.difficulty <= 30 ? 'bg-green-100 text-green-700' :
                                                        item.difficulty <= 60 ? 'bg-amber-100 text-amber-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {item.difficulty}
                                                </span>
                                            </td>
                                            <td className="text-center py-3 px-3">
                                                <span className="text-sm font-semibold text-gray-700">${item.cpc.toFixed(2)}</span>
                                            </td>
                                            <td className="text-center py-3 px-3">
                                                <span className={`text-sm font-bold px-3 py-1 rounded ${item.rankings.synopsys === 0 ? 'bg-red-100 text-red-700' :
                                                        item.rankings.synopsys <= 10 ? 'bg-green-100 text-green-700' :
                                                            item.rankings.synopsys <= 20 ? 'bg-amber-100 text-amber-700' :
                                                                'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {item.rankings.synopsys === 0 ? 'NR' : `#${item.rankings.synopsys}`}
                                                </span>
                                            </td>
                                            <td className="text-center py-3 px-3">
                                                <span className={`text-sm font-bold px-2 py-1 rounded ${betterCompetitors.length >= 2 ? 'bg-red-100 text-red-700' :
                                                        betterCompetitors.length === 1 ? 'bg-amber-100 text-amber-700' :
                                                            'bg-green-100 text-green-700'
                                                    }`}>
                                                    {betterCompetitors.length} ahead
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                {badge && BadgeIcon && (
                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-semibold ${badge.color}`}>
                                                        <BadgeIcon className="w-3 h-3" />
                                                        {badge.text}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-gray-50 border-b border-gray-200">
                                                <td colSpan={8} className="py-4 px-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 mb-3">Competitor Rankings</h4>
                                                            <div className="space-y-2">
                                                                {competitors.map((comp, i) => {
                                                                    const status = getCompetitorStatus(item.rankings.synopsys, comp.rank);
                                                                    return (
                                                                        <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${status.bg}`}>
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="text-sm font-semibold text-gray-900">{comp.name}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-3">
                                                                                <span className={`text-sm font-bold ${status.color}`}>{status.text}</span>
                                                                                {comp.page && comp.page !== '-' && (
                                                                                    <a
                                                                                        href={comp.page}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                        className="text-blue-600 hover:text-blue-800"
                                                                                    >
                                                                                        <ExternalLink className="w-4 h-4" />
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 mb-3">Keyword Metrics</h4>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                                    <p className="text-xs text-gray-500 mb-1">Search Volume</p>
                                                                    <p className="text-lg font-bold text-gray-900">{item.volume.toLocaleString()}</p>
                                                                </div>
                                                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                                    <p className="text-xs text-gray-500 mb-1">Keyword Difficulty</p>
                                                                    <p className="text-lg font-bold text-gray-900">{item.difficulty}%</p>
                                                                </div>
                                                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                                    <p className="text-xs text-gray-500 mb-1">Cost Per Click</p>
                                                                    <p className="text-lg font-bold text-gray-900">${item.cpc.toFixed(2)}</p>
                                                                </div>
                                                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                                    <p className="text-xs text-gray-500 mb-1">Competition</p>
                                                                    <p className="text-lg font-bold text-gray-900">{(item.competitionDensity * 100).toFixed(0)}%</p>
                                                                </div>
                                                            </div>
                                                            {item.pages.synopsys && item.pages.synopsys !== '-' && (
                                                                <div className="mt-3 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                                    <p className="text-xs text-blue-700 font-semibold mb-1">Synopsys Landing Page</p>
                                                                    <a
                                                                        href={item.pages.synopsys}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        className="text-xs text-blue-600 hover:text-blue-800 underline break-all"
                                                                    >
                                                                        {item.pages.synopsys}
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-xs text-gray-600 flex items-center justify-between">
                <p>Showing {filteredData.length} of {allData.length} keywords</p>
                <p>Click any row to see detailed competitor comparison</p>
            </div>
        </div>
    );
}
