import { DollarSign, Users } from 'lucide-react';
import type { AdPerformanceData } from '../types';

interface PaidVsOrganicProps {
    data: AdPerformanceData[];
}

export default function PaidVsOrganic({ data }: PaidVsOrganicProps) {
    if (!data || data.length === 0) {
        return (
            <div className="glass-card rounded-2xl shadow-xl p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Paid vs Organic Traffic</h3>
                    <p className="text-sm text-gray-600">No data available</p>
                </div>
            </div>
        );
    }

    const currentMonth = data[0];

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Paid vs Organic Traffic</h3>
                <p className="text-sm text-gray-600">Monthly comparison of traffic sources</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Organic Traffic</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{currentMonth.organicTraffic.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-medium">{currentMonth.month}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Paid Traffic</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{currentMonth.paidTraffic.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 font-medium">{currentMonth.month}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{currentMonth.month}</span>
                    <span className="text-sm font-bold text-gray-900">{(currentMonth.organicTraffic + currentMonth.paidTraffic).toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 text-xs font-semibold text-gray-600">Organic</div>
                        <div className="flex-1 relative">
                            <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 flex items-center justify-center transition-all duration-300"
                                    style={{ width: `${(currentMonth.organicTraffic / (currentMonth.organicTraffic + currentMonth.paidTraffic)) * 100}%`, minWidth: '80px' }}
                                >
                                    <span className="text-sm font-bold text-white">
                                        {currentMonth.organicTraffic.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-20 text-right text-sm font-bold text-gray-700">
                            {currentMonth.organicTraffic.toLocaleString()}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-16 text-xs font-semibold text-gray-600">Paid</div>
                        <div className="flex-1 relative">
                            <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-pink-500 flex items-center justify-center transition-all duration-300"
                                    style={{ width: `${(currentMonth.paidTraffic / (currentMonth.organicTraffic + currentMonth.paidTraffic)) * 100}%`, minWidth: '80px' }}
                                >
                                    <span className="text-sm font-bold text-white">
                                        {currentMonth.paidTraffic.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-20 text-right text-sm font-bold text-gray-700">
                            {currentMonth.paidTraffic.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t-2 border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Organic</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Paid</span>
                </div>
            </div>
        </div>
    );
}
