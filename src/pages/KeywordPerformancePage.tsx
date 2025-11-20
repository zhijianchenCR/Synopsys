import KeywordTable from '../components/KeywordTable';
import NegativeKeywords from '../components/NegativeKeywords';
import KeywordOpportunities from '../components/KeywordOpportunities';
import { organicKeywords } from '../data/realData';
import { topKeywordOpportunities, negativeKeywords } from '../data/competitiveIntelligence';

const KeywordPerformancePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Keyword Performance</h2>
                    <p className="text-xs text-gray-700">Track ranking positions, search volume, and traffic value for top keywords</p>
                </div>
            </div>

            <div className="mb-8">
                <KeywordTable keywords={organicKeywords} maxRows={20} />
            </div>

            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Keyword Strategy & Optimization</h2>
                    <p className="text-xs text-gray-700">Discover expansion opportunities and identify negative keywords to refine your targeting</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <KeywordOpportunities keywords={topKeywordOpportunities.slice(0, 10)} />
                <NegativeKeywords keywords={negativeKeywords} />
            </div>
        </div>
    );
};

export default KeywordPerformancePage;
