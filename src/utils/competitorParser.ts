import { parseCSVNumber } from './csvParser';

export interface CompetitorKeywordData {
    keyword: string;
    intent: string;
    volume: number;
    difficulty: number;
    cpc: number;
    competitionDensity: number;
    rankings: {
        synopsys: number;
        semiengineering: number;
        ansys: number;
        imagination: number;
        mobileye: number;
    };
    pages: {
        synopsys: string;
        semiengineering: string;
        ansys: string;
        imagination: string;
        mobileye: string;
    };
    results: number;
}

export async function parseCompetitorKeywords(): Promise<CompetitorKeywordData[]> {
    const response = await fetch('/datasets/ga_keywords_synopsys_competitors.csv');
    const text = await response.text();
    const lines = text.split('\n').filter(line => line.trim());

    const data: CompetitorKeywordData[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        const cols = line.split(',');
        if (cols.length < 16) continue;

        const keyword = cols[0];
        const intent = cols[1];
        const volume = parseCSVNumber(cols[2]);
        const difficulty = parseCSVNumber(cols[3]);
        const cpc = parseCSVNumber(cols[4]);
        const competitionDensity = parseCSVNumber(cols[5]);

        const rankings = {
            synopsys: parseCSVNumber(cols[6]),
            semiengineering: parseCSVNumber(cols[7]),
            ansys: parseCSVNumber(cols[8]),
            imagination: parseCSVNumber(cols[9]),
            mobileye: parseCSVNumber(cols[10])
        };

        const pages = {
            synopsys: cols[11] || '',
            semiengineering: cols[12] || '',
            ansys: cols[13] || '',
            imagination: cols[14] || '',
            mobileye: cols[15] || ''
        };

        const results = parseCSVNumber(cols[16]);

        data.push({
            keyword,
            intent,
            volume,
            difficulty,
            cpc,
            competitionDensity,
            rankings,
            pages,
            results
        });
    }

    return data;
}

export function calculateOpportunityScore(item: CompetitorKeywordData): number {
    const volumeScore = Math.min(item.volume / 100, 10);
    const difficultyScore = (100 - item.difficulty) / 10;
    const rankingScore = Math.max(0, (item.rankings.synopsys - 10) / 10);

    const competitorBetter = [
        item.rankings.semiengineering,
        item.rankings.ansys,
        item.rankings.imagination,
        item.rankings.mobileye
    ].filter(rank => rank > 0 && rank < item.rankings.synopsys).length;

    const competitorScore = competitorBetter * 2.5;

    return volumeScore + difficultyScore + rankingScore + competitorScore;
}

export function getTopOpportunities(data: CompetitorKeywordData[], limit: number = 10): CompetitorKeywordData[] {
    return data
        .filter(item => {
            const competitorsRanking = [
                item.rankings.semiengineering,
                item.rankings.ansys,
                item.rankings.imagination,
                item.rankings.mobileye
            ];
            const betterCompetitors = competitorsRanking.filter(rank =>
                rank > 0 && rank < item.rankings.synopsys
            );
            return betterCompetitors.length >= 1;
        })
        .map(item => ({ ...item, score: calculateOpportunityScore(item) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

export function getCompetitorGaps(data: CompetitorKeywordData[]): CompetitorKeywordData[] {
    return data.filter(item => {
        const competitorsRanking = [
            item.rankings.semiengineering,
            item.rankings.ansys,
            item.rankings.imagination,
            item.rankings.mobileye
        ];

        const betterCompetitors = competitorsRanking.filter(rank =>
            rank > 0 && rank < item.rankings.synopsys
        );

        return betterCompetitors.length >= 2;
    });
}

export function getCompetitiveAdvantages(data: CompetitorKeywordData[]): CompetitorKeywordData[] {
    return data.filter(item => {
        if (item.rankings.synopsys === 0 || item.rankings.synopsys > 10) return false;

        const competitorsRanking = [
            item.rankings.semiengineering,
            item.rankings.ansys,
            item.rankings.imagination,
            item.rankings.mobileye
        ];

        const worseCompetitors = competitorsRanking.filter(rank =>
            rank === 0 || rank > item.rankings.synopsys
        );

        return worseCompetitors.length >= 3 && item.volume >= 40;
    }).sort((a, b) => b.volume - a.volume);
}

export function getQuickWins(data: CompetitorKeywordData[]): CompetitorKeywordData[] {
    return data.filter(item => {
        return item.volume >= 50 &&
            item.difficulty <= 40 &&
            (item.rankings.synopsys === 0 || item.rankings.synopsys > 20);
    }).sort((a, b) => b.volume - a.volume);
}

export function getStrategicPriorities(data: CompetitorKeywordData[]): CompetitorKeywordData[] {
    return data.filter(item => {
        return item.volume >= 100 &&
            item.rankings.synopsys === 0;
    }).sort((a, b) => b.volume - a.volume);
}
