import { useState } from "react";
import { Button } from "../../../components/ButtonAlt";

const EmailInviteSection = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(
    "Hey, I've secured early access to JBLB YieldSport - a new platform where DeFi meets competitive strategy. Join me using my link so we can build a club together and earn from day one. [jblb.org/waitlist?ref=JBLB-FOUNDER-28]"
  );

  const addEmail = (value: string) => {
    const email = value.trim();
    if (!email || emails.includes(email)) return;
    setEmails([...emails, email]);
    setInputValue("");
  };

  // Desktop (Enter / comma)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(inputValue);
    }
  };

  // Mobile (when input loses focus)
  const handleBlur = () => {
    addEmail(inputValue);
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const sendInvitations = () => {
    console.log("Sending invites to:", emails);
    console.log("Message:", message);
    alert("Invitations sent!");
  };

  return (
    <div className="mx-auto w-full space-y-4">
      {/* Email input */}
      <div className="border border-borderColor px-2 py-2 min-h-[50px]">
        <div className="flex flex-wrap gap-2 items-center">
          {emails.map((email, index) => (
            <div
              key={index}
              className="flex items-center bg-bgColor border border-borderColor text-white px-3 py-1 text-sm"
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
            type="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Enter email"
            className="flex-1 min-w-[200px] bg-transparent outline-none text-white py-1 px-2"
          />

          {/* Mobile-friendly add button */}
          <Button
            title="Add"
            onClick={() => addEmail(inputValue)}
            className="text-sm px-3 py-1 bg-primary text-black"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block mb-2 text-sm text-white">
          <span className="font-semibold tracking-wider">
            Personal Message
          </span>{" "}
          (Optional)
        </label>

        <div className="bg-bgColor border border-borderColor p-4">
          <textarea
            className="w-full p-3 text-white outline-none h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end mt-2">
            <Button
              title="SEND INVITATIONS"
              onClick={sendInvitations}
              className="bg-primary text-black w-fit py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailInviteSection;
