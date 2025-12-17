import { waitlistFormBgAlt } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const WaitlistForm = () => {
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const ENDPOINT = `${BASE_URL}/waitlist/submit/`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Something went wrong");
      }

      navigate("/wishlist/congratulations");
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to join waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className=" w-[80vw] bg-bgColor max-w-[600px] mx-auto bg-no-repeat bg-center bg-cover relative"
      style={{
        borderImage: `url(${waitlistFormBgAlt})`,
        borderImageWidth: "20px",
        borderImageSlice: 20,
        borderImageRepeat: "repeat",
      }}
    >
      <div className="p-6 flex flex-col gap-4">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="ENTER X USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111] border border-borderColor text-white px-4 py-4 placeholder-bodyTextDim focus:outline-none"
          />

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A9EF2E] text-black font-semibold py-4 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "PROCESSING..." : "JOIN WAITLIST"}
          </button>

        </form>

      </div>
    </div>
  );
};
