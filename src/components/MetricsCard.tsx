import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
    title: string;
    value: string | number;
    change?: number;
    description?: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
}

export default function MetricsCard({ title, value, change, description, icon: Icon, iconColor, iconBg }: MetricsCardProps) {
    return (
        <div className="relative glass-card rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className={`${iconBg} p-3 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-gray-500 mb-2 tracking-wider uppercase">{title}</p>
                    <p className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">{value}</p>
                    {description && (
                        <p className="text-xs text-gray-600 mt-1 mb-2">{description}</p>
                    )}
                    {change !== undefined && (
                        <div className="flex items-center mt-3">
                            <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${change >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {change >= 0 ? '+' : ''}{change}%
                            </span>
                            <span className="text-xs text-gray-500 ml-2 font-medium">vs last month</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
