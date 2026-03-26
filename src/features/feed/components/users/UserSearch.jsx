import CustomInput from "../../../../shared/ui/input/CustomInput.jsx";
import "../../styles/UserSearch.css"

function UserSearch({value, onChange}) {

    return(<div className="user-search">
            <CustomInput
                name="userSearch"
                value={value}
                onChange={onChange}
                placeholder="Search users..."
            />
    </div>
    );
}
export default UserSearch;