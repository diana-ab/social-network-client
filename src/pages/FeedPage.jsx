
import FeedBody from "../features/feed/components/layout/FeedBody.jsx";
import FeedHeader from "../features/feed/components/layout/FeedHeader.jsx";
import "../features/feed/styles/FeedPage.css";


function FeedPage() {
    return (
        <div className="feed-page">
            <FeedHeader />
            <FeedBody />
        </div>
    );
}

export default FeedPage;