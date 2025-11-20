import { useState, useEffect } from 'react';
import { loadAllSEMrushData } from './../utils/semrushParser';
import type { OrganicKeyword, PaidKeyword, Competitor, TrafficTrend, GeoDistribution, TopPage } from './../utils/semrushParser';

export interface SEMrushData {
    organicKeywords: OrganicKeyword[];
    paidKeywords: PaidKeyword[];
    competitors: Competitor[];
    trafficTrends: {
        visits: TrafficTrend[];
        uniqueVisitors: TrafficTrend[];
        avgVisitDuration: TrafficTrend[];
        bounceRate: TrafficTrend[];
        pagesPerVisit: TrafficTrend[];
        purchaseConversion: TrafficTrend[];
    };
    geoDistribution: {
        visits: GeoDistribution[];
        uniqueVisitors: GeoDistribution[];
    };
    topPages: TopPage[];
}

export function useSEMrushData() {
    const [data, setData] = useState<SEMrushData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAllSEMrushData()
            .then(loadedData => {
                setData(loadedData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load SEMrush data:', err);
                setError('Failed to load data');
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
