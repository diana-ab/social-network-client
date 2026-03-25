
import PostList from "../post/PostList.jsx";
import CreatePostBox from "../post/CreatePostBox.jsx";
import {useState} from "react";


function FeedMain() {

    const [postText, setPostText] = useState("");
    const mockPosts = [
        {
            id: 1,
            content: "פוסט ישן יותר",
            createdAt: "2026-03-25T10:00:00",
            username: "shimon",
            profilePicture: "",
        },
        {
            id: 2,
            content: "פוסט חדש יותר",
            createdAt: "2026-03-25T12:00:00",
            username: "diana",
            profilePicture: "",
        },
        {
            id: 3,
            content: "עוד פוסט באמצע",
            createdAt: "2026-03-25T11:00:00",
            username: "kloy",
            profilePicture: "",
        },
    ];

    const handleCreatePost = () => {
        console.log("New post:", postText);
    };


    return (
        <main className="feed-main">
            <CreatePostBox value={postText}
                           onChange={(event) => setPostText(event.target.value)}
                           onSubmit={handleCreatePost}/>
            <PostList posts={mockPosts}/>
        </main>
    );
}

export default FeedMain;