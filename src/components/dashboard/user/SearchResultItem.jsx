import CustomButton from "../../ui/button/CustomButton.jsx";
import UserCardBase from "./ui_user/UserCardBase.jsx";

function SearchResultItem({ user, onFollow, onClick }) {
    return (
        <UserCardBase
            user={user}
            onClick={onClick}
            rightContent={
                <CustomButton size="small" fullWidth={false}
                    onClick={(event) => {
                        event.stopPropagation();
                        onFollow && onFollow(user);}}
                >
                    Follow
                </CustomButton>
            }
        />
    );
}

export default SearchResultItem;