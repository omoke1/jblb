import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import type { Blockchain } from "../../types/defi";
import { fetchBlockchains } from "../../services/defiApi";
import { BlockchainCard } from "../../components/DeFiHub/BlockchainCard";

/**
 * HubHome component - Landing page matching the provided design
 */
export const HubHome: React.FC = () => {
  const [blockchains, setBlockchains] = useState<Blockchain[]>([]);
  const [filteredBlockchains, setFilteredBlockchains] = useState<Blockchain[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadBlockchains = async () => {
      try {
        setLoading(true);
        const data = await fetchBlockchains();
        setBlockchains(data);
        setFilteredBlockchains(data);
      } catch (error) {
        console.error("Error loading blockchains:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlockchains();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlockchains(blockchains);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = blockchains.filter(
      (blockchain) =>
        blockchain.name.toLowerCase().includes(query) ||
        blockchain.symbol.toLowerCase().includes(query)
    );
    setFilteredBlockchains(filtered);
  }, [searchQuery, blockchains]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-[1440px] flex flex-col px-4 sm:px-6 lg:px-20 py-5">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="py-4">
          <div
            className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat border border-[#222222] items-center justify-center p-8 lg:p-16 relative overflow-hidden group"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkIlcI_LP-AuRaUbWVCy1TsAffb1-VEwvhY5qJHaoXORhxFoE8d01ZpsvUJhguvLwY_srmpQXvOBb5_23PDDIUVN69BeWSnrPvp7Nf6egXP9ZqEeNCLR6bOrRJAmZ5EenNtD4pqmauFbNszJs3_65RJYH_rrjYiU8yLDVZvsmq5pkW6xJbNfyqjPXEatoriNOPGSxCyObptoJSSC2Oi4YVj1juWH0YHHmvU7vgjgvsflITd8Pv95fue6CaVCvvvpKGWKlWJrINEA")`,
            }}
          >
            {/* Corner indicators */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-[#ccff00]"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#ccff00]"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#ccff00]"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#ccff00]"></div>

            <div className="flex flex-col gap-4 text-center z-10 max-w-3xl">
              <h1
                className="text-white text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span className="text-[#ccff00]">JBLB</span> Multi-Chain <br />
                DeFi Hub
              </h1>
              <h2
                className="text-[#888888] text-lg sm:text-xl font-medium leading-relaxed tracking-wide max-w-2xl mx-auto"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                Explore DeFi protocols across leading blockchains in one place.
                Analyze TVL, track active protocols, and bridge assets seamlessly.
              </h2>
            </div>

            {/* Search Bar */}
            <label className="flex flex-col h-14 w-full max-w-[520px] sm:h-16 z-10 mt-8">
              <form onSubmit={handleSearch} className="flex w-full flex-1 items-stretch h-full transition-all border border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-sm focus-within:border-[#ccff00]">
                <div className="text-[#888888] flex items-center justify-center pl-[20px]">
                  <Icon icon="material-symbols:search" width={24} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-[#888888]/70 px-[15px] text-lg"
                  placeholder="Search chains or protocols..."
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
                <div className="flex items-center justify-center pr-1">
                  <button
                    type="submit"
                    className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden h-10 px-6 bg-[#ccff00] hover:bg-[#b3e600] text-black text-sm font-bold uppercase tracking-wider transition-colors skew-x-[-10deg] mr-2"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <span className="truncate skew-x-[10deg]">Search</span>
                  </button>
                </div>
              </form>
            </label>
          </div>
        </div>
      </section>

      {/* Blockchain Grid Section */}
      <div className="flex items-center justify-between px-2 mb-8 border-l-4 border-[#ccff00] pl-4">
        <h2
          className="text-white text-3xl font-bold leading-tight uppercase tracking-wider"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Supported Blockchains
        </h2>
        <div className="hidden sm:flex items-center gap-2 text-[#ccff00] text-sm font-bold uppercase tracking-wider cursor-pointer hover:text-white transition-colors group">
          View All Chains{" "}
          <Icon
            icon="material-symbols:arrow-forward"
            className="text-sm group-hover:translate-x-1 transition-transform"
            width={20}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] border border-[#222222] rounded-lg p-6 animate-pulse"
            >
              <div className="h-10 w-10 bg-[#222222] rounded-sm mb-4" />
              <div className="h-4 bg-[#222222] rounded w-3/4 mb-2" />
              <div className="h-4 bg-[#222222] rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredBlockchains.length === 0 ? (
        <div className="text-center py-12 mb-20">
          <p className="text-[#888888] text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            No blockchains found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {filteredBlockchains.map((blockchain) => (
            <BlockchainCard key={blockchain.id} blockchain={blockchain} />
          ))}
        </div>
      )}
    </div>
  );
};
