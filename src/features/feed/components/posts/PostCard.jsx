import { DEFAULT_USERNAME_FALLBACK } from "../../utils/feedConstant.js";
import "../../styles/PostCard.css"
import {formatPostTime} from "../../utils/formatPostTime.js";

function PostCard({ post }) {
    if (!post) {
        return null;
    }

    const firstLetter = post.username
        ? post.username.charAt(0).toUpperCase()
        : DEFAULT_USERNAME_FALLBACK;
    const createdAt = formatPostTime(post.createdAt);

    return (
        <article className="post-card">
            <div className="post-card__header">
                <div className="post-card__user">
                    {post.profilePicture ? (
                        <img
                            className="post-card__image"
                            src={post.profilePicture}
                            alt={post.username}
                        />
                    ) : (
                        <div className="post-card__avatar-fallback">
                            {firstLetter}
                        </div>
                    )}

                    <div className="post-card__meta">
                        <span className="post-card__username">
                            {post.username}
                        </span>

                        <span className="post-card__time">
                            {createdAt}
                        </span>
                    </div>
                </div>
            </div>

            <div className="post-card__content">
                {post.content}
            </div>
        </article>
    );
}

export default PostCard;