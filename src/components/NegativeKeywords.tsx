import { XCircle, Shield } from 'lucide-react';

interface NegativeKeywordsProps {
    keywords: string[];
}

const NegativeKeywords = ({ keywords }: NegativeKeywordsProps) => {
    return (
        <div className="glass-card rounded-2xl shadow-2xl p-6 border-2 border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2.5 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Negative Keywords</h2>
                    <p className="text-sm text-gray-600 font-medium">Exclude these to prevent wasted ad spend</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-200 mb-4">
                <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">Why Negative Keywords Matter</h3>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            These keywords indicate low-intent traffic that won't convert. Excluding them saves budget and improves campaign ROI by focusing on qualified B2B enterprise prospects.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {keywords.map((keyword, index) => (
                    <div
                        key={index}
                        className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-red-200 hover:border-red-300 transition-colors duration-200 flex items-center gap-2"
                    >
                        <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                        <span className="text-xs font-semibold text-gray-700 truncate">{keyword}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Total Keywords to Exclude: {keywords.length}</span> —
                    Add these to your Google Ads campaigns at the campaign or ad group level to filter out non-commercial traffic.
                </p>
            </div>
        </div>
    );
};

export default NegativeKeywords;
