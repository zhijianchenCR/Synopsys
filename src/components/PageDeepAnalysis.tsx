import { FileText, TrendingDown, Lightbulb, AlertCircle, Users, ArrowUp } from 'lucide-react';

interface PageAnalysis {
    url: string;
    trafficChange: number;
    currentTraffic: number;
    mainReasons: string[];
    keywordExpansion: {
        currentKeywords: number;
        suggestedKeywords: string[];
        opportunityScore: number;
    };
    negativeFactors: string[];
    competitorInsights: {
        topCompetitors: string[];
        competitorAdvantage: string;
        actionableSteps: string[];
    };
}

interface PageDeepAnalysisProps {
    pages: PageAnalysis[];
}

const PageDeepAnalysis = ({ pages }: PageDeepAnalysisProps) => {
    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Deep Page Analysis</h2>
                    <p className="text-sm text-gray-600 font-medium">AI-powered insights for declining pages with competitive intelligence</p>
                </div>
            </div>

            <div className="space-y-6">
                {pages.map((page, index) => {
                    const pageTitle = page.url.split('/').pop()?.replace('.html', '').replace(/-/g, ' ') || page.url;

                    return (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{pageTitle}</h3>
                                    <p className="text-xs text-gray-500 font-mono break-all">{page.url}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-xs text-gray-500 font-medium">Traffic Change</p>
                                    <p className="text-2xl font-bold text-red-600 flex items-center gap-1">
                                        <TrendingDown className="w-5 h-5" />
                                        {page.trafficChange.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        <p className="text-xs text-red-800 font-bold">MAIN DECLINE REASONS</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {page.mainReasons.map((reason, idx) => (
                                            <li key={idx} className="text-sm text-gray-900 flex items-start">
                                                <span className="text-red-600 mr-2 font-bold">•</span>
                                                <span className="font-medium">{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Lightbulb className="w-5 h-5 text-blue-600" />
                                        <p className="text-xs text-blue-800 font-bold">KEYWORD EXPANSION OPPORTUNITY</p>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-gray-600 font-semibold">Current Keywords:</span>
                                            <span className="text-gray-900 font-bold">{page.keywordExpansion.currentKeywords}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-600 font-semibold">Opportunity Score:</span>
                                            <span className="text-blue-900 font-bold">{page.keywordExpansion.opportunityScore}/100</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-700 font-medium">
                                        <p className="font-bold text-blue-800 mb-1">Suggested Keywords:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {page.keywordExpansion.suggestedKeywords.map((kw, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-5 h-5 text-orange-600" />
                                        <p className="text-xs text-orange-800 font-bold">NEGATIVE FACTORS DETECTED</p>
                                    </div>
                                    <ul className="space-y-2">
                                        {page.negativeFactors.map((factor, idx) => (
                                            <li key={idx} className="text-sm text-gray-900 flex items-start">
                                                <span className="text-orange-600 mr-2 font-bold">⚠</span>
                                                <span className="font-medium">{factor}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Users className="w-5 h-5 text-emerald-600" />
                                        <p className="text-xs text-emerald-800 font-bold">COMPETITOR PERFORMANCE</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-600 font-semibold mb-1">Top Competitors:</p>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {page.competitorInsights.topCompetitors.map((comp, idx) => (
                                                <span key={idx} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">
                                                    {comp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-700 font-medium mb-2">
                                        <span className="font-bold text-emerald-800">Advantage:</span> {page.competitorInsights.competitorAdvantage}
                                    </p>
                                    <div className="bg-white/80 rounded p-2 border border-emerald-200">
                                        <p className="text-xs text-emerald-800 font-bold mb-1 flex items-center gap-1">
                                            <ArrowUp className="w-3 h-3" />
                                            Action Steps:
                                        </p>
                                        <ul className="space-y-1">
                                            {page.competitorInsights.actionableSteps.map((step, idx) => (
                                                <li key={idx} className="text-xs text-gray-900 flex items-start">
                                                    <span className="text-emerald-600 mr-1 font-bold">{idx + 1}.</span>
                                                    <span className="font-medium">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PageDeepAnalysis;
