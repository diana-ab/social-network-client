import {useEffect, useState} from "react";
import {createPost, getFeedPosts, getMyProfile} from "../services/feedService.js";

function useFeedPosts() {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [createPostError, setCreatePostError] = useState("");
    const [loadPostsError, setLoadPostsError] = useState("");

    // const [currentUser, setCurrentUser] = useState(null);
    // קשור לזימון לזה שעם אני לא רוצהל זמן פיד ישר בכל יצירת פוסט חדש

    useEffect(() => {
        loadFeedPosts();

        // loadInitialData()

    }, []);


    // const loadInitialData = async () => {
    //     setIsLoadingPosts(true);
    //     setLoadPostsError("");
    //     try {
    //         const [feedResponse, userResponse] = await Promise.all([
    //             getFeedPosts(),
    //             getMyProfile(),
    //         ]);
    //         if (!feedResponse.success) {
    //             setLoadPostsError("Failed to load feed posts");
    //             return;
    //         }
    //         setPosts(feedResponse.posts || []);
    //         if (userResponse.success) {
    //             setCurrentUser(userResponse.user);
    //         }
    //     } catch (error) {
    //         setLoadPostsError("Failed to load data");
    //     } finally {
    //         setIsLoadingPosts(false);
    //     }
    // };







    const loadFeedPosts = async () => {
        setIsLoadingPosts(true);
        setLoadPostsError("");
        try {
            const response = await getFeedPosts();
            if (!response.success) {
                setLoadPostsError("Failed to load feed posts");
                return;
            }
            setPosts(response.posts || []);
        } catch (error) {
            setLoadPostsError("Failed to load feed posts");
        } finally {
            setIsLoadingPosts(false);
        }
    };


    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
        if (createPostError) {
            setCreatePostError("");
        }
    };



    const handleCreatePost = async () => {
        const trimmedPostText = postText.trim();
        if (!trimmedPostText) {
            setCreatePostError("Post content cannot be empty");
            return;}

        setIsCreatingPost(true);
        setCreatePostError("");
        try {
            const response = await createPost(trimmedPostText);
            console.log(response);
            if (!response.success) {
                setCreatePostError("Failed to create post");
                return;
            }

            // יש את השיטה הזאת לייצר פוסט חדש ממש דומה למה שאתה יוצר ולא צריך לזמן את הפיד כל הזמן ישר
            // const newPost = {
            //     id: Date.now(),
            //     content: trimmedPostText,
            //     createdAt: new Date().toISOString(),
            //     username: currentUser?.username || "you",
            //     profilePicture: currentUser?.profileImageUrl || "",
            // };
            //setPosts((prev) => [newPost, ...prev]);

            // או לחכות לעדכון מהפיד וזה יכול להיות עדיף מהבחינה שעם נוסיף לייק ומחיקה
            await loadFeedPosts();
            setPostText("");
        } catch (error) {
            setCreatePostError("Failed to create post");
        } finally {
            setIsCreatingPost(false);
        }
    };

    return {
        postText,
        posts,
        isCreatingPost,
        isLoadingPosts,
        createPostError,
        loadPostsError,
        handlePostTextChange,
        handleCreatePost,
        loadFeedPosts,
    };
}

export default useFeedPosts;