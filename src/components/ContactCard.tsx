const ContactCard = ({ number }: any) => {
  return (
    <div className="contact-card flex items-center p-3 border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-3">
        {number.charAt(0)}
      </div>
      <div>
        <div className="font-bold">{number}</div>
        <div className="text-gray-500">Online</div>
      </div>
    </div>
  );
};

export default ContactCard;
