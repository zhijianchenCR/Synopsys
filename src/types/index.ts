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
    name: string; // for display (UI uses competitor.name)
    
    commonKeywords: number;
    organicKeywords: number;
    organicCost: number;
    adwordsKeywords: number;
    traffic: number;
    
    competitionLevel: number; // YOUR UI uses this for progress bar
    
    competitorRelevance?: number; // optional because UI doesn’t use it
    organicTraffic?: number; // optional because UI doesn’t use it
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
    keywordType: "Gap" | "Predictive" | "Defensive" | string;
    intent: string;
    relevance: number;
    competition: "High" | "Medium" | "Low";
    suggestedBid: string;
    rationale: string;
    searchVolume?: number;
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
}
