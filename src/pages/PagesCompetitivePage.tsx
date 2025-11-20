import TopPages from '../components/TopPages';
import CompetitorAnalysis from '../components/CompetitorAnalysis';
import CompetitorComparison from '../components/CompetitorComparison';
import { topPages, competitors } from '../data/realData';
import { competitors as competitiveCompetitors } from '../data/competitiveIntelligence';

const PagesCompetitivePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Pages & Competitive Landscape</h2>
                    <p className="text-xs text-gray-700">Analyze top-performing pages and benchmark against key competitors</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <TopPages pages={topPages} />
                <CompetitorAnalysis competitors={competitors} />
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
                <CompetitorComparison competitors={competitiveCompetitors} />
            </div>
        </div>
    );
};

export default PagesCompetitivePage;
