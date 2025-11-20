export const WaitlistForm = () => {
  return (
    <div className="neon-box bg-black p-6 w-[80vw] max-w-[600px] mx-auto">
      <form className="flex flex-col gap-4">

        {/* Username */}
        <input
          type="text"
          placeholder="ENTER X USERNAME"
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 placeholder-white/40 focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL"
          className="w-full bg-[#111] border border-white/10 text-white px-4 py-4 placeholder-white/40 focus:outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#A9EF2E] text-black font-semibold py-4 hover:opacity-90 transition"
        >
          JOIN WAITLIST
        </button>

      </form>
    </div>
  );
};
