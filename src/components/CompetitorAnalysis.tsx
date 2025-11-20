import { Target, ExternalLink, DollarSign, Search, TrendingUp } from 'lucide-react';
import type { CompetitorData } from '../types';

interface CompetitorAnalysisProps {
    competitors: CompetitorData[];
}

export default function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
    if (!competitors || competitors.length === 0) {
        return (
            <div className="glass-card rounded-2xl shadow-xl p-6">
                <div className="text-center text-gray-600">No competitor data available</div>
            </div>
        );
    }

    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value}`;
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Competitor Analysis</h3>
                <p className="text-sm text-gray-600">Top competitors in the EDA space</p>
            </div>

            <div className="space-y-4">
                {competitors.map((competitor, index) => (
                    <div key={index} className="border-2 border-gray-200/50 rounded-xl p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group bg-white/50 backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                            <a
                                href={`https://${competitor.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 group/link"
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h4 className="text-sm font-bold text-blue-600 group-hover/link:text-blue-800 group-hover/link:underline">{competitor.name}</h4>
                                        <ExternalLink className="w-3 h-3 text-blue-500 group-hover/link:scale-110 transition-transform" />
                                    </div>
                                    <p className="text-xs text-gray-600 font-medium">{competitor.commonKeywords.toLocaleString()} common keywords</p>
                                </div>
                            </a>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{competitor.traffic.toLocaleString()}</p>
                                <p className="text-xs text-gray-600 font-medium">monthly traffic</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow">
                                    <Search className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Organic Keywords</p>
                                    <p className="text-sm font-bold text-gray-900">{competitor.organicKeywords.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow">
                                    <DollarSign className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Traffic Value</p>
                                    <p className="text-sm font-bold text-gray-900">{formatCurrency(competitor.organicCost)}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-2 rounded-lg shadow">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Paid Keywords</p>
                                    <p className="text-sm font-bold text-gray-900">{competitor.adwordsKeywords.toLocaleString()}</p>
                                    {competitor.adwordsKeywords > 0 && (
                                        <span className="inline-block px-1.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-700 rounded">Active</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600 font-semibold">Competition Level</span>
                                <span className="font-bold text-gray-900">{competitor.competitionLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${competitor.competitionLevel >= 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                            competitor.competitionLevel >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                                'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                        }`}
                                    style={{ width: `${competitor.competitionLevel}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
