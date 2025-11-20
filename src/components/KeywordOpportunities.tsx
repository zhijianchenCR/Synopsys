import { TrendingUp, Target, Zap, Shield } from 'lucide-react';

interface KeywordOpportunity {
    keyword: string;
    keywordType: 'Gap' | 'Predictive' | 'Defensive' | 'General';
    rationale: string;
    intent: string;
    relevance: number;
    competition: 'High' | 'Medium' | 'Low';
    suggestedBid: string;
    searchVolume?: number;
    competitorRanking?: number;
    opportunity?: string;
}


interface KeywordOpportunitiesProps {
    keywords: KeywordOpportunity[];
}

const KeywordOpportunities = ({ keywords }: KeywordOpportunitiesProps) => {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Gap':
                return <Target className="w-4 h-4" />;
            case 'Predictive':
                return <Zap className="w-4 h-4" />;
            case 'Defensive':
                return <Shield className="w-4 h-4" />;
            default:
                return <TrendingUp className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Gap':
                return 'bg-emerald-100 text-emerald-700 border-emerald-300';
            case 'Predictive':
                return 'bg-purple-100 text-purple-700 border-purple-300';
            case 'Defensive':
                return 'bg-orange-100 text-orange-700 border-orange-300';
            default:
                return 'bg-blue-100 text-blue-700 border-blue-300';
        }
    };

    const getRelevanceColor = (relevance: number) => {
        if (relevance >= 90) return 'text-emerald-600 bg-emerald-50';
        if (relevance >= 80) return 'text-blue-600 bg-blue-50';
        if (relevance >= 70) return 'text-amber-600 bg-amber-50';
        return 'text-gray-600 bg-gray-50';
    };

    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Keyword Expansion Opportunities</h2>
                    <p className="text-sm text-gray-600 font-medium mt-1">High-value keywords to target based on competitive analysis</p>
                </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {keywords.map((kw, index) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-base font-bold text-gray-900">{kw.keyword}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getTypeColor(kw.keywordType)} flex items-center gap-1`}>
                                        {getTypeIcon(kw.keywordType)}
                                        {kw.keywordType}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-3">{kw.rationale}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Intent</p>
                                        <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-700">{kw.intent}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Relevance</p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${getRelevanceColor(kw.relevance)}`}>
                                            {kw.relevance}/100
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Competition</p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${kw.competition === 'High' ? 'bg-red-100 text-red-700' :
                                                kw.competition === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {kw.competition}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium mb-1">Suggested Bid</p>
                                        <span className="text-sm font-bold text-gray-900">{kw.suggestedBid}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeywordOpportunities;
