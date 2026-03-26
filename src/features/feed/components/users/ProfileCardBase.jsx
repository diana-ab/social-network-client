import "../../styles/ProfileCard.css";

function ProfileCardBase({ user, onClick, className = "" }) {
    if (!user) {
        return null;
    }

    const username = user.username || "Unknown user";
    const profileImage = user.profilePicture || user.profileImage || "";
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div
            className={`profile-card-base ${className}`.trim()}
            onClick={onClick}
        >
            <div className="profile-card-base__avatar-wrapper">
                {profileImage ? (
                    <img
                        className="profile-card-base__avatar"
                        src={profileImage}
                        alt={username}
                    />
                ) : (
                    <div className="profile-card-base__avatar-fallback">
                        {firstLetter}
                    </div>
                )}
            </div>

            <div className="profile-card-base__content">
                <h3 className="profile-card-base__username">{username}</h3>
                <p className="profile-card-base__subtitle">Citizen of The Empire</p>
            </div>
        </div>
    );
}

export default ProfileCardBase;