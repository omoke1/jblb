import { useState } from "react";

const tableData = [
  {
    profile: "@crypto_alpha",
    waitlistId: "#JBLB-3012",
    position: 3012,
    joined: "2 hours ago",
    status: "Active",
  },
  {
    profile: "0x8f3...c2a1",
    waitlistId: "#JBLB-2985",
    position: 2985,
    joined: "1 day ago",
    status: "Active",
  },
  {
    profile: "JaneTrading",
    waitlistId: "#JBLB-2950",
    position: 2950,
    joined: "2 days ago",
    status: "Pending",
  },
  {
    profile: "sol_sniper",
    waitlistId: "#JBLB-2921",
    position: 2921,
    joined: "3 days ago",
    status: "Active",
  },
];

const PAGE_SIZE = 10;

const WaitlistTable = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
  const paginatedData = tableData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full  mx-auto text-bodyTextDim">
      {/* Scrollable wrapper */}
      <div className="overflow-x-auto border border-borderColor bg-bgColor">
        <table className="w-full border-collapse text-center min-w-[700px]">
          <thead className="text-xs uppercase text-bodyTextDim bg-[#020409]">
            <tr>
              <th className="p-4 border-r border-borderColor sticky left-0 bg-[#020409] z-10">
                Profile
              </th>
              <th className="p-4 border-r border-borderColor">Waitlist ID</th>
              <th className="p-4 border-r border-borderColor">Position</th>
              <th className="p-4 border-r border-borderColor">Joined</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-borderColor hover:bg-[#121212] transition"
              >
                <td className="p-4 border-r border-borderColor sticky left-0 bg-bgColor z-10">
                  {row.profile}
                </td>
                <td className="p-4 cursor-pointer hover:underline border-r border-borderColor">
                  {row.waitlistId}
                </td>
                <td className="p-4 border-r border-borderColor">#{row.position}</td>
                <td className="p-4 border-r border-borderColor">{row.joined}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`size-3 ${
                        row.status === "Active" ? "bg-primary" : "bg-yellow-400"
                      }`}
                    />
                    <span className="text-white">{row.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center border-1 border-t-0 border-borderColor p-2 justify-between text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border border-borderColor disabled:opacity-40"
        >
          PREVIOUS
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`size-8 border border-borderColor ${
                page === i + 1 ? "bg-bgColor" : "hover:bg-[#1A1A1A]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border border-borderColor disabled:opacity-40"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default WaitlistTable;
