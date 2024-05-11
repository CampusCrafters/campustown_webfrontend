import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profileActions";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profile.map((profile) => (
          <div key={profile.user_id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{profile.name}</h3>
            <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
            <p className="mb-2"><strong>Roll Number:</strong> {profile.rollnumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;