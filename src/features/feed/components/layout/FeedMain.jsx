
import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import useFeedPosts from "../../hooks/useFeedPosts.js";


function FeedMain() {
    const {postText, posts, isCreatingPost, isLoadingPosts, createPostError, loadPostsError,
        handleCreatePost, handlePostTextChange,} = useFeedPosts();

    return (
        <main className="feed-main">
            <CreatePostBox
                value={postText}
                onChange={handlePostTextChange}
                onSubmit={handleCreatePost}
                isLoading={isCreatingPost}
            />
            {createPostError && (
                <p className="feed-main-error">{createPostError}</p>
            )}
            {isLoadingPosts && <p>Loading posts...</p>}
            {loadPostsError && (
                <p className="feed-main-error">{loadPostsError}</p>
            )}

            <PostList posts={posts}/>
        </main>
    );
}

export default FeedMain;