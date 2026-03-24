import UserCardBase from "./ui_user/UserCardBase.jsx";

function FollowingItem ({user, onClick}) {

// זה משהו שיצרתי בשביל צד ימין בשביל החלק הימני של המסך
// נשאיר אותו ככה אולי אני אוסיף משהו מיוחד בעתיד כמו עיצוב או פונקצנליות
    return(
        <UserCardBase
        user={ user}
        onClick={onClick}/>);
}
export default FollowingItem;