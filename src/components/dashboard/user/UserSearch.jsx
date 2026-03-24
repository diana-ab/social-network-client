import CustomInput from "../../ui/input/CustomInput.jsx";

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