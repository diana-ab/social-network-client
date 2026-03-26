import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import useFeedPosts from "../../hooks/useFeedPosts.js";
import "../../styles/FeedMain.css";

function FeedMain({ refreshKey }) {
    const {postText, posts, isCreatingPost, isLoadingPosts, errorMessage, successMessage, handleCreatePost, handlePostTextChange,} = useFeedPosts(refreshKey);

    return (
        <main className="feed-main">
            <div className="feed-main__top">
                <CreatePostBox
                    value={postText}
                    onChange={handlePostTextChange}
                    onSubmit={handleCreatePost}
                    isLoading={isCreatingPost}
                />

                {errorMessage && <p className="feed-main__error">{errorMessage}</p>}
                {successMessage && <p className="feed-main__success">{successMessage}</p>}
                {isLoadingPosts && <p className="feed-main__hint">Loading posts...</p>}
            </div>

            <div className="feed-main__posts-scroll" role="region" aria-label="Posts feed">
                <PostList posts={posts} />
            </div>
        </main>
    );
}

export default FeedMain;