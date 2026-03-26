
import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import useFeedPosts from "../../hooks/useFeedPosts.js";
import "../../styles/FeedMain.css";


function FeedMain() {
    const {postText, posts, isCreatingPost, isLoadingPosts, createPostError, loadPostsError,
        handleCreatePost, handlePostTextChange,} = useFeedPosts();





    return (
        <main className="feed-main">
            <div className="feed-main__top">
                <CreatePostBox
                    value={postText}
                    onChange={handlePostTextChange}
                    onSubmit={handleCreatePost}
                    isLoading={isCreatingPost}
                />
                {createPostError && <p className="feed-main__error">{createPostError}</p>}
                {isLoadingPosts && <p className="feed-main__hint">Loading posts...</p>}
                {loadPostsError && <p className="feed-main__error">{loadPostsError}</p>}
            </div>

            <div className="feed-main__posts-scroll" role="region" aria-label="Posts feed">
                <PostList posts={posts} />
            </div>
        </main>
    );
}

export default FeedMain;