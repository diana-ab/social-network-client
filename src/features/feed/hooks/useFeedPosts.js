import { useEffect, useState } from "react";
import { createPost, getFeedPosts } from "../services/feedService.js";
import useErrorMessage from "../../../shared/hooks/useErrorMessage.js";
import { FEED_MESSAGES } from "../../../shared/constants/messages.js";

function useFeedPosts() {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const {
        errorMessage,
        setErrorMessage,
        clearErrorMessage,
        setErrorMessageFromApiError,
    } = useErrorMessage();

    useEffect(() => {
        loadFeedPosts();
    }, []);

    const clearMessages = () => {
        clearErrorMessage();
        setSuccessMessage("");
    };

    const loadFeedPosts = async () => {
        setIsLoadingPosts(true);
        clearMessages();

        try {
            const response = await getFeedPosts();
            setPosts(response.posts || []);
        } catch (error) {
            setErrorMessageFromApiError(error);
        } finally {
            setIsLoadingPosts(false);
        }
    };

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
        if (errorMessage || successMessage) {
            clearMessages();
        }
    };

    const handleCreatePost = async () => {
        const trimmedPostText = postText.trim();

        if (!trimmedPostText) {
            setErrorMessage(FEED_MESSAGES.EMPTY_POST);
            return;
        }

        setIsCreatingPost(true);
        clearMessages();

        try {
            await createPost(trimmedPostText);
            await loadFeedPosts();
            setPostText("");
            setSuccessMessage(FEED_MESSAGES.CREATE_POST_SUCCESS);
        } catch (error) {
            setErrorMessageFromApiError(error);
        } finally {
            setIsCreatingPost(false);
        }
    };

    return {
        postText,
        posts,
        isCreatingPost,
        isLoadingPosts,
        errorMessage,
        successMessage,
        handlePostTextChange,
        handleCreatePost,
        loadFeedPosts,
    };
}

export default useFeedPosts;