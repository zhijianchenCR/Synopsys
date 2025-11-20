import { Building2, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Competitor } from '../data/competitiveIntelligence';

interface CompetitorComparisonProps {
    competitors: Competitor[];
}

const CompetitorComparison = ({ competitors }: CompetitorComparisonProps) => {
    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2.5 rounded-xl shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Competitive Landscape</h2>
                    <p className="text-sm text-gray-600 font-medium">Key competitors in EDA and Semiconductor IP space</p>
                </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {competitors.map((competitor, index) => (
                    <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{competitor.name}</h3>
                                <p className="text-sm text-gray-600 font-medium">{competitor.domain}</p>
                            </div>
                            {competitor.commonKeywords && (
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 font-medium">Common Keywords</p>
                                    <p className="text-2xl font-bold text-blue-600">{competitor.commonKeywords}</p>
                                    {competitor.trafficValue && (
                                        <p className="text-xs text-gray-600 font-bold mt-1">{competitor.trafficValue} value</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <p className="text-xs text-gray-500 font-bold mb-1">PRIMARY FOCUS</p>
                            <p className="text-sm text-gray-700 font-medium">{competitor.focus}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <p className="text-xs text-emerald-800 font-bold">STRENGTHS</p>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">{competitor.strengths}</p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    <p className="text-xs text-amber-800 font-bold">WEAKNESSES</p>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">{competitor.weaknesses}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitorComparison;
