import { parseCSVNumber, parsePercentage, parseTimeToSeconds } from '../utils/csvParser';

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
    serpFeatures?: string;
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
    organicKeywords: number;
    organicCost: number;
    adwordsKeywords: number;
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

export const organicKeywords: KeywordData[] = [
    { keyword: 'synopsys', volume: 14800, difficulty: 82, cpc: 1.81, trend: [54, 54, 54, 54, 66, 44, 54, 44, 54, 44, 66, 44], position: 1, previousPosition: 1, traffic: 11840, trafficPercentage: 13.82, trafficCost: 21430, competition: 0.07, url: 'https://www.synopsys.com/', serpFeatures: 'Sitelinks, Video, Image, People also ask', intent: 'Navigational' },
    { keyword: 'synopsys company', volume: 5400, difficulty: 22, cpc: 1.81, trend: [19, 4, 44, 81, 81, 8, 7, 66, 13, 24, 7, 24], position: 1, previousPosition: 1, traffic: 4320, trafficPercentage: 5.04, trafficCost: 7819, competition: 0.07, url: 'https://www.synopsys.com/', serpFeatures: 'Top stories, Sitelinks, Video, AI overview', intent: 'Commercial' },
    { keyword: 'eda', volume: 18100, difficulty: 89, cpc: 4.50, trend: [67, 54, 54, 54, 54, 44, 54, 44, 44, 44, 44, 44], position: 1, previousPosition: 2, traffic: 3547, trafficPercentage: 4.14, trafficCost: 15962, competition: 0.11, url: 'https://www.synopsys.com/glossary/eda.html', serpFeatures: 'Image, People also ask, Related searches', intent: 'Navigational' },
    { keyword: 'wiring harness', volume: 9900, difficulty: 26, cpc: 1.93, trend: [66, 54, 54, 54, 44, 66, 81, 81, 81, 81, 81, 66], position: 1, previousPosition: 1, traffic: 2455, trafficPercentage: 2.86, trafficCost: 4738, competition: 0.67, url: 'https://www.synopsys.com/automotive/wire-harness-design.html', serpFeatures: 'Image pack, Video, People also ask', intent: 'Informational' },
    { keyword: 'synopsys inc', volume: 2900, difficulty: 21, cpc: 1.15, trend: [54, 54, 43, 65, 81, 54, 81, 100, 81, 65, 81, 81], position: 1, previousPosition: 1, traffic: 2320, trafficPercentage: 2.71, trafficCost: 2668, competition: 0.07, url: 'https://www.synopsys.com/', serpFeatures: 'Sitelinks, Knowledge panel', intent: 'Navigational' },
    { keyword: 'synopsys careers', volume: 1900, difficulty: 35, cpc: 4.54, trend: [100, 79, 66, 54, 100, 100, 79, 79, 66, 54, 79, 79], position: 1, previousPosition: 1, traffic: 1520, trafficPercentage: 1.77, trafficCost: 6901, competition: 0.29, url: 'https://www.synopsys.com/careers.html', serpFeatures: 'Sitelinks, People also ask', intent: 'Commercial' },
    { keyword: 'snps share price', volume: 4400, difficulty: 49, cpc: 2.82, trend: [29, 36, 36, 66, 44, 36, 44, 36, 54, 54, 100, 44], position: 1, previousPosition: 2, traffic: 1091, trafficPercentage: 1.27, trafficCost: 3077, competition: 0.46, url: 'https://www.synopsys.com/investor-relations.html', serpFeatures: 'Stock quotes, Related searches', intent: 'Informational' },
    { keyword: 'synopsis', volume: 74000, difficulty: 81, cpc: 2.24, trend: [100, 100, 81, 81, 81, 81, 100, 81, 81, 66, 66, 66], position: 2, previousPosition: 2, traffic: 962, trafficPercentage: 1.12, trafficCost: 2155, competition: 0.03, url: 'https://www.synopsys.com/', serpFeatures: 'People also ask, Related searches', intent: 'Informational' },
    { keyword: 'sta timing', volume: 6600, difficulty: 23, cpc: 7.15, trend: [0, 0, 0, 0, 0, 0, 0, 100, 44, 29, 0, 3], position: 1, previousPosition: 1, traffic: 871, trafficPercentage: 1.02, trafficCost: 6228, competition: 0.00, url: 'https://www.synopsys.com/glossary/sta.html', serpFeatures: 'Image, People also ask', intent: 'Informational' },
    { keyword: 'solvnet', volume: 1000, difficulty: 34, cpc: 0.00, trend: [67, 76, 76, 76, 67, 76, 67, 100, 76, 76, 100, 76], position: 1, previousPosition: 1, traffic: 800, trafficPercentage: 0.93, trafficCost: 0, competition: 0.00, url: 'https://solvnet.synopsys.com/', serpFeatures: 'Sitelinks', intent: 'Navigational' },
    { keyword: 'synopsys software', volume: 880, difficulty: 58, cpc: 4.77, trend: [29, 13, 100, 20, 8, 10, 13, 3, 3, 3, 3, 3], position: 1, previousPosition: 1, traffic: 704, trafficPercentage: 0.82, trafficCost: 3358, competition: 0.11, url: 'https://www.synopsys.com/software.html', serpFeatures: 'Sitelinks, Video', intent: 'Navigational' },
    { keyword: 'electronic design automation', volume: 8100, difficulty: 35, cpc: 4.50, trend: [66, 100, 19, 44, 81, 24, 36, 19, 24, 19, 44, 19], position: 2, previousPosition: 2, traffic: 664, trafficPercentage: 0.77, trafficCost: 2988, competition: 0.11, url: 'https://www.synopsys.com/eda.html', serpFeatures: 'Image, People also ask, Related searches', intent: 'Informational' },
    { keyword: 'synopsis inc', volume: 720, difficulty: 59, cpc: 1.15, trend: [84, 52, 68, 31, 25, 52, 16, 25, 13, 20, 31, 46], position: 1, previousPosition: 1, traffic: 576, trafficPercentage: 0.67, trafficCost: 662, competition: 0.07, url: 'https://www.synopsys.com/', serpFeatures: 'Knowledge panel', intent: 'Commercial' },
    { keyword: 'photonics', volume: 8100, difficulty: 64, cpc: 1.90, trend: [66, 100, 81, 81, 81, 66, 66, 81, 66, 66, 66, 66], position: 1, previousPosition: 1, traffic: 492, trafficPercentage: 0.57, trafficCost: 935, competition: 0.05, url: 'https://www.synopsys.com/photonics.html', serpFeatures: 'Image, Video, People also ask', intent: 'Informational' },
    { keyword: 'solvenet', volume: 590, difficulty: 29, cpc: 0.00, trend: [48, 100, 48, 32, 48, 48, 72, 59, 72, 59, 59, 72], position: 1, previousPosition: 1, traffic: 472, trafficPercentage: 0.55, trafficCost: 0, competition: 0.00, url: 'https://solvnet.synopsys.com/', serpFeatures: 'Sitelinks', intent: 'Navigational' },
    { keyword: 'synopsis company', volume: 2400, difficulty: 61, cpc: 0.00, trend: [2, 2, 2, 36, 29, 29, 24, 19, 29, 2, 3, 8], position: 1, previousPosition: 2, traffic: 470, trafficPercentage: 0.55, trafficCost: 0, competition: 0.03, url: 'https://www.synopsys.com/', serpFeatures: 'Sitelinks, Knowledge panel', intent: 'Commercial' },
    { keyword: 'snug', volume: 12100, difficulty: 61, cpc: 1.64, trend: [44, 54, 100, 66, 66, 54, 54, 44, 54, 44, 44, 36], position: 1, previousPosition: 1, traffic: 420, trafficPercentage: 0.49, trafficCost: 689, competition: 0.01, url: 'https://www.synopsys.com/snug/', serpFeatures: 'Sitelinks, Related searches', intent: 'Informational' },
    { keyword: 'wire harness', volume: 6600, difficulty: 33, cpc: 1.93, trend: [36, 54, 36, 54, 66, 36, 36, 36, 36, 44, 66, 36], position: 1, previousPosition: 1, traffic: 401, trafficPercentage: 0.47, trafficCost: 774, competition: 0.67, url: 'https://www.synopsys.com/automotive/wire-harness.html', serpFeatures: 'Image pack, Video', intent: 'Informational' },
    { keyword: 'synopsys solvnet', volume: 480, difficulty: 44, cpc: 0.00, trend: [30, 30, 36, 36, 20, 30, 30, 45, 30, 45, 67, 67], position: 1, previousPosition: 1, traffic: 384, trafficPercentage: 0.45, trafficCost: 0, competition: 0.00, url: 'https://solvnet.synopsys.com/', serpFeatures: 'Sitelinks', intent: 'Navigational' },
    { keyword: 'bms battery management system', volume: 1300, difficulty: 33, cpc: 1.65, trend: [37, 84, 100, 68, 52, 84, 68, 84, 52, 52, 68, 68], position: 1, previousPosition: 1, traffic: 322, trafficPercentage: 0.38, trafficCost: 531, competition: 0.28, url: 'https://www.synopsys.com/automotive/battery-management.html', serpFeatures: 'Image, People also ask', intent: 'Commercial' },
    { keyword: 'battery management system', volume: 2400, difficulty: 22, cpc: 1.84, trend: [82, 82, 82, 65, 100, 82, 82, 82, 82, 82, 100, 100], position: 1, previousPosition: 1, traffic: 316, trafficPercentage: 0.37, trafficCost: 581, competition: 0.28, url: 'https://www.synopsys.com/automotive/battery-management.html', serpFeatures: 'Image, Video, People also ask', intent: 'Informational' },
    { keyword: 'synopsis careers', volume: 390, difficulty: 31, cpc: 2.75, trend: [81, 66, 81, 54, 19, 44, 66, 66, 54, 44, 81, 44], position: 1, previousPosition: 1, traffic: 312, trafficPercentage: 0.36, trafficCost: 858, competition: 0.29, url: 'https://www.synopsys.com/careers.html', serpFeatures: 'Sitelinks', intent: 'Commercial' },
    { keyword: 'synopsys jobs', volume: 390, difficulty: 35, cpc: 0.00, trend: [54, 66, 66, 66, 100, 54, 66, 66, 54, 54, 44, 44], position: 1, previousPosition: 1, traffic: 312, trafficPercentage: 0.36, trafficCost: 0, competition: 0.29, url: 'https://www.synopsys.com/careers.html', serpFeatures: 'Job postings, Sitelinks', intent: 'Commercial' },
    { keyword: 'pci express', volume: 8100, difficulty: 49, cpc: 0.71, trend: [19, 24, 19, 100, 100, 100, 16, 66, 54, 66, 81, 54], position: 1, previousPosition: 2, traffic: 281, trafficPercentage: 0.33, trafficCost: 200, competition: 0.02, url: 'https://www.synopsys.com/designware-ip/interface-ip/pci-express.html', serpFeatures: 'Image, People also ask', intent: 'Informational' },
    { keyword: 'synopsys stock', volume: 12100, difficulty: 64, cpc: 2.10, trend: [19, 36, 36, 54, 36, 44, 44, 44, 44, 44, 66, 36], position: 2, previousPosition: 2, traffic: 266, trafficPercentage: 0.31, trafficCost: 559, competition: 0.46, url: 'https://www.synopsys.com/investor-relations.html', serpFeatures: 'Stock quotes, News', intent: 'Informational' },
    { keyword: 'simulation', volume: 22200, difficulty: 65, cpc: 1.15, trend: [67, 81, 67, 67, 81, 81, 100, 81, 81, 54, 44, 54], position: 1, previousPosition: 1, traffic: 266, trafficPercentage: 0.31, trafficCost: 306, competition: 0.10, url: 'https://www.synopsys.com/verification/simulation.html', serpFeatures: 'Video, People also ask', intent: 'Informational' },
    { keyword: 'adas', volume: 12100, difficulty: 51, cpc: 3.20, trend: [66, 54, 54, 44, 66, 66, 54, 66, 54, 54, 54, 54], position: 2, previousPosition: 3, traffic: 266, trafficPercentage: 0.31, trafficCost: 851, competition: 0.19, url: 'https://www.synopsys.com/automotive/adas.html', serpFeatures: 'Image, Video, People also ask', intent: 'Informational' },
    { keyword: 'serdes', volume: 1900, difficulty: 32, cpc: 4.98, trend: [100, 100, 84, 84, 100, 100, 100, 100, 100, 100, 100, 100], position: 1, previousPosition: 1, traffic: 250, trafficPercentage: 0.29, trafficCost: 1245, competition: 0.03, url: 'https://www.synopsys.com/designware-ip/interface-ip/serdes.html', serpFeatures: 'Image, People also ask', intent: 'Informational' },
    { keyword: 'bms battery', volume: 880, difficulty: 41, cpc: 1.19, trend: [72, 72, 88, 88, 88, 88, 72, 88, 100, 100, 88, 100], position: 1, previousPosition: 1, traffic: 218, trafficPercentage: 0.25, trafficCost: 259, competition: 0.28, url: 'https://www.synopsys.com/automotive/battery-management.html', serpFeatures: 'Image, People also ask', intent: 'Commercial' },
    { keyword: 'optical design', volume: 720, difficulty: 25, cpc: 2.10, trend: [84, 52, 31, 31, 25, 25, 20, 37, 37, 46, 31, 25], position: 1, previousPosition: 1, traffic: 178, trafficPercentage: 0.21, trafficCost: 374, competition: 0.12, url: 'https://www.synopsys.com/optical-solutions.html', serpFeatures: 'Image, Video', intent: 'Informational' }
];

export const paidKeywords: KeywordData[] = [
    {
        keyword: 'engine control module testing',
        volume: 170,
        difficulty: 18,
        cpc: 2.07,
        trend: [28, 100, 28, 28, 28, 23],
        position: 1,
        previousPosition: 1,
        traffic: 7,
        trafficPercentage: 33.33,
        trafficCost: 14,
        competition: 0.39,
        url: 'https://www.synopsys.com/verification/virtual-prototyping/tpt/test-connect/ecu-testing.html',
        intent: 'Informational'
    },
    {
        keyword: 'chiplet architecture',
        volume: 90,
        difficulty: 8,
        cpc: 3.67,
        trend: [23, 41, 29, 64, 64, 41],
        position: 1,
        previousPosition: 1,
        traffic: 4,
        trafficPercentage: 19.04,
        trafficCost: 14,
        competition: 0.11,
        url: 'https://www.synopsys.com/multi-die-system.html',
        intent: 'Commercial'
    }
];

export const trafficHistory: TrafficData[] = [
    {
        month: 'May 2025',
        organicTraffic: 367302,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Jun 2025',
        organicTraffic: 292055,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Jul 2025',
        organicTraffic: 389713,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Aug 2025',
        organicTraffic: 291313,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Sep 2025',
        organicTraffic: 257161,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Oct 2025',
        organicTraffic: 250977,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    },
    {
        month: 'Nov 2025',
        organicTraffic: 205168,
        paidTraffic: 21,
        directTraffic: 0,
        referralTraffic: 0
    }
];

export const competitors: CompetitorData[] = [
    { name: 'semiengineering.com', commonKeywords: 517, traffic: 9245, competitionLevel: 13, organicKeywords: 29154, organicCost: 20941, adwordsKeywords: 0 },
    { name: 'ansys.com', commonKeywords: 858, traffic: 139707, competitionLevel: 12, organicKeywords: 77389, organicCost: 357609, adwordsKeywords: 140 },
    { name: 'imaginationtech.com', commonKeywords: 278, traffic: 5714, competitionLevel: 9, organicKeywords: 2343, organicCost: 12693, adwordsKeywords: 0 },
    { name: 'mobileye.com', commonKeywords: 306, traffic: 16629, competitionLevel: 9, organicKeywords: 8032, organicCost: 39693, adwordsKeywords: 0 },
    { name: 'cadence.com', commonKeywords: 690, traffic: 141697, competitionLevel: 6, organicKeywords: 71612, organicCost: 301526, adwordsKeywords: 21 },
    { name: 'anysilicon.com', commonKeywords: 247, traffic: 7533, competitionLevel: 6, organicKeywords: 4064, organicCost: 11057, adwordsKeywords: 0 },
    { name: 'design-reuse.com', commonKeywords: 172, traffic: 1168, competitionLevel: 6, organicKeywords: 5102, organicCost: 7300, adwordsKeywords: 0 },
    { name: 'autopilotreview.com', commonKeywords: 183, traffic: 2913, competitionLevel: 5, organicKeywords: 3743, organicCost: 8566, adwordsKeywords: 0 },
    { name: 'waymo.com', commonKeywords: 341, traffic: 374274, competitionLevel: 5, organicKeywords: 109687, organicCost: 810164, adwordsKeywords: 0 },
    { name: 'semiwiki.com', commonKeywords: 177, traffic: 6355, competitionLevel: 5, organicKeywords: 10675, organicCost: 1583, adwordsKeywords: 0 }
];

export const metricsSummary: MetricSummary = {
    totalKeywords: 29909,
    organicTraffic: 85601,
    topKeywordsRanking: 6699,
    domainAuthority: 84,
    backlinks: 127500,
    trafficValue: 57701,
    adSpend: 8,
};

const calculateAdPerformance = () => {
    const novPaidTraffic = paidKeywords.reduce((sum, k) => sum + k.traffic, 0);
    const novPaidCost = paidKeywords.reduce((sum, k) => sum + (k.traffic * k.cpc), 0);
    const novOrganicValue = organicKeywords.reduce((sum, k) => sum + (k.traffic * k.cpc), 0);

    return [
        {
            month: 'Nov 2025',
            adSpend: Math.round(novPaidCost),
            organicValue: Math.round(novOrganicValue),
            paidTraffic: novPaidTraffic,
            organicTraffic: trafficHistory[6].organicTraffic
        }
    ];
};

export const adPerformanceData: AdPerformanceData[] = calculateAdPerformance();

export const topPages = [
    { url: 'https://www.synopsys.com/', traffic: 22968, trafficPercentage: 26.81, keywords: 6082, trafficChange: -1071, commercialTraffic: 5077, informationalTraffic: 1451, navigationalTraffic: 21481 },
    { url: 'https://www.synopsys.com/glossary/what-is-electronic-design-automation.html', traffic: 5689, trafficPercentage: 6.64, keywords: 186, trafficChange: 84, commercialTraffic: 12, informationalTraffic: 1996, navigationalTraffic: 3688 },
    { url: 'https://www.synopsys.com/glossary/what-is-wiring-harness.html', traffic: 4139, trafficPercentage: 4.83, keywords: 341, trafficChange: 1361, commercialTraffic: 490, informationalTraffic: 4002, navigationalTraffic: 0 },
    { url: 'https://www.synopsys.com/glossary/what-is-a-battery-management-system.html', traffic: 3296, trafficPercentage: 3.84, keywords: 431, trafficChange: -22, commercialTraffic: 1550, informationalTraffic: 2568, navigationalTraffic: 11 },
    { url: 'https://careers.synopsys.com/', traffic: 3053, trafficPercentage: 3.56, keywords: 987, trafficChange: -64, commercialTraffic: 2983, informationalTraffic: 1, navigationalTraffic: 2690 },
    { url: 'https://www.synopsys.com/blogs/chip-design/autonomous-driving-levels.html', traffic: 2212, trafficPercentage: 2.58, keywords: 1101, trafficChange: -151, commercialTraffic: 38, informationalTraffic: 2117, navigationalTraffic: 5 },
    { url: 'https://investor.synopsys.com/stock-info/default.aspx', traffic: 1937, trafficPercentage: 2.26, keywords: 62, trafficChange: 1121, commercialTraffic: 0, informationalTraffic: 1936, navigationalTraffic: 1 },
    { url: 'https://www.synopsys.com/glossary/what-is-autonomous-car.html', traffic: 1636, trafficPercentage: 1.91, keywords: 911, trafficChange: -668, commercialTraffic: 21, informationalTraffic: 1569, navigationalTraffic: 10 },
    { url: 'https://www.synopsys.com/glossary/what-is-static-timing-analysis.html', traffic: 1607, trafficPercentage: 1.87, keywords: 65, trafficChange: 469, commercialTraffic: 0, informationalTraffic: 1581, navigationalTraffic: 26 },
    { url: 'https://solvnetplus.synopsys.com/s/', traffic: 1521, trafficPercentage: 1.77, keywords: 74, trafficChange: -31, commercialTraffic: 1, informationalTraffic: 5, navigationalTraffic: 1356 }
];

export const geographicVisitsData = [
    { country: 'United States', traffic: 199921, percentage: 37.62 },
    { country: 'India', traffic: 67820, percentage: 12.76 },
    { country: 'Taiwan', traffic: 37705, percentage: 7.09 },
    { country: 'China', traffic: 34197, percentage: 6.43 },
    { country: 'Japan', traffic: 21255, percentage: 4.0 }
];

export const geographicUniqueVisitorsData = [
    { country: 'United States', traffic: 80198, percentage: 31.95 },
    { country: 'India', traffic: 45433, percentage: 18.1 },
    { country: 'China', traffic: 14347, percentage: 5.72 },
    { country: 'Taiwan', traffic: 14229, percentage: 5.67 },
    { country: 'Germany', traffic: 11339, percentage: 4.52 }
];

export const trafficMetrics = {
    uniqueVisitors: [
        { month: 'May 2025', value: 367302 },
        { month: 'Jun 2025', value: 292055 },
        { month: 'Jul 2025', value: 389713 },
        { month: 'Aug 2025', value: 291313 },
        { month: 'Sep 2025', value: 257161 },
        { month: 'Oct 2025', value: 250977 },
        { month: 'Nov 2025', value: 205168 }
    ],
    visits: [
        { month: 'May 2025', value: 835658 },
        { month: 'Jun 2025', value: 643934 },
        { month: 'Jul 2025', value: 802731 },
        { month: 'Aug 2025', value: 587929 },
        { month: 'Sep 2025', value: 527145 },
        { month: 'Oct 2025', value: 531464 },
        { month: 'Nov 2025', value: 460075 }
    ],
    bounceRate: [
        { month: 'May 2025', value: 57.72 },
        { month: 'Jun 2025', value: 50.62 },
        { month: 'Jul 2025', value: 50.85 },
        { month: 'Aug 2025', value: 50.21 },
        { month: 'Sep 2025', value: 48.63 },
        { month: 'Oct 2025', value: 50.03 },
        { month: 'Nov 2025', value: 43.38 }
    ],
    avgVisitDuration: [
        { month: 'May 2025', value: 713 },
        { month: 'Jun 2025', value: 881 },
        { month: 'Jul 2025', value: 760 },
        { month: 'Aug 2025', value: 737 },
        { month: 'Sep 2025', value: 658 },
        { month: 'Oct 2025', value: 747 },
        { month: 'Nov 2025', value: 589 }
    ],
    pagesPerVisit: [
        { month: 'May 2025', value: 4.05 },
        { month: 'Jun 2025', value: 5.56 },
        { month: 'Jul 2025', value: 4.65 },
        { month: 'Aug 2025', value: 4.54 },
        { month: 'Sep 2025', value: 4.20 },
        { month: 'Oct 2025', value: 4.49 },
        { month: 'Nov 2025', value: 5.04 }
    ],
    purchaseConversion: [
        { month: 'May 2025', value: 0.02 },
        { month: 'Jun 2025', value: 0 },
        { month: 'Jul 2025', value: 0.01 },
        { month: 'Aug 2025', value: 0.91 },
        { month: 'Sep 2025', value: 0.74 },
        { month: 'Oct 2025', value: 0.02 },
        { month: 'Nov 2025', value: 0 }
    ]
};

export const aiInsights = [
    {
        type: 'warning' as const,
        title: 'Critical Traffic Decline: 44% Drop in 4 Months',
        description: 'Unique visitors plummeted from 389.7K (July) to 205.2K (November). Traffic value declined 8.7% despite maintaining 30.4K keywords. This sharp decline coincides with -61.9% paid traffic reduction, suggesting a shift in digital strategy or market conditions requiring immediate investigation.'
    },
    {
        type: 'positive' as const,
        title: 'Strong Keyword Portfolio with #1 Rankings',
        description: 'Dominating with 30,403 organic keywords generating $70.2K monthly traffic value. 25 of top 30 keywords hold position #1, including high-volume terms like "synopsys" (11,840 visitors), "eda" (3,547 visitors), and "wiring harness" (2,455 visitors). This indicates strong domain authority and brand presence.'
    },
    {
        type: 'positive' as const,
        title: 'Engagement Quality Improving Despite Traffic Loss',
        description: 'Bounce rate improved 25% (57.7% → 43.4%), average pages per visit increased to 5.04, and visit duration remains healthy at 9:49. This suggests content quality is strong and retaining engaged visitors even as overall traffic decreases.'
    },
    {
        type: 'warning' as const,
        title: 'Glossary Pages Driving Disproportionate Value',
        description: 'Technical glossary pages (EDA, wiring harness, BMS) collectively generate 13.3K visitors (15.5% of total) with only 958 keywords. Homepage alone captures 26.8% of traffic with 6,082 keywords. This concentration creates vulnerability and indicates untapped content opportunities.'
    },
    {
        type: 'neutral' as const,
        title: 'Competitor Keyword Overlap Presents Growth Opportunity',
        description: 'Significant overlap with Ansys (858 common keywords, $50.5K traffic value) and Cadence (690 keywords, $17.5K value). With 1.02M backlinks and strong domain authority, there\'s opportunity to capture more share in contested spaces like semiconductor IP, verification, and automotive electronics.'
    }
];

export const actionableInsights = [
    {
        priority: 'high' as const,
        action: 'Conduct comprehensive traffic decline audit covering Google algorithm updates (July-Nov), technical SEO issues, Core Web Vitals, mobile performance, and competitor movements. The 44% drop (-184K visitors) coinciding with 61.9% paid traffic reduction suggests coordinated digital strategy changes.',
        impact: 'Critical',
        effort: 'High',
        category: 'Emergency Audit'
    },
    {
        priority: 'high' as const,
        action: 'Scale glossary content program - Current 3 glossary pages generate 13.3K visitors (15.5% of traffic) with exceptional performance. Create 20+ new technical glossary entries targeting semiconductor, automotive, and verification terminology to capture informational intent traffic.',
        impact: 'Very High',
        effort: 'Medium',
        category: 'Content Expansion'
    },
    {
        priority: 'high' as const,
        action: 'Optimize homepage CTR and engagement - With 22,968 visitors (26.8% of traffic) from 6,082 keywords but -1,071 traffic loss, improve meta descriptions, title tags, and structured data. Test featured snippets for top brand queries to increase click-through rate.',
        impact: 'High',
        effort: 'Low',
        category: 'On-Page SEO'
    },
    {
        priority: 'medium' as const,
        action: 'Target Ansys keyword gaps - With 858 common keywords generating $50.5K value for them vs your $70.2K across all keywords, identify 50-100 high-value keywords where Ansys ranks but you don\'t. Focus on verification, simulation, and photonics clusters.',
        impact: 'High',
        effort: 'High',
        category: 'Competitive Strategy'
    },
    {
        priority: 'medium' as const,
        action: 'Launch targeted paid search for commercial-intent careers and investor relations terms. Currently 2,983 commercial visitors on careers page with declining traffic (-64). Capture high-intent job seekers and investor audiences with modest budget ($2-5K/month).',
        impact: 'Medium',
        effort: 'Low',
        category: 'Paid Acquisition'
    },
    {
        priority: 'medium' as const,
        action: 'Strengthen APAC content and localization - India (18.1% unique visitors) and China/Taiwan (11.4% combined) represent massive opportunity. Create region-specific content, improve page load times for APAC regions, and consider local language pages for key product categories.',
        impact: 'Medium',
        effort: 'High',
        category: 'International SEO'
    },
    {
        priority: 'low' as const,
        action: 'Leverage improved engagement metrics (43.4% bounce rate, 5.04 pages/visit) as proof of content quality. Use these signals to justify increased content investment and demonstrate to Google that user experience is improving even as traffic declines.',
        impact: 'Low',
        effort: 'Low',
        category: 'Analytics & Reporting'
    }
];
