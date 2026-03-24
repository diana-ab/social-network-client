import "../style_user/UserCardBase.css";
import {DEFAULT_USERNAME_FALLBACK} from "../../../../utils/feedConstant.js";


function UserCardBase({user, rightContent, onClick, className}) {
    if (!user) {
        return null
    }
    const firstLetter = user.username ? user.username.charAt(0).toUpperCase() : DEFAULT_USERNAME_FALLBACK;

    return (
        <div
            className={`user-card-base ${className}`.trim()}
            onClick={onClick}>

            <div className="user-card-base__left">
                {user.profileImage ? (
                    <img
                        className="user-card-base__image"
                        src={user.profileImage}
                        alt={user.username}
                    />) :
                    (<div className="user-card-base__avatar-fallback">
                        {firstLetter}
                    </div>)}

                <span className="user-card-base__username">
                    {user.username}
                </span></div>
            <div className="user-card-base__right">{rightContent}</div>
        </div>
    );
}

export default UserCardBase;
