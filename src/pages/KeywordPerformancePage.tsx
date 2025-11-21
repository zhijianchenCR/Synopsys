import KeywordTable from '../components/KeywordTable';
import NegativeKeywords from '../components/NegativeKeywords';
import KeywordOpportunities from '../components/KeywordOpportunities';
import KeywordRemedialActions from '../components/KeywordRemedialActions';
import { useSEMrushData } from '../hooks/useSEMrushData';
import { transformOrganicKeywords, calculateKeywordOpportunities } from '../utils/dataTransformer';

const KeywordPerformancePage = () => {
    const { data, loading } = useSEMrushData();

    if (loading || !data) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-white">Loading Synopsys Datas...</div>
            </div>
        );
    }

    const organicKeywords = transformOrganicKeywords(data);
    const opportunities = calculateKeywordOpportunities(data);

    const negativeKeywords = [
        'free alternatives',
        'pirated software',
        'student version',
        'crack download',
        'free trial hack'
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Keyword Performance</h2>
                    <p className="text-xs text-gray-700">Track ranking positions, search volume, and traffic value for top keywords</p>
                </div>
            </div>

            <div className="mb-8">
                <KeywordTable keywords={organicKeywords} maxRows={50} />
            </div>

            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Actions & Recommendations</h2>
                    <p className="text-xs text-gray-700">Automated analysis of keyword performance with actionable recommendations</p>
                </div>
            </div>

            <div className="mb-8">
                <KeywordRemedialActions keywords={organicKeywords} />
            </div>

            <div className="mb-6">
                <div className="glass-card rounded-2xl shadow-2xl p-4 mb-4 border-2 border-white/20">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Keyword Strategy & Optimization</h2>
                    <p className="text-xs text-gray-700">Discover expansion opportunities and identify negative keywords to refine your targeting</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <KeywordOpportunities keywords={opportunities.slice(0, 10)} />
                <NegativeKeywords keywords={negativeKeywords} />
            </div>
        </div>
    );
};

export default KeywordPerformancePage;
