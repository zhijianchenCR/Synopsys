import { useEffect, useState } from 'react';
import { Target, TrendingUp, Award, AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { parseCompetitorKeywords, getTopOpportunities, getCompetitorGaps, CompetitorKeywordData } from '../utils/competitorParser';

export default function CompetitorKeywordGap() {
    const [opportunities, setOpportunities] = useState<CompetitorKeywordData[]>([]);
    const [gaps, setGaps] = useState<CompetitorKeywordData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await parseCompetitorKeywords();
                setOpportunities(getTopOpportunities(data, 8));
                setGaps(getCompetitorGaps(data).slice(0, 8));
            } catch (error) {
                console.error('Error loading competitor data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    const getLeadingCompetitor = (item: CompetitorKeywordData) => {
        const competitors = [
            { name: 'Semi Engineering', rank: item.rankings.semiengineering, page: item.pages.semiengineering },
            { name: 'Ansys', rank: item.rankings.ansys, page: item.pages.ansys },
            { name: 'Imagination Tech', rank: item.rankings.imagination, page: item.pages.imagination },
            { name: 'Mobileye', rank: item.rankings.mobileye, page: item.pages.mobileye }
        ].filter(c => c.rank > 0 && c.rank < item.rankings.synopsys)
            .sort((a, b) => a.rank - b.rank);

        return competitors[0] || null;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Competitive Keyword Intelligence</h2>
                    <p className="text-sm text-gray-600 font-medium">Identify gaps and opportunities vs. key competitors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Opportunities */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Top Keyword Opportunities</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        High-value keywords where competitors rank better but difficulty is achievable
                    </p>

                    <div className="space-y-3">
                        {opportunities.map((item, idx) => {
                            const leader = getLeadingCompetitor(item);
                            return (
                                <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Search className="w-4 h-4 text-green-700" />
                                                <span className="font-semibold text-gray-900 text-sm">{item.keyword}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                                                <span className="bg-white px-2 py-0.5 rounded font-medium">{item.volume.toLocaleString()} vol</span>
                                                <span className="bg-white px-2 py-0.5 rounded font-medium">KD: {item.difficulty}</span>
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{item.intent}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-green-200">
                                        <div className="flex items-center space-x-4 text-xs">
                                            <div>
                                                <span className="text-gray-500">Synopsys: </span>
                                                <span className="font-bold text-gray-900">#{item.rankings.synopsys || 'N/A'}</span>
                                            </div>
                                            {leader && (
                                                <div>
                                                    <span className="text-gray-500">{leader.name}: </span>
                                                    <span className="font-bold text-green-700">#{leader.rank}</span>
                                                </div>
                                            )}
                                        </div>
                                        {leader && (
                                            <a
                                                href={leader.page}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
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

                {/* Competitive Gaps */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <h3 className="text-lg font-bold text-gray-900">Critical Competitive Gaps</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Keywords where 2+ competitors significantly outrank Synopsys
                    </p>

                    <div className="space-y-3">
                        {gaps.map((item, idx) => {
                            const competitors = [
                                { name: 'Semi', rank: item.rankings.semiengineering },
                                { name: 'Ansys', rank: item.rankings.ansys },
                                { name: 'Imagination', rank: item.rankings.imagination },
                                { name: 'Mobileye', rank: item.rankings.mobileye }
                            ].filter(c => c.rank > 0 && c.rank < item.rankings.synopsys)
                                .sort((a, b) => a.rank - b.rank)
                                .slice(0, 3);

                            return (
                                <div key={idx} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <Search className="w-4 h-4 text-orange-700" />
                                                <span className="font-semibold text-gray-900 text-sm">{item.keyword}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                                                <span className="bg-white px-2 py-0.5 rounded font-medium">{item.volume.toLocaleString()} vol</span>
                                                <span className="bg-white px-2 py-0.5 rounded font-medium">KD: {item.difficulty}</span>
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{item.intent}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-orange-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-500">Rankings:</span>
                                            <span className="text-xs font-bold text-gray-900">Synopsys: #{item.rankings.synopsys}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                                            {competitors.map((comp, i) => (
                                                <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-orange-300">
                                                    <span className="text-gray-600">{comp.name}: </span>
                                                    <span className="font-bold text-orange-700">#{comp.rank}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">{opportunities.length}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Quick Win Opportunities</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <span className="text-2xl font-bold text-gray-900">{gaps.length}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Critical Gaps to Address</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">
                            {opportunities.reduce((sum, item) => sum + item.volume, 0).toLocaleString()}
                        </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Monthly Search Volume</p>
                </div>
            </div>
        </div>
    );
}
