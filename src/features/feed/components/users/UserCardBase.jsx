
import "../../styles/UserCardBase.css";
import { DEFAULT_USERNAME_FALLBACK } from "../../utils/feedConstant.js";

function UserCardBase({ user, rightContent, onClick, className = "" }) {
    if (!user) {
        return null;
    }

    const username = user.username || DEFAULT_USERNAME_FALLBACK;
    const firstLetter = username.charAt(0).toUpperCase();
    const profileImage = user.profilePicture || user.profileImage || "";

    return (
        <div
            className={`user-card-base ${onClick ? "user-card-base--clickable" : ""} ${className}`.trim()}
            onClick={onClick}
        >
            <div className="user-card-base__left">
                {profileImage ? (
                    <img
                        className="user-card-base__image"
                        src={profileImage}
                        alt={username}
                    />
                ) : (
                    <div className="user-card-base__avatar-fallback">
                        {firstLetter}
                    </div>
                )}
                <span className="user-card-base__username">
                    {username}
                </span>
            </div>

            <div className="user-card-base__right">
                {rightContent}
            </div>
        </div>
    );
}

export default UserCardBase;