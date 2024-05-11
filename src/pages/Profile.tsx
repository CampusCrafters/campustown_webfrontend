import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profileActions";
import { useEffect } from "react";
import default_pfp from '../assets/images/default-pfp.jpg';

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8">
      {profile.map((profileData, index: number) => (
        <div key={index} className="bg-white p-8 mb-8">
          <div className="flex items-center">
            {profileData.profile_picture ? (
              <img
                src={profileData.profile_picture}
                alt="Profile Picture"
                className="h-16 w-16 rounded-full mr-4"
              />
            ) : (
              <img
                src={default_pfp}
                alt="Profile Picture"
                className="h-16 w-16 rounded-full mr-4"
              />
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded">
              Add
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{profileData.name}</h1>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
          <div className="mt-4">
            <p><strong>Roll Number:</strong> {profileData.rollnumber}</p>
            <p><strong>Batch:</strong> {profileData.batch}</p>
            <p><strong>Branch:</strong> {profileData.branch}</p>
            {profileData.dob && <p><strong>Date of Birth:</strong> {profileData.dob.toDateString()}</p>}
            {profileData.location && <p><strong>Location:</strong> {profileData.location}</p>}
            {profileData.pers_email && <p><strong>Personal Email:</strong> {profileData.pers_email}</p>}
            {profileData.mobile && <p><strong>Mobile:</strong> {profileData.mobile}</p>}
            {profileData.about && (
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-700">{profileData.about}</p>
              </div>
            )}
            {profileData.github && <p><strong>GitHub:</strong> {profileData.github}</p>}
            {profileData.linkedin && <p><strong>LinkedIn:</strong> {profileData.linkedin}</p>}
            {profileData.skills && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <ul>
                  {profileData.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {profileData.interests && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Interests</h2>
                <ul>
                  {profileData.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            )}
            {profileData.learning && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Learning</h2>
                <ul>
                  {profileData.learning.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileComponent;
