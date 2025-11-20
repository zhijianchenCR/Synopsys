export function parseCSVNumber(value: string): number {
    if (!value || value === 'n/a' || value === 'N/A') return 0;
    const cleaned = value.replace(/,/g, '').replace(/"/g, '').replace(/%/g, '');
    return parseFloat(cleaned) || 0;
}

export function parsePercentage(value: string): number {
    if (!value || value === 'n/a' || value === 'N/A') return 0;
    const cleaned = value.replace(/%/g, '').replace(/"/g, '');
    return parseFloat(cleaned) || 0;
}

export function parseTimeToSeconds(time: string): number {
    if (!time || time === 'n/a') return 0;
    const parts = time.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    }
    return 0;
}

export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
