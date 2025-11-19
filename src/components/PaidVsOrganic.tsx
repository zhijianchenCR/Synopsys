import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { AdPerformanceData } from '../data/synopsysData';

interface PaidVsOrganicProps {
    data: AdPerformanceData[];
}

export default function PaidVsOrganic({ data }: PaidVsOrganicProps) {
    const latestMonth = data[data.length - 1];
    const previousMonth = data[data.length - 2];

    const paidTrafficGrowth = ((latestMonth.paidTraffic - previousMonth.paidTraffic) / previousMonth.paidTraffic) * 100;
    const organicTrafficGrowth = ((latestMonth.organicTraffic - previousMonth.organicTraffic) / previousMonth.organicTraffic) * 100;

    const maxValue = Math.max(
        ...data.map(d => Math.max(d.paidTraffic, d.organicTraffic))
    );

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
                    <p className="text-2xl font-bold text-gray-900 mb-1">{latestMonth.organicTraffic.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                        {organicTrafficGrowth > 0 ? (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-bold ${organicTrafficGrowth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {organicTrafficGrowth > 0 ? '+' : ''}{organicTrafficGrowth.toFixed(1)}%
                        </span>
                        <span className="text-xs text-gray-500 font-medium">vs last month</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 uppercase">Paid Traffic</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{latestMonth.paidTraffic.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                        {paidTrafficGrowth > 0 ? (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-bold ${paidTrafficGrowth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {paidTrafficGrowth > 0 ? '+' : ''}{paidTrafficGrowth.toFixed(1)}%
                        </span>
                        <span className="text-xs text-gray-500 font-medium">vs last month</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => {
                    const totalTraffic = item.organicTraffic + item.paidTraffic;
                    const organicPercent = (item.organicTraffic / totalTraffic) * 100;
                    const paidPercent = (item.paidTraffic / totalTraffic) * 100;

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">{item.month}</span>
                                <span className="text-sm font-bold text-gray-900">{totalTraffic.toLocaleString()}</span>
                            </div>
                            <div className="relative h-10 bg-gray-100/50 rounded-xl overflow-hidden backdrop-blur-sm">
                                <div className="absolute inset-y-0 left-0 flex w-full">
                                    <div
                                        className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all cursor-pointer relative group"
                                        style={{ width: `${organicPercent}%` }}
                                        title={`Organic: ${item.organicTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.organicTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer relative group"
                                        style={{ width: `${paidPercent}%` }}
                                        title={`Paid: ${item.paidTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.paidTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
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
