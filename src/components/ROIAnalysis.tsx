import { TrendingUp, CircleDollarSign, Percent, Target } from 'lucide-react';
import { AdPerformanceData } from '../data/realData';

interface ROIAnalysisProps {
    data: AdPerformanceData[];
}

export default function ROIAnalysis({ data }: ROIAnalysisProps) {
    const currentMonth = data[0];

    const roi = ((currentMonth.organicValue - currentMonth.adSpend) / currentMonth.adSpend) * 100;
    const costPerAcquisition = currentMonth.adSpend / currentMonth.paidTraffic;
    const organicSavings = currentMonth.organicValue - currentMonth.adSpend;
    const organicToAdRatio = currentMonth.organicValue / currentMonth.adSpend;

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">ROI Analysis</h3>
                <p className="text-sm text-gray-600">Return on investment and cost efficiency metrics</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow">
                            <Percent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Current ROI</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 mb-1">{roi.toFixed(1)}%</p>
                    <p className="text-xs text-gray-600 font-medium">Return on ad spend</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow">
                            <Target className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Cost Per Visit</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-1">${costPerAcquisition.toFixed(2)}</p>
                    <p className="text-xs text-gray-600 font-medium">Paid traffic efficiency</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow">
                            <CircleDollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Organic Savings</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-1">${(organicSavings / 1000000).toFixed(2)}M</p>
                    <p className="text-xs text-gray-600 font-medium">Value saved vs paid</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Organic Multiplier</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-600 mb-1">{organicToAdRatio.toFixed(1)}x</p>
                    <p className="text-xs text-gray-600 font-medium">Value vs ad spend</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-emerald-200">
                <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-lg shadow-lg flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">ROI Performance Summary</h4>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            Your organic traffic generates <span className="font-bold text-emerald-600">{organicToAdRatio.toFixed(1)}x</span> more value
                            than your monthly ad spend. With a <span className="font-bold text-emerald-600">{roi.toFixed(0)}%</span> ROI,
                            you're effectively saving <span className="font-bold text-purple-600">${organicSavings >= 1000000 ? (organicSavings / 1000000).toFixed(2) + 'M' : (organicSavings / 1000).toFixed(0) + 'K'}</span> compared to acquiring the same traffic through paid channels.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-gray-600 font-medium mb-1">Ad Investment (Nov)</p>
                                <p className="text-lg font-bold text-gray-900">${currentMonth.adSpend >= 1000 ? (currentMonth.adSpend / 1000).toFixed(0) + 'K' : currentMonth.adSpend.toFixed(0)}</p>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-gray-600 font-medium mb-1">Organic Traffic Value</p>
                                <p className="text-lg font-bold text-gray-900">${currentMonth.organicValue >= 1000000 ? (currentMonth.organicValue / 1000000).toFixed(2) + 'M' : (currentMonth.organicValue / 1000).toFixed(0) + 'K'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Current Month Breakdown</h4>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold text-gray-700 w-24">{currentMonth.month}</span>
                        <div className="flex items-center space-x-4">
                            <div>
                                <p className="text-xs text-gray-500">ROI</p>
                                <p className="text-sm font-bold text-emerald-600">{roi.toFixed(0)}%</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">CPA</p>
                                <p className="text-sm font-bold text-blue-600">${costPerAcquisition.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Ad Spend</p>
                        <p className="text-sm font-bold text-gray-900">${(currentMonth.adSpend / 1000).toFixed(0)}K</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
