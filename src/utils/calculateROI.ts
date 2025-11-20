interface KeywordData {
    traffic: number;
    trafficCost: number;
}

interface ROIMetrics {
    totalPaidTraffic: number;
    totalPaidCost: number;
    totalOrganicTraffic: number;
    totalOrganicValue: number;
    roi: number;
    costPerVisit: number;
    organicSavings: number;
    organicMultiplier: number;
}

export function calculateROIMetrics(
    organicKeywords: KeywordData[],
    paidKeywords: KeywordData[]
): ROIMetrics {
    const totalPaidTraffic = paidKeywords.reduce((sum, k) => sum + k.traffic, 0);
    const totalPaidCost = paidKeywords.reduce((sum, k) => sum + k.trafficCost, 0);

    const totalOrganicTraffic = organicKeywords.reduce((sum, k) => sum + k.traffic, 0);
    const totalOrganicValue = organicKeywords.reduce((sum, k) => sum + k.trafficCost, 0);

    const roi = totalPaidCost > 0
        ? ((totalOrganicValue - totalPaidCost) / totalPaidCost) * 100
        : 0;

    const costPerVisit = totalPaidTraffic > 0
        ? totalPaidCost / totalPaidTraffic
        : 0;

    const organicSavings = totalOrganicValue - totalPaidCost;

    const organicMultiplier = totalPaidCost > 0
        ? totalOrganicValue / totalPaidCost
        : 0;

    return {
        totalPaidTraffic,
        totalPaidCost,
        totalOrganicTraffic,
        totalOrganicValue,
        roi,
        costPerVisit,
        organicSavings,
        organicMultiplier
    };
}

export function formatCurrency(value: number): string {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(2)}`;
}

export function formatLargeNumber(value: number): string {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
}
