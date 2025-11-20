import TrafficTrendChart from '../components/TrafficTrendChart';
import GeographicDistribution from '../components/GeographicDistribution';
import {
    geographicVisitsData,
    geographicUniqueVisitorsData,
    trafficMetrics,
} from '../data/realData';

const TrafficGeographicPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Traffic & Geographic</h2>
                    <p className="text-xs text-gray-700">Monitor visitor trends, engagement metrics, and geographic distribution</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <TrafficTrendChart data={trafficMetrics.uniqueVisitors.map((uv, i) => ({
                        week: `Week ${i + 1}`,
                        uniqueVisitors: uv.value,
                        visits: trafficMetrics.visits[i].value,
                        bounceRate: trafficMetrics.bounceRate[i].value,
                        avgVisitDuration: trafficMetrics.avgVisitDuration[i].value,
                        pagesPerVisit: trafficMetrics.pagesPerVisit[i].value,
                        purchaseConversion: trafficMetrics.purchaseConversion[i].value
                    }))} />
                </div>
                <div>
                    <GeographicDistribution
                        visitsData={geographicVisitsData}
                        uniqueVisitorsData={geographicUniqueVisitorsData}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrafficGeographicPage;
