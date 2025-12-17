import { useState } from "react";
import { Button } from "../../../components/ButtonAlt";

const EmailInviteSection = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [message, setMessage] = useState(
    "Hey, I've secured early access to JBLB YieldSport - a new platform where DeFi meets competitive strategy. Join me using my link so we can build a club together and earn from day one. [jblb.org/waitlist?ref=JBLB-FOUNDER-28]"
  );

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !emails.includes(value)) {
        setEmails([...emails, value]);
        (e.target as HTMLInputElement).value = "";
      }
      e.preventDefault();
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const sendInvitations = () => {
    console.log("Sending invites to:", emails);
    console.log("Message:", message);
    // implement actual sending logic here
    alert("Invitations sent!");
  };

  return (
    <div className="mx-auto p-4bg-bgColor w-full space-y-4">
      {/* Emails input */}
      <div>
        <div className="flex flex-wrap items-center gap-2 border border-borderColor  px-2 py-2 min-h-[50px]">
          {emails.map((email, index) => (
            <div
              key={index}
              className="flex items-center bg-bgColor border-1 border-borderColor text-white px-3 py-1  text-sm"
            >
              {email}
              <button
                onClick={() => removeEmail(index)}
                className="ml-2 text-bodyTextDim hover:text-red-400"
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            onKeyDown={handleAddEmail}
            placeholder="Enter email and press Enter"
            className="flex-1 bg-transparent outline-none text-white py-1 px-2"
          />
        </div>
      </div>

      {/* Personal Message */}
      <div>
        <label className="block mb-2 text-sm text-white ">
          <p><span className="font-semibold !tracking-wider">Personal Message</span> (Optional)</p>
        </label>
        <div className="bg-bgColor border-1 border-borderColor p-4">
            <textarea
                className="w-full p-3 text-white outline-none h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end">
            {/* Send Button */}
            <Button
            title="SEND INVITATIONS"
            onClick={sendInvitations}
            className="bg-primary text-black w-fit py-3  transition"
            />
            </div>
        </div>
        
      </div>
          
    </div>
  );
};

export default EmailInviteSection;
