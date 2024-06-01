/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  // console.log(landlord)
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  // console.log(landlord);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here"
            className="w-full border border p-3 rounded-lg mt-2"
          ></textarea>
          <Link
          to={`mailto: ${landlord.email}?subject=Regarding ${listing.name}&body=${message} `}
          className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95"
          >Send Message</Link>
        </div>
      )}
    </>
  );
};

export default Contact;
