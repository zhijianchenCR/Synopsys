import { AlertTriangle, TrendingDown, TrendingUp, Target, Lightbulb, ArrowUpCircle } from 'lucide-react';
import type { KeywordData } from '../types';

interface RemedialAction {
    type: 'critical' | 'warning' | 'opportunity';
    category: string;
    issue: string;
    impact: string;
    action: string;
    priority: 'High' | 'Medium' | 'Low';
    keywords: string[];
}

interface KeywordRemedialActionsProps {
    keywords: KeywordData[];
}

export default function KeywordRemedialActions({ keywords }: KeywordRemedialActionsProps) {
    const generateRemedialActions = (): RemedialAction[] => {
        const actions: RemedialAction[] = [];

        const decliningKeywords = keywords.filter(
            kw => kw.previousPosition > 0 && kw.position > kw.previousPosition
        );

        const highVolumeLowRank = keywords.filter(
            kw => kw.volume > 1000 && kw.position > 10 && kw.position <= 20
        );

        const position11to20 = keywords.filter(
            kw => kw.position >= 11 && kw.position <= 20 && kw.volume > 500
        );

        const highDifficultyLowRank = keywords.filter(
            kw => kw.difficulty > 70 && kw.position > 20
        );

        const lowTrafficHighVolume = keywords.filter(
            kw => kw.volume > 2000 && kw.traffic < 50 && kw.position > 15
        );

        if (decliningKeywords.length > 0) {
            const topDeclining = decliningKeywords
                .sort((a, b) => (b.position - b.previousPosition) - (a.position - a.previousPosition))
                .slice(0, 5);

            const totalLoss = topDeclining.reduce((sum, kw) => sum + (kw.position - kw.previousPosition), 0);

            actions.push({
                type: 'critical',
                category: 'Position Decline',
                issue: `${decliningKeywords.length} keywords have dropped in rankings`,
                impact: `Average position loss: ${(totalLoss / topDeclining.length).toFixed(1)} positions. Potential traffic loss: ${Math.round(decliningKeywords.reduce((sum, kw) => sum + kw.traffic * 0.3, 0)).toLocaleString()} visits/month`,
                action: 'Immediate content audit and refresh needed. Update outdated information, improve content depth, check for technical SEO issues, and analyze competitor improvements.',
                priority: 'High',
                keywords: topDeclining.map(kw => kw.keyword)
            });
        }

        if (highVolumeLowRank.length > 0) {
            const topOpportunities = highVolumeLowRank
                .sort((a, b) => (b.volume * (21 - b.position)) - (a.volume * (21 - a.position)))
                .slice(0, 5);

            const potentialTraffic = topOpportunities.reduce((sum, kw) => sum + Math.round(kw.volume * 0.15), 0);

            actions.push({
                type: 'opportunity',
                category: 'Quick Win Potential',
                issue: `${highVolumeLowRank.length} high-volume keywords ranking just outside top 10`,
                impact: `Moving these to top 10 could generate ${potentialTraffic.toLocaleString()} additional visits/month (estimated ${Math.round(potentialTraffic * 2.5).toLocaleString()} USD value)`,
                action: 'Focus on improving on-page SEO: optimize title tags, add internal links, improve content structure with H2/H3 tags, add relevant images, and enhance user engagement signals.',
                priority: 'High',
                keywords: topOpportunities.map(kw => kw.keyword)
            });
        }

        if (position11to20.length > 10) {
            const best = position11to20
                .sort((a, b) => b.volume - a.volume)
                .slice(0, 5);

            actions.push({
                type: 'warning',
                category: 'Missed Opportunities',
                issue: `${position11to20.length} keywords stuck in positions 11-20`,
                impact: `These keywords have significant search volume but minimal visibility. Combined monthly searches: ${position11to20.reduce((sum, kw) => sum + kw.volume, 0).toLocaleString()}`,
                action: 'Create comprehensive, long-form content (2000+ words) targeting these keywords. Add FAQ sections, improve page speed, build quality backlinks, and optimize for featured snippets.',
                priority: 'Medium',
                keywords: best.map(kw => kw.keyword)
            });
        }

        if (lowTrafficHighVolume.length > 0) {
            const topLosers = lowTrafficHighVolume.slice(0, 5);

            actions.push({
                type: 'warning',
                category: 'Traffic Conversion Issue',
                issue: `${lowTrafficHighVolume.length} high-volume keywords generating minimal traffic`,
                impact: `Keywords with ${lowTrafficHighVolume.reduce((sum, kw) => sum + kw.volume, 0).toLocaleString()} combined searches generating only ${lowTrafficHighVolume.reduce((sum, kw) => sum + kw.traffic, 0).toLocaleString()} visits`,
                action: 'Improve meta titles and descriptions to increase CTR. Test different title formats, add compelling calls-to-action, use power words, and ensure titles match search intent.',
                priority: 'Medium',
                keywords: topLosers.map(kw => kw.keyword)
            });
        }

        if (highDifficultyLowRank.length > 5) {
            actions.push({
                type: 'warning',
                category: 'Resource Allocation',
                issue: `${highDifficultyLowRank.length} high-difficulty keywords ranking poorly`,
                impact: 'Resources being spent on extremely competitive keywords with low ROI potential',
                action: 'Reassess keyword targeting strategy. Consider shifting focus to medium-difficulty keywords with better opportunity scores. Build domain authority through easier wins first.',
                priority: 'Low',
                keywords: highDifficultyLowRank.slice(0, 5).map(kw => kw.keyword)
            });
        }

        const topPerformers = keywords
            .filter(kw => kw.position <= 3 && kw.volume > 1000)
            .slice(0, 5);

        if (topPerformers.length > 0) {
            actions.push({
                type: 'opportunity',
                category: 'Protect Top Rankings',
                issue: `${topPerformers.length} high-value keywords in top 3 positions`,
                impact: `These keywords drive ${topPerformers.reduce((sum, kw) => sum + kw.traffic, 0).toLocaleString()} visits/month worth $${topPerformers.reduce((sum, kw) => sum + kw.trafficCost, 0).toLocaleString()}`,
                action: 'Maintain and strengthen these positions: regularly update content, monitor competitor movements, build additional quality backlinks, and ensure technical SEO health.',
                priority: 'High',
                keywords: topPerformers.map(kw => kw.keyword)
            });
        }

        return actions.sort((a, b) => {
            const priorityOrder = { High: 0, Medium: 1, Low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    };

    const actions = generateRemedialActions();

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'critical':
                return <AlertTriangle className="w-5 h-5 text-red-600" />;
            case 'warning':
                return <TrendingDown className="w-5 h-5 text-orange-600" />;
            case 'opportunity':
                return <TrendingUp className="w-5 h-5 text-emerald-600" />;
            default:
                return <Target className="w-5 h-5 text-blue-600" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'critical':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-orange-50 border-orange-200';
            case 'opportunity':
                return 'bg-emerald-50 border-emerald-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-red-600 text-white';
            case 'Medium':
                return 'bg-orange-500 text-white';
            case 'Low':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Remedial Actions & Recommendations</h3>
                    <p className="text-sm text-gray-600">Data-driven insights to improve keyword performance</p>
                </div>
            </div>

            <div className="space-y-4">
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className={`border-2 rounded-xl p-5 transition-all duration-200 hover:shadow-lg ${getTypeColor(action.type)}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                {getTypeIcon(action.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-base font-bold text-gray-900">{action.category}</h4>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getPriorityColor(action.priority)}`}>
                                        {action.priority} Priority
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Issue:</p>
                                        <p className="text-sm text-gray-800">{action.issue}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Impact:</p>
                                        <p className="text-sm text-gray-800">{action.impact}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                            <ArrowUpCircle className="w-4 h-4" />
                                            Recommended Action:
                                        </p>
                                        <p className="text-sm text-gray-900 font-medium bg-white/60 p-3 rounded-lg border border-gray-200">
                                            {action.action}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Affected Keywords ({action.keywords.length}):</p>
                                        <div className="flex flex-wrap gap-2">
                                            {action.keywords.slice(0, 5).map((keyword, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-white/80 border border-gray-300 rounded-full text-xs font-medium text-gray-700"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                            {action.keywords.length > 5 && (
                                                <span className="px-3 py-1 bg-gray-200 border border-gray-300 rounded-full text-xs font-medium text-gray-600">
                                                    +{action.keywords.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {actions.length === 0 && (
                    <div className="text-center py-12 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                        <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                        <p className="text-lg font-bold text-gray-900 mb-1">Excellent Performance!</p>
                        <p className="text-sm text-gray-600">No critical issues detected. Keep monitoring your keywords regularly.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
