import { Globe } from 'lucide-react';
import { useState } from 'react';

interface GeographicData {
    country: string;
    traffic: number;
    percentage: number;
}

interface GeographicDistributionProps {
    visitsData: GeographicData[];
    uniqueVisitorsData: GeographicData[];
}

export default function GeographicDistribution({ visitsData, uniqueVisitorsData }: GeographicDistributionProps) {
    const [view, setView] = useState<'visits' | 'uniqueVisitors'>('visits');

    const data = view === 'visits' ? visitsData : uniqueVisitorsData;

    const getCountryFlag = (country: string) => {
        const flags: { [key: string]: string } = {
            'United States': '🇺🇸',
            'China': '🇨🇳',
            'Taiwan': '🇹🇼',
            'India': '🇮🇳',
            'South Korea': '🇰🇷',
            'Germany': '🇩🇪',
            'Japan': '🇯🇵',
            'Others': '🌍'
        };
        return flags[country] || '🌍';
    };

    const getCountryCode = (country: string) => {
        const codes: { [key: string]: string } = {
            'United States': 'US',
            'China': 'CN',
            'Taiwan': 'TW',
            'India': 'IN',
            'South Korea': 'KR',
            'Germany': 'DE',
            'Japan': 'JP',
            'Others': 'OT'
        };
        return codes[country] || 'OT';
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl p-8">
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Geographic Distribution</h3>
                </div>
                <p className="text-sm text-gray-600 mb-5">Traffic by country</p>

                <div className="flex gap-3">
                    <button
                        onClick={() => setView('visits')}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${view === 'visits'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Visits
                    </button>
                    <button
                        onClick={() => setView('uniqueVisitors')}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${view === 'uniqueVisitors'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Unique Visitors
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                {data.map((item, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex flex-col items-center">
                                    <span className="text-xl drop-shadow">{getCountryFlag(item.country)}</span>
                                    <span className="text-xs font-bold text-gray-700 mt-0.5">{getCountryCode(item.country)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{item.country}</p>
                                    <p className="text-xs text-gray-600 font-medium">
                                        {item.traffic.toLocaleString()} {view === 'visits' ? 'visits' : 'visitors'}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
