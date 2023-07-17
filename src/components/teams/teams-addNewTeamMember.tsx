const TeamsAddNewTeamMember: React.FC = () => {
    return(
        <div className="poppins bg-white rounded border ">
            <div className="fw-bold p-4 border-bottom"> Add New Team Members </div>
            <div className="p-4">
                <div className="mb-3 fw-semibold"> Assign Role </div>
                <select value={'option1'} className="border p-3 w-75 rounded mb-4" >
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>

                <div className="mb-3 fw-semibold"> Enter Email Address </div>
                <input className="border p-3 w-75 rounded mb-4"/>

                <div>
                    <div className="btn btn-success mr-4"> Send invite </div>
                    <div className="btn btn-danger"> View Member List </div>
                </div>
                
            </div>
        </div>
    )
}
export default TeamsAddNewTeamMember