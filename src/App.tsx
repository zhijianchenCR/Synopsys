import { useState } from 'react';
import { TrendingUp, Search, Link2, DollarSign, Award, CreditCard } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MetricsCard from './components/MetricsCard';
import TrafficGeographicPage from './pages/TrafficGeographicPage';
import KeywordPerformancePage from './pages/KeywordPerformancePage';
import PagesCompetitivePage from './pages/PagesCompetitivePage';
import AIInsightsSummary from './components/AIInsightsSummary';
import ActionableInsights from './components/ActionableInsights';
import PaidVsOrganic from './components/PaidVsOrganic';
import ROIAnalysis from './components/ROIAnalysis';
import EmergingTrends from './components/EmergingTrends';
import {
    metricsSummary,
    aiInsights,
    actionableInsights,
    adPerformanceData,
} from './data/realData';
import {
    emergingTrends,
    competitiveKeywordGaps,
} from './data/competitiveIntelligence';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10">
                <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

                {currentPage === 'dashboard' && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-end mb-3">
                            <div className="text-xs text-blue-200/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <MetricsCard
                                title="Total Keywords"
                                value={metricsSummary.totalKeywords.toLocaleString()}
                                change={2.3}
                                icon={Search}
                                iconColor="text-blue-600"
                                iconBg="bg-blue-50"
                            />
                            <MetricsCard
                                title="Organic Traffic"
                                value={metricsSummary.organicTraffic.toLocaleString()}
                                change={-8.7}
                                icon={TrendingUp}
                                iconColor="text-emerald-600"
                                iconBg="bg-emerald-50"
                            />
                            <MetricsCard
                                title="Top 10 Rankings"
                                value={metricsSummary.topKeywordsRanking.toLocaleString()}
                                change={3.4}
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
                                change={-6.2}
                                icon={DollarSign}
                                iconColor="text-teal-600"
                                iconBg="bg-teal-50"
                            />
                            <MetricsCard
                                title="Paid Traffic"
                                value={metricsSummary.adSpend.toLocaleString()}
                                change={-61.9}
                                icon={CreditCard}
                                iconColor="text-purple-600"
                                iconBg="bg-purple-50"
                            />
                        </div>

                        <div className="mb-6">
                            <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Ad Performance & ROI</h2>
                                <p className="text-xs text-gray-700">Analyze advertising efficiency and return on investment metrics</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <PaidVsOrganic data={adPerformanceData} />
                            <ROIAnalysis data={adPerformanceData} />
                        </div>

                        <div className="mb-6">
                            <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900 mb-1">Insights & Recommendations</h2>
                                        <p className="text-xs text-gray-700">Smart insights and recommended actions to optimize your marketing strategy</p>
                                    </div>
                                    <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                                        Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <AIInsightsSummary insights={aiInsights} />
                            <ActionableInsights actions={actionableInsights} />
                        </div>

                        <div className="mb-6">
                            <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Strategy</h2>
                                <p className="text-xs text-gray-700">Emerging trends and competitive keyword gaps to capitalize on</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-8">
                            <EmergingTrends trends={emergingTrends} competitiveGaps={competitiveKeywordGaps} />
                        </div>

                    </div>
                )}

                {currentPage === 'traffic' && <TrafficGeographicPage />}
                {currentPage === 'keywords' && <KeywordPerformancePage />}
                {currentPage === 'competitive' && <PagesCompetitivePage />}
            </div>
        </div>
    );
}

export default App;
