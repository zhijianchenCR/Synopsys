import { parseCSVNumber } from './csvParser';

interface KeywordRow {
    keyword: string;
    position: number;
    traffic: number;
    trafficCost: number;
}

export async function calculateMetricsFromCSV(): Promise<{
    totalKeywords: number;
    topKeywordsRanking: number;
    trafficValue: number;
    organicTraffic: number;
}> {
    try {
        const response = await fetch('/database/organic_search_keywords.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');

        let totalKeywords = 0;
        let topKeywordsRanking = 0;
        let trafficValue = 0;
        let organicTraffic = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = line.split(',');
            if (values.length < 11) continue;

            totalKeywords++;

            const position = parseCSVNumber(values[1]);
            const traffic = parseCSVNumber(values[7]);
            const trafficCost = parseCSVNumber(values[9]);

            if (position >= 1 && position <= 10) {
                topKeywordsRanking++;
            }

            organicTraffic += traffic;
            trafficValue += trafficCost;
        }

        return {
            totalKeywords,
            topKeywordsRanking,
            trafficValue: Math.round(trafficValue),
            organicTraffic: Math.round(organicTraffic)
        };
    } catch (error) {
        console.error('Error calculating metrics:', error);
        return {
            totalKeywords: 0,
            topKeywordsRanking: 0,
            trafficValue: 0,
            organicTraffic: 0
        };
    }
}
