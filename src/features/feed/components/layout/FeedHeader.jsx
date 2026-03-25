import useLogout from "../../hooks/useLogout.js";
import CustomButton from "../../../../shared/ui/button/CustomButton.jsx";
import "../../styles/FeedHeader.css";

function FeedHeader() {
    const { handleLogout } = useLogout();

    return (
        <header className="feed-header">
            <div className="feed-header__left">
                <h1 className="feed-header__logo">Feed</h1>
            </div>

            <div className="feed-header__right">
                <CustomButton
                    text="Logout"
                    onClick={handleLogout}
                    variant="secondary"
                    size="small"
                    fullWidth={false}
                />
            </div>
        </header>
    );
}

export default FeedHeader;