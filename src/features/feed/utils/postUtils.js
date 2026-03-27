import {FEED_LIMIT} from "../constants/feedConstants.js";

export function mergePostsWithoutDuplicates(oldPosts, newPosts) {
    const merged = [...newPosts, ...oldPosts];

    const uniquePosts = merged.filter((post, index, array) => {
        return index === array.findIndex((currentPost) => currentPost.id === post.id);
    });

    return uniquePosts
        .sort((firstPost, secondPost) => new Date(secondPost.createdAt) - new Date(firstPost.createdAt))
        .slice(0, FEED_LIMIT);
}