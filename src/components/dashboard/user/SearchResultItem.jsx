import CustomButton from "../../ui/button/CustomButton.jsx";
import UserCardBase from "./ui_user/UserCardBase.jsx";

function SearchResultItem({ user, onFollow, onClick , isFollowing ,onUnfollow,isLoading = false }) {

    const handleButtonClick = (event) => {
        event.stopPropagation();
        if (isFollowing) {
            onUnfollow && onUnfollow(user);
            return;
        }
        onFollow && onFollow(user);
    };


    const buttonVariant = isFollowing ? "secondary" : "primary";
    const buttonText = isFollowing ? "Following" : "Follow";

    return (
        <UserCardBase
            user={user}
            onClick={onClick}
            rightContent={
                <CustomButton size="small"
                              fullWidth={false}
                              variant={buttonVariant}
                              onClick={handleButtonClick}
                              disabled={isLoading}
                >
                    {isLoading ? "Loading..." : buttonText}
                </CustomButton>
            }
        />
    );
}

export default SearchResultItem;