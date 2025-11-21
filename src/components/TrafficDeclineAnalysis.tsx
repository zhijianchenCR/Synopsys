import { TrendingDown, AlertTriangle, Target, Zap } from 'lucide-react';

interface DeclineReason {
    reason: string;
    impact: string;
    severity: 'high' | 'medium' | 'low';
    remedialAction: string;
    timeline: string;
    expectedImprovement: string;
}

interface TrafficDeclineAnalysisProps {
    reasons: DeclineReason[];
}

const TrafficDeclineAnalysis = ({ reasons }: TrafficDeclineAnalysisProps) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high':
                return 'from-red-500 to-red-600';
            case 'medium':
                return 'from-orange-500 to-orange-600';
            case 'low':
                return 'from-yellow-500 to-yellow-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getSeverityBg = (severity: string) => {
        switch (severity) {
            case 'high':
                return 'bg-red-50 border-red-200';
            case 'medium':
                return 'bg-orange-50 border-orange-200';
            case 'low':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
                    <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Traffic Decline Analysis</h2>
                    <p className="text-sm text-gray-600 font-medium">Top 5 reasons for downward traffic trends and remedial actions</p>
                </div>
            </div>

            <div className="space-y-4">
                {reasons.map((reason, index) => (
                    <div
                        key={index}
                        className={`${getSeverityBg(reason.severity)} rounded-xl p-5 border-2 transition-all duration-200 hover:shadow-lg`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3 flex-1">
                                <div className={`bg-gradient-to-br ${getSeverityColor(reason.severity)} p-2 rounded-lg shadow-md mt-1`}>
                                    <AlertTriangle className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{reason.reason}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${reason.severity === 'high' ? 'bg-red-200 text-red-800' :
                                                reason.severity === 'medium' ? 'bg-orange-200 text-orange-800' :
                                                    'bg-yellow-200 text-yellow-800'
                                            }`}>
                                            {reason.severity.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium">{reason.impact}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs text-blue-800 font-bold">REMEDIAL ACTION</p>
                                </div>
                                <p className="text-sm text-gray-900 font-medium">{reason.remedialAction}</p>
                                <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                                    <span className="text-gray-600 font-semibold">Timeline:</span>
                                    <span className="text-gray-900 font-bold">{reason.timeline}</span>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-emerald-600" />
                                    <p className="text-xs text-emerald-800 font-bold">EXPECTED IMPROVEMENT</p>
                                </div>
                                <p className="text-2xl font-bold text-emerald-900">{reason.expectedImprovement}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrafficDeclineAnalysis;
