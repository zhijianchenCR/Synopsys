import { TrendingUp, Search, Target, Link2, DollarSign, Award } from 'lucide-react';
import MetricsCard from './components/MetricsCard';
import KeywordTable from './components/KeywordTable';
import TrafficChart from './components/TrafficChart';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import TopPages from './components/TopPages';
import GeographicDistribution from './components/GeographicDistribution';
import {
    synopsysKeywords,
    trafficHistory,
    competitors,
    metricsSummary,
    topPages,
    geographicData,
} from './data/synopsysData';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10">
                <div className="glass-dark border-b border-white/10 shadow-2xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-5">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-60"></div>
                                    <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-2xl">
                                        <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white tracking-tight mb-1">Synopsys Analytics</h1>
                                    <p className="text-base text-blue-100 font-medium">Marketing Intelligence Dashboard</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="glass-card px-6 py-3 rounded-xl shadow-xl border-2 border-white/20">
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Domain Authority</p>
                                    <p className="text-3xl font-bold text-gray-900">{metricsSummary.domainAuthority}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <MetricsCard
                            title="Total Keywords"
                            value={metricsSummary.totalKeywords.toLocaleString()}
                            change={8.3}
                            icon={Search}
                            iconColor="text-blue-600"
                            iconBg="bg-blue-50"
                        />
                        <MetricsCard
                            title="Organic Traffic"
                            value={metricsSummary.organicTraffic.toLocaleString()}
                            change={12.4}
                            icon={TrendingUp}
                            iconColor="text-emerald-600"
                            iconBg="bg-emerald-50"
                        />
                        <MetricsCard
                            title="Top 10 Rankings"
                            value={metricsSummary.topKeywordsRanking.toLocaleString()}
                            change={5.7}
                            icon={Award}
                            iconColor="text-amber-600"
                            iconBg="bg-amber-50"
                        />
                        <MetricsCard
                            title="Backlinks"
                            value={metricsSummary.backlinks.toLocaleString()}
                            change={3.2}
                            icon={Link2}
                            iconColor="text-orange-600"
                            iconBg="bg-orange-50"
                        />
                        <MetricsCard
                            title="Traffic Value"
                            value={`$${(metricsSummary.trafficValue / 1000).toFixed(0)}K`}
                            change={9.8}
                            icon={DollarSign}
                            iconColor="text-teal-600"
                            iconBg="bg-teal-50"
                        />
                        <MetricsCard
                            title="Competitors Tracked"
                            value={competitors.length}
                            icon={Target}
                            iconColor="text-red-600"
                            iconBg="bg-red-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <TrafficChart data={trafficHistory} />
                        </div>
                        <div>
                            <GeographicDistribution data={geographicData} />
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="glass-card rounded-2xl shadow-2xl p-6 mb-4 border-2 border-white/20">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Keyword Performance</h2>
                            <p className="text-sm text-gray-700 font-medium">Top ranking keywords driving traffic to Synopsys</p>
                        </div>
                        <KeywordTable keywords={synopsysKeywords} maxRows={20} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <TopPages pages={topPages} />
                        <CompetitorAnalysis competitors={competitors} />
                    </div>

                    <div className="glass-card rounded-2xl shadow-2xl p-10 text-center border-2 border-white/20">
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">Powering Innovation in EDA</h3>
                        <p className="text-gray-800 text-base max-w-2xl mx-auto leading-relaxed font-medium">
                            Synopsys continues to lead the electronic design automation industry with cutting-edge solutions
                            for AI-powered chip design, verification, and silicon IP.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
