export interface KeywordData {
    keyword: string;
    volume: number;
    difficulty: number;
    cpc: number;
    trend: number[];
    position: number;
    previousPosition: number;
    traffic: number;
    trafficPercentage: number;
    trafficCost: number;
    competition: number;
    url: string;
    serpFeatures: string;
    intent: string;
    positionChange?: number;
}

export interface AdPerformanceData {
    month: string;
    adSpend: number;
    organicValue: number;
    paidTraffic: number;
    organicTraffic: number;
}

export interface GeographicData {
    country: string;
    traffic: number;
    percentage: number;
}

export interface CompetitorData {
    domain: string;
    name: string;
    competitorRelevance: number;
    commonKeywords: number;
    organicKeywords: number;
    organicTraffic: number;
    traffic: number;
    organicCost: number;
    adwordsKeywords: number;
    competitionLevel: number;
}

export interface TopPageData {
    url: string;
    trafficPercent: number;
    traffic: number;
    numberOfKeywords: number;
    trafficChange: number;
    commercialTraffic: number;
    informationalTraffic: number;
    navigationalTraffic: number;
    transactionalTraffic: number;
}

export interface KeywordOpportunity {
    keyword: string;
    currentPosition: number;
    searchVolume: number;
    traffic: number;
    potentialTraffic: number;
    difficulty: number;
    url: string;
    intent: string;
    type?: string;
    competitorRanking?: number;
    opportunity?: string;
}

export interface AIInsight {
    category: string;
    message: string;
    impact: 'positive' | 'negative' | 'warning' | 'neutral';
    metric: string;
}

export interface ActionableInsight {
    category: string;
    priority: 'High' | 'Medium' | 'Low';
    impact: string;
    action: string;
    effort: string;
    rationale: string;
}

export interface MetricsSummary {
    totalKeywords: number;
    organicTraffic: number;
    topKeywordsRanking: number;
    backlinks: number;
    trafficValue: number;
    paidTraffic: number;
    visitsChange: number;
    keywordChange?: number;
    top10Change?: number;
    trafficValueChange?: number;
    paidTrafficChange?: number;
}

export interface Competitor {
    name: string;
    marketShare: number;
    growthRate: number;
}

export interface SEMrushData {
    organicKeywords: KeywordData[];
    paidKeywords: KeywordData[];
    trafficTrends: any;
    geoDistribution: any;
    competitors: CompetitorData[];
    topPages: TopPageData[];
}
