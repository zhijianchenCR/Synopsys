import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
}

export default function MetricsCard({ title, value, change, icon: Icon, iconColor, iconBg }: MetricsCardProps) {
    return (
        <div className="glass-card rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center mt-3">
                            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${change >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {change >= 0 ? '+' : ''}{change}%
                            </span>
                            <span className="text-xs text-gray-500 ml-2 font-medium">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`${iconBg} p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
}
