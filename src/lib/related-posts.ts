import type { CollectionEntry } from "astro:content";

/**
 * Calculates related posts based on category, tags, and recency.
 * 
 * Scoring System:
 * - Category match: +10 points
 * - Shared tags: +5 points for each common tag
 * - Recency bonus: Up to +30 points (decaying over 30 days)
 */
export function getRelatedPosts(
    currentPost: CollectionEntry<"blog">,
    allPosts: CollectionEntry<"blog">[],
    limit = 3
): CollectionEntry<"blog">[] {
    const currentCategory = currentPost.data.category;
    const currentTags = currentPost.data.tags || [];

    // Filter out historical drafts and the current post
    const candidates = allPosts.filter(
        (post) => post.slug !== currentPost.slug && !post.data.draft
    );

    const scoredPosts = candidates.map((post) => {
        let score = 0;

        // 1. Category Score (+10)
        if (post.data.category === currentCategory) {
            score += 10;
        }

        // 2. Tag Correlation Score (+5 per tag)
        const postTags = post.data.tags || [];
        const sharedTags = postTags.filter((tag) =>
            currentTags.includes(tag)
        );
        score += sharedTags.length * 5;

        // 3. Recency Bonus (Max +30)
        // Newer posts get a bonus that decays over 30 days
        const publishDate = post.data.date instanceof Date ? post.data.date : new Date(post.data.date);
        const daysSincePublished = Math.floor(
            (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        score += Math.max(0, 30 - daysSincePublished);

        return { post, score };
    });

    // Sort by descending score
    const sorted = scoredPosts.sort((a, b) => b.score - a.score);

    // If we have enough related posts, return them
    if (sorted.length >= limit) {
        return sorted.slice(0, limit).map((item) => item.post);
    }

    // If we don't have enough, we'll pad with the most recent posts that aren't already included
    const relatedPosts = sorted.map((item) => item.post);
    const existingIds = new Set(relatedPosts.map((p) => p.slug));
    
    const additionalPosts = candidates
        .filter((p) => !existingIds.has(p.slug))
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
        .slice(0, limit - relatedPosts.length);

    return [...relatedPosts, ...additionalPosts].slice(0, limit);
}
