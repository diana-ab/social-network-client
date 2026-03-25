export function formatPostTime(createdAt) {
    if (!createdAt) {
        return "";
    }

    const postDate = new Date(createdAt);
    const now = new Date();

    const diffInMilliseconds = now - postDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
        return "Just now";
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    return `${diffInDays}d`;
}