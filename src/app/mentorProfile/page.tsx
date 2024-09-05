import MentorInfo from "../../app/Components/MentorInfo";
import SetAvailableTime from "../../app/Components/Calendar"


export default function AIchat() {
    return (
      <div className="tracking-wide bg-gray-100 transition-colors container-gray-100 mx-auto p-4">
       <MentorInfo /> 
       <SetAvailableTime />
      </div>
    );
  }