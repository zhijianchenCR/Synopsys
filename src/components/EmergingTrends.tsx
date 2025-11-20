import { Sparkles, TrendingUp } from 'lucide-react';

interface EmergingTrendsProps {
    trends: string[];
    competitiveGaps: string[];
}

const EmergingTrends = ({ trends, competitiveGaps }: EmergingTrendsProps) => {
    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-2.5 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Emerging Trends & Gaps</h2>
                    <p className="text-sm text-gray-600 font-medium">Future opportunities in EDA and semiconductor space</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-cyan-600" />
                        <h3 className="text-lg font-bold text-gray-900">Emerging Market Trends</h3>
                    </div>
                    <div className="space-y-3">
                        {trends.map((trend, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-bold text-gray-900">Competitive Keyword Gaps</h3>
                    </div>
                    <div className="space-y-3">
                        {competitiveGaps.map((gap, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">{gap}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">Strategic Opportunity</h4>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            These trends represent untapped content and SEO opportunities where Synopsys can establish thought leadership before competitors dominate the space.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergingTrends;
