// import PostList from "../posts/PostList.jsx";
// import CreatePostBox from "../posts/CreatePostBox.jsx";
// import useCreatePost from "../../hooks/useCreatePost.js";
// import "../../styles/FeedMain.css";
//
// function FeedMain({ posts, setPosts, currentUser }) {
//     const {
//         postText,
//         isCreatingPost,
//         errorMessage,
//         successMessage,
//         handlePostTextChange,
//         handleCreatePost,
//     } = useCreatePost({ currentUser, setPosts });
//
//     return (
//         <main className="feed-main">
//             <div className="feed-main__top">
//                 <CreatePostBox
//                     value={postText}
//                     onChange={handlePostTextChange}
//                     onSubmit={handleCreatePost}
//                     isLoading={isCreatingPost}
//                 />
//
//                 {errorMessage && (
//                     <p className="feed-main__error">{errorMessage}</p>
//                 )}
//
//                 {successMessage && (
//                     <p className="feed-main__success">{successMessage}</p>
//                 )}
//             </div>
//
//             <div
//                 className="feed-main__posts-scroll"
//                 role="region"
//                 aria-label="Posts feed"
//             >
//                 <PostList posts={posts} />
//             </div>
//         </main>
//     );
// }
//
// export default FeedMain;



import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import useCreatePost from "../../hooks/useCreatePost.js";
import "../../styles/FeedMain.css";

function FeedMain({ posts, setPosts, currentUser }) {
    const {
        postText,
        isCreatingPost,
        errorMessage,
        successMessage,
        handlePostTextChange,
        handleCreatePost,
    } = useCreatePost({ currentUser, setPosts });

    return (
        <main className="feed-main">
            {successMessage && (
                <div className="feed-main__toast-success">
                    {successMessage}
                </div>
            )}

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
            </div>

            <div
                className="feed-main__posts-scroll"
                role="region"
                aria-label="Posts feed"
            >
                <PostList posts={posts} />
            </div>
        </main>
    );
}

export default FeedMain;