
import "./style_post/PostList.css";
import PostCard from "./PostCard.jsx";

function PostList({ posts = [] }) {

    if (!posts.length) {
        return (
            <div className="post-list__empty">
                No posts yet
            </div>
        );
    }
    const sortedPosts = [...posts].sort((firstPost, secondPost) => {
        const firstCreatedAt = new Date(firstPost.createdAt);
        const secondCreatedAt = new Date(secondPost.createdAt);
        console.log(firstCreatedAt, secondCreatedAt);
        return secondCreatedAt - firstCreatedAt;
    });

    return (
        <div className="post-list">
            {sortedPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
}

export default PostList;