import { CompetitorData } from '../data/synopsysData';
import { Target } from 'lucide-react';

interface CompetitorAnalysisProps {
    competitors: CompetitorData[];
}

export default function CompetitorAnalysis({ competitors }: CompetitorAnalysisProps) {
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
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{competitor.name}</h4>
                                    <p className="text-xs text-gray-600 font-medium">{competitor.commonKeywords.toLocaleString()} common keywords</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{competitor.traffic.toLocaleString()}</p>
                                <p className="text-xs text-gray-600 font-medium">monthly traffic</p>
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
