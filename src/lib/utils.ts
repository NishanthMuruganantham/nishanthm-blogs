import readingTime from 'reading-time';

export function getReadingTime(content: string): string {
    const stats = readingTime(content);
    return stats.text; // "5 min read"
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}
