import { useState } from "react";
import { rank1, rank2, rank3 } from "../../../assets/images";

const tableData = [
  { rank: 1, member: "dh4n", referrals: 150, position: 2921 },
  { rank: 2, member: "monkeyDLuffy", referrals: 120, position: 2912 },
  { rank: 3, member: "narutoUzumaki", referrals: 92, position: 2421 },
  { rank: 4, member: "sasukeUchiha", referrals: 87, position: 2921 },
  { rank: 5, member: "shikamaruNara", referrals: 85, position: 2921 },
  { rank: 6, member: "nejiHyuga", referrals: 70, position: 2921 },
];

const PAGE_SIZE = 5;

const Leaderboard = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
  const paginatedData = tableData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full mx-auto text-bodyTextDim">
      {/* Scrollable wrapper */}
      <div className="overflow-x-auto border border-borderColor bg-bgColor">
        <table className="w-full border-collapse text-center min-w-[600px]">
          <thead className="text-xs uppercase text-bodyTextDim bg-[#020409]">
            <tr>
              <th className="p-4 border-r border-borderColor">RANK</th>
              <th className="p-4 border-r border-borderColor sticky left-0 bg-[#020409] z-10">
                MEMBER
              </th>
              <th className="p-4 border-r border-borderColor">REFERRALS</th>
              <th className="p-4 border-r border-borderColor">POSITION</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-borderColor hover:bg-[#121212] transition"
              >
                <td className="p-4 border-r flex justify-center items-center border-borderColor">
                  {row.rank === 1 ? (
                    <img src={rank1} alt="rank1" className="w-8" />
                  ) : row.rank === 2 ? (
                    <img src={rank2} alt="rank2" className="w-8" />
                  ) : row.rank === 3 ? (
                    <img src={rank3} alt="rank3" className="w-8" />
                  ) : (
                    row.rank
                  )}
                </td>

                <td className="p-4 cursor-pointer hover:underline border-r border-borderColor sticky left-0 bg-bgColor z-10">
                  {row.member}
                </td>

                <td className="p-4 border-r border-borderColor">{row.referrals}</td>

                <td className="p-4 ">#{row.position}</td>
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

export default Leaderboard;
