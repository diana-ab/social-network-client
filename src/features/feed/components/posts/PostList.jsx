import "../../styles/PostList.css";
import PostCard from "./PostCard.jsx";

function PostList({posts = [], currentUser, onDeletePost}) {
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
        return secondCreatedAt - firstCreatedAt;
    });

    return (
        <div className="post-list">
            {sortedPosts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onDeletePost={onDeletePost}
                />
            ))}
        </div>
    );
}

export default PostList;