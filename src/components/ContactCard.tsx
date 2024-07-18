import { useState } from 'react';
import DefaultPfp from '../assets/icons/Default_pfp.png';
import Heart from '../assets/icons/bottom-bar/heart-active.svg'
import HeartRed from '../assets/icons/bottom-bar/heart-red.svg'

const ContactCard = ({ user, onClick }: any) => {
  const [like, setLike] = useState(false);

  return (
    <div 
      onClick={onClick} 
      className="text-white cursor-pointer contact-card flex items-center p-3 border-b transition duration-300 ease-in-out hover:bg-gray-800"
    >
      <img 
        className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-3" 
        src={user.profile_picture ? user.profile_picture : DefaultPfp} 
        alt={`${user.name}'s profile`}
      />
      <div className='flex justify-between w-[80vw] md:w-[93vw]'>
        <div>{user.name}</div>
        <div onClick={() => setLike(true)}>{like ? <img src={HeartRed}></img> : <img src={Heart}></img>}</div>
      </div>
    </div>
  );
};

export default ContactCard;
