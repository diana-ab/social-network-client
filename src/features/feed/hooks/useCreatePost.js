    import {useEffect, useState} from "react";
    import {createPost} from "../services/feedService.js";
    import {FEED_LIMIT} from "../constants/feedConstants.js";
    import {FEED_POST_MESSAGES} from "../constants/feedMessages.js";

    function useCreatePost({currentUser, setPosts}) {
        const [postText, setPostText] = useState("");
        const [isCreatingPost, setIsCreatingPost] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
        const [successMessage, setSuccessMessage] = useState("");

        useEffect(() => {
            if (!successMessage) {
                return;
            }

            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 2500);

            return () => clearTimeout(timer);
        }, [successMessage]);

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
                setErrorMessage(FEED_POST_MESSAGES.EMPTY_POST);
                return;
            }

            setIsCreatingPost(true);
            setErrorMessage("");
            setSuccessMessage("");

            try {
                const response = await createPost(trimmedPostText);

                if (!response.success) {
                    setErrorMessage(FEED_POST_MESSAGES.CREATE_POST_ERROR);
                    return;
                }

                const newPost = {
                    id: response.postId ?? Date.now(),
                    userId: currentUser?.id,
                    content: trimmedPostText,
                    createdAt: new Date().toISOString(),
                    username: currentUser?.username,
                    profilePicture: currentUser?.profilePicture,
                };

                setPosts((previousPosts) => [newPost, ...previousPosts].slice(0, FEED_LIMIT));
                setPostText("");
                setSuccessMessage(FEED_POST_MESSAGES.CREATE_POST_SUCCESS);
            } catch (error) {
                setErrorMessage(FEED_POST_MESSAGES.CREATE_POST_ERROR);
            } finally {
                setIsCreatingPost(false);
            }
        };

        return {
            postText,
            isCreatingPost,
            errorMessage,
            successMessage,
            handlePostTextChange,
            handleCreatePost,
        };
    }

    export default useCreatePost;