import TopPages from '../components/TopPages';
import CompetitorAnalysis from '../components/CompetitorAnalysis';
import CompetitorComparison from '../components/CompetitorComparison';
import { useSEMrushData } from '../hooks/useSEMrushData';
import { transformTopPages, transformCompetitors } from '../utils/dataTransformer';

const PagesCompetitivePage = () => {
    const { data, loading } = useSEMrushData();

    if (loading || !data) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-white">Loading Synopsys Datas...</div>
            </div>
        );
    }

    const topPages = transformTopPages(data) || [];
    const competitors = transformCompetitors(data) || [];

    const competitorInsights = [
        { name: 'Competitor A', marketShare: 35, growthRate: 12 },
        { name: 'Competitor B', marketShare: 28, growthRate: 8 },
        { name: 'Competitor C', marketShare: 22, growthRate: 15 }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Pages & Competitive Landscape</h2>
                    <p className="text-xs text-gray-700">Analyze top-performing pages and benchmark against key competitors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {topPages.length > 0 && <TopPages pages={topPages} />}
                {competitors.length > 0 && <CompetitorAnalysis competitors={competitors} />}
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
                {competitorInsights.length > 0 && <CompetitorComparison competitors={competitorInsights} />}
            </div>
        </div>
    );
};

export default PagesCompetitivePage;
