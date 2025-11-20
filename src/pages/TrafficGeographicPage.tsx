import TrafficTrendChart from '../components/TrafficTrendChart';
import GeographicDistribution from '../components/GeographicDistribution';
import { useSEMrushData } from '../hooks/useSEMrushData';
import { transformTrafficData, transformGeographicData } from '../utils/dataTransformer';

const TrafficGeographicPage = () => {
    const { data, loading } = useSEMrushData();

    const trafficData = transformTrafficData(data);
    const geoData = transformGeographicData(data);

    if (loading || !trafficData) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-white">Loading Synopsys Datas...</div>
            </div>
        );
    }

    const chartData = trafficData.visits.map((visit, i) => ({
        week: visit.date,
        uniqueVisitors: trafficData.uniqueVisitors[i]?.value || 0,
        visits: visit.value,
        bounceRate: trafficData.bounceRate[i]?.value || 0,
        avgVisitDuration: trafficData.avgVisitDuration[i]?.value || 0,
        pagesPerVisit: trafficData.pagesPerVisit[i]?.value || 0,
        purchaseConversion: trafficData.purchaseConversion[i]?.value || 0
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <div className="glass-card rounded-2xl shadow-2xl p-6 mb-6 border-2 border-white/20">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Traffic & Geographic</h2>
                            <p className="text-xs text-gray-700">Monitor visitor trends, engagement metrics, and geographic distribution</p>
                        </div>
                        <div className="text-xs text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 font-medium">
                            May - Nov 2025
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <TrafficTrendChart data={chartData} />
                </div>
                <div>
                    <GeographicDistribution
                        visitsData={geoData.visits}
                        uniqueVisitorsData={geoData.uniqueVisitors}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrafficGeographicPage;
