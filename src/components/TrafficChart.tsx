import { TrafficData } from '../data/synopsysData';

interface TrafficChartProps {
    data: TrafficData[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
    const maxTraffic = Math.max(...data.map(d => d.organicTraffic + d.paidTraffic + d.directTraffic + d.referralTraffic));

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Traffic Overview</h3>
                <p className="text-sm text-gray-600">Monthly traffic distribution by source</p>
            </div>

            <div className="flex items-center justify-end space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Organic</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Paid</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Direct</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow"></div>
                    <span className="text-xs font-semibold text-gray-600">Referral</span>
                </div>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => {
                    const total = item.organicTraffic + item.paidTraffic + item.directTraffic + item.referralTraffic;
                    const organicPercent = (item.organicTraffic / total) * 100;
                    const paidPercent = (item.paidTraffic / total) * 100;
                    const directPercent = (item.directTraffic / total) * 100;
                    const referralPercent = (item.referralTraffic / total) * 100;
                    const heightPercent = (total / maxTraffic) * 100;

                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">{item.month}</span>
                                <span className="text-sm font-bold text-gray-900">{total.toLocaleString()}</span>
                            </div>
                            <div className="relative h-12 bg-gray-100/50 rounded-xl overflow-hidden backdrop-blur-sm">
                                <div
                                    className="absolute inset-y-0 left-0 flex"
                                    style={{ width: `${heightPercent}%` }}
                                >
                                    <div
                                        className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer relative group"
                                        style={{ width: `${organicPercent}%` }}
                                        title={`Organic: ${item.organicTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.organicTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all cursor-pointer relative group"
                                        style={{ width: `${paidPercent}%` }}
                                        title={`Paid: ${item.paidTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.paidTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer relative group"
                                        style={{ width: `${directPercent}%` }}
                                        title={`Direct: ${item.directTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.directTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer relative group"
                                        style={{ width: `${referralPercent}%` }}
                                        title={`Referral: ${item.referralTraffic.toLocaleString()}`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold text-white drop-shadow">{item.referralTraffic.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
