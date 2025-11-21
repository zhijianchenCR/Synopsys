import { Building2, TrendingUp, PieChart } from 'lucide-react';

interface Competitor {
    name: string;
    marketShare: number;
    growthRate: number;
}

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
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{competitor.name}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">Growth Rate</p>
                                <p className="text-2xl font-bold text-emerald-600">{competitor.growthRate}%</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <PieChart className="w-5 h-5 text-blue-600" />
                                    <p className="text-xs text-blue-800 font-bold">MARKET SHARE</p>
                                </div>
                                <p className="text-3xl font-bold text-blue-900">{competitor.marketShare}%</p>
                            </div>

                            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    <p className="text-xs text-emerald-800 font-bold">GROWTH TRAJECTORY</p>
                                </div>
                                <p className="text-3xl font-bold text-emerald-900">+{competitor.growthRate}%</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-gray-600 font-semibold">Market Position</span>
                                <span className="font-bold text-gray-900">{competitor.marketShare}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                    style={{ width: `${competitor.marketShare}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitorComparison;
