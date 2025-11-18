interface TrendLineChartProps {
    data: number[];
    color?: string;
    height?: number;
}

export default function TrendLineChart({ data, color = '#3b82f6', height = 60 }: TrendLineChartProps) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    const trend = data[data.length - 1] > data[0] ? 'up' : 'down';

    return (
        <svg
            width="100%"
            height={height}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="overflow-visible"
        >
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
                </linearGradient>
            </defs>

            <polygon
                points={`0,100 ${points} 100,100`}
                fill={`url(#gradient-${color})`}
            />

            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className={trend === 'up' ? 'animate-pulse' : ''}
            />

            {data.map((value, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((value - min) / range) * 100;
                return (
                    <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill={color}
                        vectorEffect="non-scaling-stroke"
                        className="hover:r-3 transition-all"
                    />
                );
            })}
        </svg>
    );
}
