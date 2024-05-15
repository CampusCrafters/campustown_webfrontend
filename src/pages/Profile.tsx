import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profileActions";
import { useEffect } from "react";
import default_pfp from "../assets/images/default-pfp.jpg";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-8 mb-8">
        <div className="flex items-center">
          {profile.profile_picture ? (
            <img
              src={profile.profile_picture}
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
          <h1 className="text-3xl font-semibold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <div className="mt-4">
          <p>
            <strong>Roll Number:</strong> {profile.rollnumber}
          </p>
          <p>
            <strong>Batch:</strong> {profile.batch}
          </p>
          <p>
            <strong>Branch:</strong> {profile.branch}
          </p>
          {profile.dob && (
            <p>
              <strong>Date of Birth:</strong> {profile.dob.toDateString()}
            </p>
          )}
          {profile.location && (
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
          )}
          {profile.pers_email && (
            <p>
              <strong>Personal Email:</strong> {profile.pers_email}
            </p>
          )}
          {profile.mobile && (
            <p>
              <strong>Mobile:</strong> {profile.mobile}
            </p>
          )}
          {profile.about && (
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{profile.about}</p>
            </div>
          )}
          {profile.github && (
            <p>
              <strong>GitHub:</strong> {profile.github}
            </p>
          )}
          {profile.linkedin && (
            <p>
              <strong>LinkedIn:</strong> {profile.linkedin}
            </p>
          )}
          {profile.skills && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <ul>
                {profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
          {profile.interests && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <ul>
                {profile.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          )}
          {profile.learning && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Learning</h2>
              <ul>
                {profile.learning.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
