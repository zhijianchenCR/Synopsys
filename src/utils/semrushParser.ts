export interface OrganicKeyword {
    keyword: string;
    position: number;
    previousPosition: number;
    searchVolume: number;
    keywordDifficulty: number;
    cpc: number;
    url: string;
    traffic: number;
    trafficPercent: number;
    trafficCost: number;
    competition: number;
    numberOfResults: number;
    trends: number[];
    timestamp: string;
    serpFeatures: string;
    keywordIntents: string;
    positionType: string;
}

export interface PaidKeyword {
    title: string;
    description: string;
    keyword: string;
    position: number;
    previousPosition: number;
    searchVolume: number;
    cpc: number;
    visibleUrl: string;
    url: string;
    traffic: number;
    trafficPercent: number;
    trafficCost: number;
    trafficCostPercent: number;
    competition: number;
    numberOfResults: number;
    trends: number[];
    lastSeen: string;
    keywordDifficulty: number;
}

export interface Competitor {
    domain: string;
    competitorRelevance: number;
    commonKeywords: number;
    organicKeywords: number;
    organicTraffic: number;
    organicCost: number;
    adwordsKeywords: number;
}

export interface TrafficTrend {
    date: string;
    value: number;
}

export interface GeoDistribution {
    country: string;
    trafficShare: number;
    allDevices: number;
    desktopShare: number;
    mobileShare: number;
}

export interface TopPage {
    url: string;
    trafficPercent: number;
    numberOfKeywords: number;
    traffic: number;
    adwordsPositions: number;
    commercialPositions: number;
    informationalPositions: number;
    navigationalPositions: number;
    transactionalPositions: number;
    unknownPositions: number;
    commercialTraffic: number;
    informationalTraffic: number;
    navigationalTraffic: number;
    transactionalTraffic: number;
    unknownTraffic: number;
    trafficChange: number;
}

function parseCSVNumber(value: string): number {
    if (!value || value === 'n/a' || value === 'N/A' || value === '') return 0;
    const cleaned = value.replace(/,/g, '').replace(/"/g, '').replace(/%/g, '').trim();
    return parseFloat(cleaned) || 0;
}

function parseTrends(trendsStr: string): number[] {
    try {
        const cleaned = trendsStr.replace(/"/g, '').trim();
        if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
            return JSON.parse(cleaned);
        }
        return [];
    } catch {
        return [];
    }
}

export async function parseOrganicKeywords(csvText: string): Promise<OrganicKeyword[]> {
    const lines = csvText.split('\n');
    const data: OrganicKeyword[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 17) continue;

        data.push({
            keyword: parts[0],
            position: parseCSVNumber(parts[1]),
            previousPosition: parseCSVNumber(parts[2]),
            searchVolume: parseCSVNumber(parts[3]),
            keywordDifficulty: parseCSVNumber(parts[4]),
            cpc: parseCSVNumber(parts[5]),
            url: parts[6],
            traffic: parseCSVNumber(parts[7]),
            trafficPercent: parseCSVNumber(parts[8]),
            trafficCost: parseCSVNumber(parts[9]),
            competition: parseCSVNumber(parts[10]),
            numberOfResults: parseCSVNumber(parts[11]),
            trends: parseTrends(parts[12]),
            timestamp: parts[13],
            serpFeatures: parts[14],
            keywordIntents: parts[15],
            positionType: parts[16]
        });
    }

    return data;
}

export async function parsePaidKeywords(csvText: string): Promise<PaidKeyword[]> {
    const lines = csvText.split('\n');
    const data: PaidKeyword[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 18) continue;

        data.push({
            title: parts[0],
            description: parts[1],
            keyword: parts[2],
            position: parseCSVNumber(parts[3]),
            previousPosition: parseCSVNumber(parts[4]),
            searchVolume: parseCSVNumber(parts[5]),
            cpc: parseCSVNumber(parts[6]),
            visibleUrl: parts[7],
            url: parts[8],
            traffic: parseCSVNumber(parts[9]),
            trafficPercent: parseCSVNumber(parts[10]),
            trafficCost: parseCSVNumber(parts[11]),
            trafficCostPercent: parseCSVNumber(parts[12]),
            competition: parseCSVNumber(parts[13]),
            numberOfResults: parseCSVNumber(parts[14]),
            trends: parseTrends(parts[15]),
            lastSeen: parts[16],
            keywordDifficulty: parseCSVNumber(parts[17])
        });
    }

    return data;
}

export async function parseCompetitors(csvText: string): Promise<Competitor[]> {
    const lines = csvText.split('\n');
    const data: Competitor[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 7) continue;

        data.push({
            domain: parts[0],
            competitorRelevance: parseCSVNumber(parts[1]),
            commonKeywords: parseCSVNumber(parts[2]),
            organicKeywords: parseCSVNumber(parts[3]),
            organicTraffic: parseCSVNumber(parts[4]),
            organicCost: parseCSVNumber(parts[5]),
            adwordsKeywords: parseCSVNumber(parts[6])
        });
    }

    return data;
}

export async function parseTrafficTrend(csvText: string): Promise<TrafficTrend[]> {
    const lines = csvText.split('\n');
    const data: TrafficTrend[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 2) continue;

        data.push({
            date: parts[0],
            value: parseCSVNumber(parts[1])
        });
    }

    return data;
}

export async function parseGeoDistribution(csvText: string): Promise<GeoDistribution[]> {
    const lines = csvText.split('\n');
    const data: GeoDistribution[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 5) continue;

        data.push({
            country: parts[0],
            trafficShare: parseCSVNumber(parts[1]),
            allDevices: parseCSVNumber(parts[2]),
            desktopShare: parseCSVNumber(parts[3]),
            mobileShare: parseCSVNumber(parts[4])
        });
    }

    return data;
}

export async function parseTopPages(csvText: string): Promise<TopPage[]> {
    const lines = csvText.split('\n');
    const data: TopPage[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCSVLine(line);
        if (parts.length < 16) continue;

        data.push({
            url: parts[0],
            trafficPercent: parseCSVNumber(parts[1]),
            numberOfKeywords: parseCSVNumber(parts[2]),
            traffic: parseCSVNumber(parts[3]),
            adwordsPositions: parseCSVNumber(parts[4]),
            commercialPositions: parseCSVNumber(parts[5]),
            informationalPositions: parseCSVNumber(parts[6]),
            navigationalPositions: parseCSVNumber(parts[7]),
            transactionalPositions: parseCSVNumber(parts[8]),
            unknownPositions: parseCSVNumber(parts[9]),
            commercialTraffic: parseCSVNumber(parts[10]),
            informationalTraffic: parseCSVNumber(parts[11]),
            navigationalTraffic: parseCSVNumber(parts[12]),
            transactionalTraffic: parseCSVNumber(parts[13]),
            unknownTraffic: parseCSVNumber(parts[14]),
            trafficChange: parseCSVNumber(parts[15])
        });
    }

    return data;
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

export async function loadAllSEMrushData() {
    const datasets = {
        organicKeywords: [] as OrganicKeyword[],
        paidKeywords: [] as PaidKeyword[],
        competitors: [] as Competitor[],
        trafficTrends: {
            visits: [] as TrafficTrend[],
            uniqueVisitors: [] as TrafficTrend[],
            avgVisitDuration: [] as TrafficTrend[],
            bounceRate: [] as TrafficTrend[],
            pagesPerVisit: [] as TrafficTrend[],
            purchaseConversion: [] as TrafficTrend[]
        },
        geoDistribution: {
            visits: [] as GeoDistribution[],
            uniqueVisitors: [] as GeoDistribution[]
        },
        topPages: [] as TopPage[]
    };

    try {
        const responses = await Promise.all([
            fetch('/datasets/organic_search_keywords.csv'),
            fetch('/datasets/paid_search_keywords.csv'),
            fetch('/datasets/competitors.csv'),
            fetch('/datasets/traffic_trend_Visits.csv'),
            fetch('/datasets/traffic_trend_Unique_Visitors.csv'),
            fetch('/datasets/traffic_trend_Avg_Visit_Duration.csv'),
            fetch('/datasets/traffic_trend_Bounce_Rate.csv'),
            fetch('/datasets/traffic_trend_Pages&Visit.csv'),
            fetch('/datasets/traffic_trend_Purchase_Conversion.csv'),
            fetch('/datasets/geo_distribution_Visits.csv'),
            fetch('/datasets/geo_distribution_Unique_Visitors.csv'),
            fetch('/datasets/top_pages.csv')
        ]);

        const texts = await Promise.all(responses.map(r => r.text()));

        datasets.organicKeywords = await parseOrganicKeywords(texts[0]);
        datasets.paidKeywords = await parsePaidKeywords(texts[1]);
        datasets.competitors = await parseCompetitors(texts[2]);
        datasets.trafficTrends.visits = await parseTrafficTrend(texts[3]);
        datasets.trafficTrends.uniqueVisitors = await parseTrafficTrend(texts[4]);
        datasets.trafficTrends.avgVisitDuration = await parseTrafficTrend(texts[5]);
        datasets.trafficTrends.bounceRate = await parseTrafficTrend(texts[6]);
        datasets.trafficTrends.pagesPerVisit = await parseTrafficTrend(texts[7]);
        datasets.trafficTrends.purchaseConversion = await parseTrafficTrend(texts[8]);
        datasets.geoDistribution.visits = await parseGeoDistribution(texts[9]);
        datasets.geoDistribution.uniqueVisitors = await parseGeoDistribution(texts[10]);
        datasets.topPages = await parseTopPages(texts[11]);

        return datasets;
    } catch (error) {
        console.error('Error loading SEMrush data:', error);
        return datasets;
    }
}
