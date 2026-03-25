import UserCardBase from "./ui_user/UserCardBase.jsx";

function ProfileCard({ user, onClick }) {
    return (
        <div className="profile-card">
            <UserCardBase
                user={user}
                onClick={onClick}
                className="profile-card__user-card"
            />
        </div>
    );
}

export default ProfileCard;