const ContactCard = ({ user, onClick }: any) => {
  return (
    <div onClick={onClick} className="cursor-pointer contact-card flex items-center p-3 border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <img className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-3" src={user.profile_picture}>
      </img>
      <div>
        <div className="font-bold">{user.name}</div>
        <div className="text-gray-500">Online</div>
      </div>
    </div>
  );
};

export default ContactCard;
