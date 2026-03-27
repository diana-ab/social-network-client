import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import useCreatePost from "../../hooks/useCreatePost.js";
import {FEED_PAGE_MESSAGES} from "../../constants/feedMessages.js";
import "../../styles/FeedMain.css";
import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";


function FeedMain({
                      posts,
                      setPosts,
                      currentUser,
                      viewMode,
                      onChangeViewMode,
                      onDeletePost,
                      isSwitchingPosts,
                      postsError,
                  }) {
    const {
        postText,
        isCreatingPost,
        errorMessage,
        successMessage,
        handlePostTextChange,
        handleCreatePost,
    } = useCreatePost({currentUser, setPosts});

    return (
        <main className="feed-main">
            {successMessage && (
                <div className="feed-main__toast-success">
                    {successMessage}
                </div>
            )}

            <div className="feed-main__tabs-shell">
                <div className="feed-main__tabs">
                    <CustomButton
                        text="Feed"
                        onClick={() => onChangeViewMode("feed")}
                        fullWidth={false}
                        className={`feed-main__tab-button ${
                            viewMode === "feed" ? "feed-main__tab-button--active" : ""
                        }`}
                    />

                    <CustomButton
                        text="My Posts"
                        onClick={() => onChangeViewMode("my-posts")}
                        fullWidth={false}
                        className={`feed-main__tab-button ${
                            viewMode === "my-posts" ? "feed-main__tab-button--active" : ""
                        }`}
                    />
                </div>
            </div>

            <div className="feed-main__top">
                <CreatePostBox
                    value={postText}
                    onChange={handlePostTextChange}
                    onSubmit={handleCreatePost}
                    isLoading={isCreatingPost}
                />

                {errorMessage && (
                    <p className="feed-main__error">{errorMessage}</p>
                )}

                {postsError && (
                    <p className="feed-main__error">{postsError}</p>
                )}
            </div>

            <div
                className="feed-main__posts-scroll"
                role="region"
                aria-label="Posts feed"
            >
                {isSwitchingPosts ? (
                    <div className="post-list__empty">
                        {FEED_PAGE_MESSAGES.LOADING_SWITCHED_POSTS}
                    </div>
                ) : (
                    <PostList
                        posts={posts}
                        currentUser={currentUser}
                        onDeletePost={onDeletePost}
                    />
                )}
            </div>
        </main>
    );
}

export default FeedMain;