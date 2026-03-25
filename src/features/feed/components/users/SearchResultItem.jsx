import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";
import UserCardBase from "./UserCardBase.jsx";

function SearchResultItem({user, onFollow, onClick, following, onUnfollow, isLoading = false,}) {

    const handleButtonClick = (event) => {
        event.stopPropagation();
        if (following) {
            onUnfollow(user);
            return;
        }
        onFollow(user);
    };

    const buttonVariant = following ? "secondary" : "primary";
    const buttonText = following ? "Unfollow" : "Follow";

    return (
        <UserCardBase
            user={user}
            onClick={onClick}
            rightContent={
                <CustomButton
                    size="small"
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