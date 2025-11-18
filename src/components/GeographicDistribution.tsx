import { Globe } from 'lucide-react';

interface GeographicData {
    country: string;
    traffic: number;
    percentage: number;
}

interface GeographicDistributionProps {
    data: GeographicData[];
}

export default function GeographicDistribution({ data }: GeographicDistributionProps) {
    const getCountryFlag = (country: string) => {
        const flags: { [key: string]: string } = {
            'United States': '🇺🇸',
            'China': '🇨🇳',
            'Taiwan': '🇹🇼',
            'India': '🇮🇳',
            'South Korea': '🇰🇷',
            'Others': '🌍'
        };
        return flags[country] || '🌍';
    };

    return (
        <div className="glass-card rounded-2xl shadow-xl p-6">
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Geographic Distribution</h3>
                </div>
                <p className="text-sm text-gray-600">Traffic by country</p>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl drop-shadow">{getCountryFlag(item.country)}</span>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{item.country}</p>
                                    <p className="text-xs text-gray-600 font-medium">{item.traffic.toLocaleString()} visitors</p>
                                </div>
                            </div>
                            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
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
