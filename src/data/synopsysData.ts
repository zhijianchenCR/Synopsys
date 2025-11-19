export interface KeywordData {
    keyword: string;
    volume: number;
    difficulty: number;
    cpc: number;
    trend: number[];
    position: number;
    traffic: number;
    intent: 'Commercial' | 'Informational' | 'Navigational' | 'Transactional';
}

export interface TrafficData {
    month: string;
    organicTraffic: number;
    paidTraffic: number;
    directTraffic: number;
    referralTraffic: number;
}

export interface CompetitorData {
    name: string;
    commonKeywords: number;
    traffic: number;
    competitionLevel: number;
}

export interface MetricSummary {
    totalKeywords: number;
    organicTraffic: number;
    topKeywordsRanking: number;
    domainAuthority: number;
    backlinks: number;
    trafficValue: number;
    adSpend: number;
}

export interface AdPerformanceData {
    month: string;
    adSpend: number;
    organicValue: number;
    paidTraffic: number;
    organicTraffic: number;
}

export const synopsysKeywords: KeywordData[] = [
    {
        keyword: 'electronic design automation',
        volume: 8100,
        difficulty: 68,
        cpc: 12.50,
        trend: [6800, 7200, 7500, 7800, 8100, 8400],
        position: 2,
        traffic: 2430,
        intent: 'Commercial'
    },
    {
        keyword: 'EDA tools',
        volume: 5400,
        difficulty: 72,
        cpc: 15.80,
        trend: [4900, 5000, 5100, 5200, 5300, 5400],
        position: 1,
        traffic: 3240,
        intent: 'Commercial'
    },
    {
        keyword: 'chip design software',
        volume: 4200,
        difficulty: 65,
        cpc: 14.20,
        trend: [3800, 3900, 4000, 4100, 4150, 4200],
        position: 3,
        traffic: 1260,
        intent: 'Commercial'
    },
    {
        keyword: 'synopsys design compiler',
        volume: 3300,
        difficulty: 45,
        cpc: 8.90,
        trend: [3100, 3150, 3200, 3250, 3280, 3300],
        position: 1,
        traffic: 1980,
        intent: 'Navigational'
    },
    {
        keyword: 'ASIC design tools',
        volume: 2900,
        difficulty: 70,
        cpc: 16.30,
        trend: [2600, 2700, 2750, 2800, 2850, 2900],
        position: 4,
        traffic: 870,
        intent: 'Commercial'
    },
    {
        keyword: 'RTL synthesis',
        volume: 2400,
        difficulty: 58,
        cpc: 11.40,
        trend: [2200, 2250, 2300, 2350, 2380, 2400],
        position: 2,
        traffic: 720,
        intent: 'Informational'
    },
    {
        keyword: 'static timing analysis',
        volume: 2100,
        difficulty: 62,
        cpc: 10.20,
        trend: [1900, 1950, 2000, 2050, 2080, 2100],
        position: 3,
        traffic: 630,
        intent: 'Informational'
    },
    {
        keyword: 'verification IP',
        volume: 1800,
        difficulty: 55,
        cpc: 13.70,
        trend: [1600, 1650, 1700, 1750, 1780, 1800],
        position: 2,
        traffic: 540,
        intent: 'Commercial'
    },
    {
        keyword: 'silicon IP',
        volume: 3600,
        difficulty: 64,
        cpc: 14.90,
        trend: [3200, 3300, 3400, 3500, 3550, 3600],
        position: 3,
        traffic: 1080,
        intent: 'Commercial'
    },
    {
        keyword: 'synopsys VCS',
        volume: 1500,
        difficulty: 42,
        cpc: 7.80,
        trend: [1400, 1420, 1440, 1470, 1490, 1500],
        position: 1,
        traffic: 900,
        intent: 'Navigational'
    },
    {
        keyword: 'IC compiler',
        volume: 1900,
        difficulty: 60,
        cpc: 9.50,
        trend: [1700, 1750, 1800, 1850, 1880, 1900],
        position: 2,
        traffic: 570,
        intent: 'Commercial'
    },
    {
        keyword: 'design for test',
        volume: 2700,
        difficulty: 53,
        cpc: 8.60,
        trend: [2400, 2500, 2550, 2600, 2650, 2700],
        position: 5,
        traffic: 540,
        intent: 'Informational'
    },
    {
        keyword: 'formal verification',
        volume: 1600,
        difficulty: 59,
        cpc: 11.20,
        trend: [1450, 1500, 1520, 1550, 1580, 1600],
        position: 4,
        traffic: 480,
        intent: 'Informational'
    },
    {
        keyword: 'synthesis tool',
        volume: 2200,
        difficulty: 56,
        cpc: 10.80,
        trend: [2000, 2050, 2100, 2150, 2180, 2200],
        position: 3,
        traffic: 660,
        intent: 'Commercial'
    },
    {
        keyword: 'AI chip design',
        volume: 4800,
        difficulty: 74,
        cpc: 18.90,
        trend: [3200, 3600, 4000, 4300, 4600, 4800],
        position: 5,
        traffic: 960,
        intent: 'Commercial'
    },
    {
        keyword: 'semiconductor design automation',
        volume: 1400,
        difficulty: 67,
        cpc: 13.40,
        trend: [1250, 1280, 1320, 1350, 1380, 1400],
        position: 2,
        traffic: 420,
        intent: 'Commercial'
    },
    {
        keyword: 'physical design tools',
        volume: 1700,
        difficulty: 61,
        cpc: 12.10,
        trend: [1550, 1600, 1630, 1660, 1680, 1700],
        position: 3,
        traffic: 510,
        intent: 'Commercial'
    },
    {
        keyword: 'logic synthesis',
        volume: 1300,
        difficulty: 54,
        cpc: 9.30,
        trend: [1200, 1230, 1250, 1270, 1290, 1300],
        position: 4,
        traffic: 390,
        intent: 'Informational'
    },
    {
        keyword: 'DFT tools',
        volume: 980,
        difficulty: 52,
        cpc: 8.40,
        trend: [900, 920, 940, 960, 970, 980],
        position: 2,
        traffic: 294,
        intent: 'Commercial'
    },
    {
        keyword: 'CDC verification',
        volume: 850,
        difficulty: 48,
        cpc: 7.90,
        trend: [780, 800, 820, 830, 840, 850],
        position: 3,
        traffic: 255,
        intent: 'Informational'
    }
];

export const trafficHistory: TrafficData[] = [
    { month: 'May 2025', organicTraffic: 145000, paidTraffic: 23000, directTraffic: 89000, referralTraffic: 34000 },
    { month: 'Jun 2025', organicTraffic: 158000, paidTraffic: 25000, directTraffic: 92000, referralTraffic: 36000 },
    { month: 'Jul 2025', organicTraffic: 172000, paidTraffic: 27000, directTraffic: 95000, referralTraffic: 38000 },
    { month: 'Aug 2025', organicTraffic: 189000, paidTraffic: 29000, directTraffic: 98000, referralTraffic: 41000 },
    { month: 'Sep 2025', organicTraffic: 206000, paidTraffic: 31000, directTraffic: 101000, referralTraffic: 43000 },
    { month: 'Oct 2025', organicTraffic: 224000, paidTraffic: 33000, directTraffic: 105000, referralTraffic: 46000 },
];

export const competitors: CompetitorData[] = [
    { name: 'Cadence Design Systems', commonKeywords: 3847, traffic: 198000, competitionLevel: 92 },
    { name: 'Mentor Graphics (Siemens)', commonKeywords: 2156, traffic: 142000, competitionLevel: 85 },
    { name: 'Ansys', commonKeywords: 1523, traffic: 167000, competitionLevel: 78 },
    { name: 'Keysight Technologies', commonKeywords: 987, traffic: 89000, competitionLevel: 65 },
    { name: 'Silvaco', commonKeywords: 654, traffic: 45000, competitionLevel: 58 },
];

export const metricsSummary: MetricSummary = {
    totalKeywords: 18742,
    organicTraffic: 224000,
    topKeywordsRanking: 1847,
    domainAuthority: 84,
    backlinks: 127500,
    trafficValue: 892000,
    adSpend: 165000,
};

export const adPerformanceData: AdPerformanceData[] = [
    { month: 'May 2025', adSpend: 125000, organicValue: 678000, paidTraffic: 23000, organicTraffic: 145000 },
    { month: 'Jun 2025', adSpend: 132000, organicValue: 712000, paidTraffic: 25000, organicTraffic: 158000 },
    { month: 'Jul 2025', adSpend: 142000, organicValue: 761000, paidTraffic: 27000, organicTraffic: 172000 },
    { month: 'Aug 2025', adSpend: 148000, organicValue: 823000, paidTraffic: 29000, organicTraffic: 189000 },
    { month: 'Sep 2025', adSpend: 157000, organicValue: 856000, paidTraffic: 31000, organicTraffic: 206000 },
    { month: 'Oct 2025', adSpend: 165000, organicValue: 892000, paidTraffic: 33000, organicTraffic: 224000 },
];

export const topPages = [
    { url: '/solutions/silicon-design.html', traffic: 28400, keywords: 342, value: 89200 },
    { url: '/verification/vcs.html', traffic: 24100, keywords: 287, value: 76300 },
    { url: '/implementation/design-compiler.html', traffic: 21800, keywords: 256, value: 72400 },
    { url: '/ai-driven-eda.html', traffic: 19200, keywords: 198, value: 68900 },
    { url: '/products/fusion-compiler.html', traffic: 17500, keywords: 213, value: 61200 },
];

export const geographicData = [
    { country: 'United States', traffic: 89600, percentage: 40 },
    { country: 'China', traffic: 44800, percentage: 20 },
    { country: 'Taiwan', traffic: 33600, percentage: 15 },
    { country: 'India', traffic: 22400, percentage: 10 },
    { country: 'South Korea', traffic: 15680, percentage: 7 },
    { country: 'Others', traffic: 17920, percentage: 8 },
];

export const aiInsights = [
    {
        type: 'positive' as const,
        title: 'Exceptional Growth in Organic Traffic',
        description: 'Your organic traffic has grown by 92% over the past 12 months, significantly outpacing industry averages. The AI-driven EDA content is driving unprecedented engagement from technical decision-makers.'
    },
    {
        type: 'neutral' as const,
        title: 'Keyword Portfolio Diversification Opportunity',
        description: 'Analysis shows 68% of traffic comes from your top 50 keywords. Consider expanding into emerging semiconductor topics like chiplet architecture and advanced packaging to capture growing market segments.'
    },
    {
        type: 'warning' as const,
        title: 'Competitive Pressure in Core Markets',
        description: 'Cadence Design Systems has increased keyword overlap by 23% in the past quarter, particularly in verification and AI-chip design categories. Strategic content reinforcement is recommended.'
    },
    {
        type: 'positive' as const,
        title: 'Strong Performance in APAC Markets',
        description: 'Taiwan and South Korea markets show 45% higher engagement rates than global average, indicating strong product-market fit. Consider localized content strategies for these regions.'
    }
];

export const actionableInsights = [
    {
        priority: 'high' as const,
        action: 'Create targeted content for "AI chip design" and "machine learning accelerators" - high volume keywords with low competition',
        impact: 'High',
        effort: 'Medium',
        category: 'Content Strategy'
    },
    {
        priority: 'high' as const,
        action: 'Optimize top 10 underperforming pages (positions 11-20) with improved meta descriptions and internal linking',
        impact: 'High',
        effort: 'Low',
        category: 'SEO Optimization'
    },
    {
        priority: 'medium' as const,
        action: 'Develop comprehensive comparison guides for Synopsys vs Cadence products to capture competitive search traffic',
        impact: 'Medium',
        effort: 'High',
        category: 'Competitive Analysis'
    },
    {
        priority: 'medium' as const,
        action: 'Build backlink partnerships with semiconductor industry publications and technical blogs to improve domain authority',
        impact: 'High',
        effort: 'High',
        category: 'Link Building'
    },
    {
        priority: 'low' as const,
        action: 'Refresh older verification and simulation content (2+ years old) with updated case studies and product capabilities',
        impact: 'Medium',
        effort: 'Medium',
        category: 'Content Refresh'
    }
];
