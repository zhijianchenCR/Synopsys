import { TrendingUp, CircleDollarSign, Percent, Target } from 'lucide-react';
import type { AdPerformanceData } from '../types';

interface ROIAnalysisProps {
    data: AdPerformanceData[];
}

export default function ROIAnalysis({ data }: ROIAnalysisProps) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card rounded-2xl shadow-xl p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">ROI Analysis</h3>
                    <p className="text-sm text-gray-600">No data available</p>
                </div>
            </div>
        );
    }

    const currentMonth = data[data.length - 1];

    // Calculate marketing-friendly metrics
    const totalTraffic = currentMonth.organicTraffic + currentMonth.paidTraffic;
    const organicPercentage = (currentMonth.organicTraffic / totalTraffic) * 100;
    const paidPercentage = (currentMonth.paidTraffic / totalTraffic) * 100;

    const costPerPaidVisit = currentMonth.paidTraffic > 0
        ? currentMonth.adSpend / currentMonth.paidTraffic
        : 0;

    // Equivalent cost if we paid for organic traffic
    const costIfPaidForOrganic = currentMonth.organicTraffic * costPerPaidVisit;
    const organicSavings = costIfPaidForOrganic;

    // Simple ROAS for paid campaigns
    const paidROAS = currentMonth.adSpend > 0
        ? (currentMonth.paidTraffic * costPerPaidVisit) / currentMonth.adSpend
        : 0;

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Traffic Economics</h3>
                <p className="text-sm text-gray-600">Cost efficiency and channel performance</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-lg shadow">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Organic Visitors</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 mb-1">{(currentMonth.organicTraffic / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600 font-medium">{organicPercentage.toFixed(2)}% of traffic</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow">
                            <Target className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Paid Visitors</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-1">{currentMonth.paidTraffic.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-medium">{paidPercentage.toFixed(2)}% of traffic</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow">
                            <CircleDollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Cost Per Visit</span>
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-1">${costPerPaidVisit.toFixed(2)}</p>
                    <p className="text-xs text-gray-600 font-medium">Paid channel CPA</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg shadow">
                            <Percent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Monthly Ad Spend</span>
                    </div>
                    <p className="text-3xl font-bold text-amber-600 mb-1">${currentMonth.adSpend >= 1000 ? (currentMonth.adSpend / 1000).toFixed(1) + 'K' : currentMonth.adSpend.toFixed(0)}</p>
                    <p className="text-xs text-gray-600 font-medium">Paid advertising budget</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-emerald-200">
                <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-lg shadow-lg flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 mb-2">Channel Performance Summary</h4>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            Organic channels drive <span className="font-bold text-emerald-600">{organicPercentage.toFixed(1)}%</span> of your traffic ({currentMonth.organicTraffic.toLocaleString()} visitors) at zero direct cost. Paid channels contribute <span className="font-bold text-blue-600">{currentMonth.paidTraffic.toLocaleString()}</span> visitors at <span className="font-bold text-purple-600">${costPerPaidVisit.toFixed(2)}</span> per visit.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-gray-600 font-medium mb-1">Total Traffic</p>
                                <p className="text-lg font-bold text-gray-900">{totalTraffic.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                                <p className="text-xs text-gray-600 font-medium mb-1">Monthly Budget</p>
                                <p className="text-lg font-bold text-gray-900">${currentMonth.adSpend >= 1000 ? (currentMonth.adSpend / 1000).toFixed(0) + 'K' : currentMonth.adSpend.toFixed(0)}</p>
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
                                <p className="text-xs text-gray-500">Organic</p>
                                <p className="text-sm font-bold text-emerald-600">{(currentMonth.organicTraffic / 1000).toFixed(0)}K visits</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Paid</p>
                                <p className="text-sm font-bold text-blue-600">{currentMonth.paidTraffic} visits</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="text-sm font-bold text-gray-900">${currentMonth.adSpend >= 1000 ? (currentMonth.adSpend / 1000).toFixed(0) + 'K' : currentMonth.adSpend.toFixed(0)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
