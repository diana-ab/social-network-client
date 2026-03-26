import { useState } from "react";
import PostList from "../posts/PostList.jsx";
import CreatePostBox from "../posts/CreatePostBox.jsx";
import { createPost } from "../../services/feedService.js";
import "../../styles/FeedMain.css";

function FeedMain({ posts, setPosts, currentUser }) {
    const [postText, setPostText] = useState("");
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);

        if (errorMessage) {
            setErrorMessage("");
        }

        if (successMessage) {
            setSuccessMessage("");
        }
    };

    const handleCreatePost = async () => {
        const trimmedPostText = postText.trim();

        if (!trimmedPostText) {
            setErrorMessage("Post cannot be empty");
            return;
        }

        setIsCreatingPost(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await createPost(trimmedPostText);

            if (!response.success) {
                setErrorMessage("Failed to create post");
                return;
            }

            const newPost = {
                id: Date.now(),
                userId: currentUser?.id,
                content: trimmedPostText,
                createdAt: new Date().toISOString(),
                username: currentUser?.username,
                profilePicture: currentUser?.profilePicture,
            };

            setPosts((previousPosts) => [newPost, ...previousPosts].slice(0, 20));
            setPostText("");
            setSuccessMessage("Post created successfully");
        } catch (error) {
            setErrorMessage("Failed to create post");
        } finally {
            setIsCreatingPost(false);
        }
    };

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
            </div>

            <div className="feed-main__posts-scroll" role="region" aria-label="Posts feed">
                <PostList posts={posts} />
            </div>
        </main>
    );
}

export default FeedMain;