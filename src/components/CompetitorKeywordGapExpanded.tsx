import { useEffect, useState } from 'react';
import { Target, TrendingUp, Award, AlertTriangle, ExternalLink, Search, Trophy, Zap } from 'lucide-react';
import {
    parseCompetitorKeywords,
    getTopOpportunities,
    getCompetitorGaps,
    getCompetitiveAdvantages,
    getQuickWins,
    getStrategicPriorities,
    CompetitorKeywordData
} from '../utils/competitorParser';

export default function CompetitorKeywordGapExpanded() {
    const [opportunities, setOpportunities] = useState<CompetitorKeywordData[]>([]);
    const [gaps, setGaps] = useState<CompetitorKeywordData[]>([]);
    const [advantages, setAdvantages] = useState<CompetitorKeywordData[]>([]);
    const [quickWins, setQuickWins] = useState<CompetitorKeywordData[]>([]);
    const [strategic, setStrategic] = useState<CompetitorKeywordData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await parseCompetitorKeywords();
                setOpportunities(getTopOpportunities(data, 6));
                setGaps(getCompetitorGaps(data).slice(0, 6));
                setAdvantages(getCompetitiveAdvantages(data).slice(0, 6));
                setQuickWins(getQuickWins(data).slice(0, 6));
                setStrategic(getStrategicPriorities(data).slice(0, 6));
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
        ].filter(c => c.rank > 0 && c.rank < (item.rankings.synopsys || 999))
            .sort((a, b) => a.rank - b.rank);

        return competitors[0] || null;
    };

    const KeywordCard = ({ item, color = 'green' }: { item: CompetitorKeywordData; color: string }) => {
        const leader = getLeadingCompetitor(item);
        const colorClasses = {
            green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', icon: 'text-green-700', rank: 'text-green-700' },
            orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', icon: 'text-orange-700', rank: 'text-orange-700' },
            blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', icon: 'text-blue-700', rank: 'text-blue-700' },
            violet: { bg: 'from-violet-50 to-purple-50', border: 'border-violet-200', icon: 'text-violet-700', rank: 'text-violet-700' },
            teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-200', icon: 'text-teal-700', rank: 'text-teal-700' }
        };

        const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.green;

        return (
            <div className={`bg-gradient-to-br ${colors.bg} rounded-lg p-4 border ${colors.border} hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <Search className={`w-4 h-4 ${colors.icon}`} />
                            <span className="font-semibold text-gray-900 text-sm">{item.keyword}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
                            <span className="bg-white px-2 py-0.5 rounded font-medium">{item.volume.toLocaleString()} vol</span>
                            <span className="bg-white px-2 py-0.5 rounded font-medium">KD: {item.difficulty}</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium capitalize">{item.intent}</span>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center justify-between pt-2 border-t ${colors.border}`}>
                    <div className="flex items-center space-x-4 text-xs">
                        <div>
                            <span className="text-gray-500">Synopsys: </span>
                            <span className="font-bold text-gray-900">#{item.rankings.synopsys || 'Not Ranking'}</span>
                        </div>
                        {leader && (
                            <div>
                                <span className="text-gray-500">{leader.name}: </span>
                                <span className={`font-bold ${colors.rank}`}>#{leader.rank}</span>
                            </div>
                        )}
                    </div>
                    {leader && leader.page && (
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
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Competitive Keyword Intelligence</h2>
                    <p className="text-sm text-gray-600 font-medium">Comprehensive analysis across 5 strategic dimensions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Trophy className="w-5 h-5 text-teal-600" />
                        <h3 className="text-lg font-bold text-gray-900">Competitive Advantages</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Keywords where Synopsys already leads vs. most competitors
                    </p>
                    <div className="space-y-3">
                        {advantages.length > 0 ? advantages.map((item, idx) => (
                            <KeywordCard key={idx} item={item} color="teal" />
                        )) : (
                            <p className="text-sm text-gray-500 italic">No strong advantages identified</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Zap className="w-5 h-5 text-violet-600" />
                        <h3 className="text-lg font-bold text-gray-900">Quick Wins</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        High volume, low difficulty keywords for rapid gains
                    </p>
                    <div className="space-y-3">
                        {quickWins.length > 0 ? quickWins.map((item, idx) => (
                            <KeywordCard key={idx} item={item} color="violet" />
                        )) : (
                            <p className="text-sm text-gray-500 italic">No quick wins available</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Award className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">Strategic Priorities</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        High volume keywords where Synopsys has no ranking
                    </p>
                    <div className="space-y-3">
                        {strategic.length > 0 ? strategic.map((item, idx) => (
                            <KeywordCard key={idx} item={item} color="blue" />
                        )) : (
                            <p className="text-sm text-gray-500 italic">No strategic priorities</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Top Opportunities</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Best ROI keywords based on volume, difficulty, and competition
                    </p>
                    <div className="space-y-3">
                        {opportunities.length > 0 ? opportunities.map((item, idx) => (
                            <KeywordCard key={idx} item={item} color="green" />
                        )) : (
                            <p className="text-sm text-gray-500 italic">No opportunities found</p>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        <h3 className="text-lg font-bold text-gray-900">Critical Gaps</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Keywords where 2+ competitors significantly outrank Synopsys
                    </p>
                    <div className="space-y-3">
                        {gaps.length > 0 ? gaps.map((item, idx) => (
                            <KeywordCard key={idx} item={item} color="orange" />
                        )) : (
                            <p className="text-sm text-gray-500 italic">No critical gaps</p>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Analysis Summary</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Competitive Advantages</span>
                            <span className="text-lg font-bold text-teal-600">{advantages.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Quick Wins</span>
                            <span className="text-lg font-bold text-violet-600">{quickWins.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Strategic Priorities</span>
                            <span className="text-lg font-bold text-blue-600">{strategic.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Top Opportunities</span>
                            <span className="text-lg font-bold text-green-600">{opportunities.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Critical Gaps</span>
                            <span className="text-lg font-bold text-orange-600">{gaps.length}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-300">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">Total Potential Volume</span>
                                <span className="text-xl font-bold text-gray-900">
                                    {[...opportunities, ...gaps, ...quickWins, ...strategic]
                                        .reduce((sum, item) => sum + item.volume, 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
