/**
 * DeFi API Service Layer
 * Handles data fetching from DeFiLlama API and other sources
 */

import type {
  Blockchain,
  Protocol,
  ProtocolMetrics,
  RiskData,
  TVLDataPoint,
  ProtocolCategory,
  RiskLevel,
} from "../types/defi";

const DEFILLAMA_BASE_URL = "https://api.llama.fi";
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

// DeFiLlama API response types
interface DeFiLlamaChain {
  gecko_id?: string;
  tvl: number;
  tokenSymbol?: string;
  cmcId?: string;
  name: string;
  chainId?: number;
  logo?: string;
  change_1d?: number;
  change_7d?: number;
  change_30d?: number;
}

interface DeFiLlamaProtocol {
  id: string;
  name: string;
  address?: string;
  symbol?: string;
  slug?: string;
  url: string;
  description?: string;
  chain: string;
  chains: string[];
  logo?: string;
  twitter?: string;
  github?: string[];
  category?: string;
  tvl: number;
  change_1h?: number;
  change_1d?: number;
  change_7d?: number;
  mcap?: number;
  volume_1d?: number;
  volume_7d?: number;
  fees_24h?: number;
  apy?: number;
  apyBase?: number;
  apyReward?: number;
  apyMean30d?: number;
  apyBase7d?: number;
}


interface DeFiLlamaProtocolDetail {
  id: string;
  name: string;
  address?: string;
  symbol?: string;
  slug?: string;
  url: string;
  description?: string;
  chain: string;
  chains: string[];
  logo?: string;
  twitter?: string;
  github?: string[];
  category?: string;
  // TVL can be either a number (current) or array (history)
  tvl?: number | Array<{
    date: number;
    totalLiquidityUSD?: number;
    tvl?: number;
  }>;
  change_1h?: number;
  change_1d?: number;
  change_7d?: number;
  mcap?: number;
  volume_1d?: number;
  volume_7d?: number;
  fees_24h?: number;
  apy?: number;
  apyBase?: number;
  apyReward?: number;
  apyMean30d?: number;
  apyBase7d?: number;
  audit_links?: string[] | string;
  audits?: string[] | string;
  listedAt?: number;
  // Additional protocol data
  parentProtocol?: string;
  methodology?: {
    minting?: boolean;
    borrowing?: boolean;
  };
}


/**
 * Get blockchain logo URL from DeFiLlama
 * DeFiLlama provides chain icons via their icons CDN
 * Format: https://icons.llama.fi/{chainId}.jpg or .png
 */
function getBlockchainLogoUrl(chainId: string, chainLogo?: string): string {
  // If DeFiLlama API provides a logo URL in the response, use it
  if (chainLogo) {
    // Handle absolute URLs (full URLs from API)
    if (chainLogo.startsWith('http://') || chainLogo.startsWith('https://')) {
      return chainLogo;
    }
    // Handle relative URLs - prepend DeFiLlama domain
    if (chainLogo.startsWith('/')) {
      return `https://defillama.com${chainLogo}`;
    }
    // Handle relative paths without leading slash
    return `https://defillama.com/${chainLogo}`;
  }
  
  // Fallback: Use DeFiLlama's icons CDN
  // Standard format: https://icons.llama.fi/{chainId}.jpg
  // Normalize chain ID (lowercase, replace spaces with hyphens)
  const normalizedId = chainId.toLowerCase().replace(/\s+/g, '-');
  // Try .jpg first (most common), fallback handled by image error handler in component
  return `https://icons.llama.fi/${normalizedId}.jpg`;
}

/**
 * Transform DeFiLlama chain data to our Blockchain type
 */
function transformBlockchainData(data: DeFiLlamaChain[]): Blockchain[] {
  return data
    .filter((chain) => chain.tvl > 0) // Only include chains with TVL
    .map((chain) => {
      // Map chain names to our IDs
      const chainIdMap: Record<string, string> = {
        Ethereum: "ethereum",
        "BSC": "bsc",
        "BNB Chain": "bsc",
        Solana: "solana",
        Arbitrum: "arbitrum",
        Base: "base",
        Avalanche: "avalanche",
        Tron: "tron",
        Sui: "sui",
        Hedera: "hedera",
        Bitcoin: "bitcoin",
      };

      const id = chainIdMap[chain.name] || chain.name.toLowerCase().replace(/\s+/g, "-");
      
      // Get logo URL using DeFiLlama's reliable chain icon endpoint
      const logo = getBlockchainLogoUrl(id, chain.logo);

      return {
        id,
        name: chain.name,
        symbol: chain.tokenSymbol || chain.name.substring(0, 3).toUpperCase(),
        logo,
        chainId: chain.chainId,
        totalTvl: chain.tvl,
        protocolCount: 0, // Will be calculated separately
        status: "operational" as const,
        explorerUrl: getExplorerUrl(id),
        docsUrl: getDocsUrl(id),
        tvlChange7d: chain.change_7d,
        tvlChange30d: chain.change_30d,
      };
    })
    .sort((a, b) => b.totalTvl - a.totalTvl); // Sort by TVL descending
}

/**
 * Get explorer URL for a chain
 */
function getExplorerUrl(chainId: string): string | undefined {
  const explorerMap: Record<string, string> = {
    ethereum: "https://etherscan.io",
    bsc: "https://bscscan.com",
    solana: "https://solscan.io",
    arbitrum: "https://arbiscan.io",
    base: "https://basescan.org",
    avalanche: "https://snowtrace.io",
    tron: "https://tronscan.org",
    sui: "https://suiexplorer.com",
    hedera: "https://hashscan.io",
    bitcoin: "https://blockstream.info",
  };
  return explorerMap[chainId];
}

/**
 * Get docs URL for a chain
 */
function getDocsUrl(chainId: string): string | undefined {
  const docsMap: Record<string, string> = {
    ethereum: "https://ethereum.org",
    bsc: "https://docs.bnbchain.org",
    solana: "https://docs.solana.com",
    arbitrum: "https://docs.arbitrum.io",
    base: "https://docs.base.org",
    avalanche: "https://docs.avax.network",
    tron: "https://developers.tron.network",
    sui: "https://docs.sui.io",
    hedera: "https://docs.hedera.com",
    bitcoin: "https://bitcoin.org",
  };
  return docsMap[chainId];
}

/**
 * Fetch all blockchains
 */
export const fetchBlockchains = async (): Promise<Blockchain[]> => {
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/v2/chains`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chains: ${response.statusText}`);
    }
    const data: DeFiLlamaChain[] = await response.json();
    const blockchains = transformBlockchainData(data);
    
    // Count protocols per chain
    const protocols = await fetchAllProtocols();
    const protocolCounts = new Map<string, number>();
    
    protocols.forEach((protocol) => {
      protocol.chains.forEach((chain) => {
        protocolCounts.set(chain, (protocolCounts.get(chain) || 0) + 1);
      });
    });
    
    // Update protocol counts
    blockchains.forEach((blockchain) => {
      blockchain.protocolCount = protocolCounts.get(blockchain.id) || 0;
    });

    // Batch fetch prices for all blockchains using DeFiLlama (no CORS issues!)
    // Wrap in try-catch to handle errors gracefully
    try {
      const priceMap = await fetchBatchBlockchainPrices(blockchains);
      blockchains.forEach((blockchain) => {
        const priceData = priceMap.get(blockchain.id);
        if (priceData) {
          blockchain.nativeTokenPrice = priceData.price;
          blockchain.nativeTokenPriceChange24h = priceData.change24h;
        }
      });
    } catch (error) {
      // Price fetching failed - continue without prices
      console.warn("Failed to fetch blockchain prices from DeFiLlama. Blockchains will load without prices.", error);
      // Blockchains will still be returned, just without price data
    }

    // Fetch gas fees in parallel (non-blocking - failures won't break the app)
    // Gas fees also use CoinGecko, so wrap in try-catch for CORS/rate limit errors
    await Promise.all(blockchains.map(async (blockchain) => {
      try {
        const gasFee = await fetchGasFee(blockchain.id);
        blockchain.gasFee = gasFee ?? undefined;
      } catch (error) {
        // Silently fail - gas fee is optional
        blockchain.gasFee = undefined;
      }
    }));

    // Use DeFiLlama logos only (from API response)
    // Logos are already set in transformBlockchainData, but ensure they're properly formatted
    blockchains.forEach((blockchain) => {
      // Ensure logo URL is properly formatted
      blockchain.logo = getBlockchainLogoUrl(blockchain.id, blockchain.logo);
    });
    
    return blockchains;
  } catch (error) {
    console.error("Error fetching blockchains:", error);
    throw error;
  }
};

/**
 * Fetch blockchain by ID
 */
export const fetchBlockchain = async (id: string): Promise<Blockchain> => {
  try {
    const blockchains = await fetchBlockchains();
    let blockchain = blockchains.find((b) => b.id === id);
    if (!blockchain) {
      throw new Error(`Blockchain ${id} not found`);
    }
    
    // Ensure native token price is fetched (in case it wasn't in the list)
    // Non-blocking - if it fails, blockchain still works without price
    if (!blockchain.nativeTokenPrice) {
      try {
        const defillamaCoinId = getDeFiLlamaCoinId(blockchain.id, blockchain.name, blockchain.symbol);
        if (defillamaCoinId) {
          const priceData = await fetchTokenPrice(defillamaCoinId);
          if (priceData) {
            blockchain.nativeTokenPrice = priceData.price;
            blockchain.nativeTokenPriceChange24h = priceData.change24h;
          }
        }
      } catch (error) {
        // Silently fail - price is optional, blockchain still works
        // Price will remain undefined
      }
    }
    
    // Ensure logo is properly formatted (use DeFiLlama only)
    if (!blockchain.logo) {
      blockchain.logo = getBlockchainLogoUrl(blockchain.id, blockchain.logo);
    }
    
    return blockchain;
  } catch (error) {
    console.error(`Error fetching blockchain ${id}:`, error);
    throw error;
  }
};

/**
 * Map DeFiLlama category to our ProtocolCategory
 */
function mapCategory(category?: string): ProtocolCategory {
  if (!category) return "Other";
  
  const categoryMap: Record<string, ProtocolCategory> = {
    DEX: "DEX",
    "Lending": "Lending",
    "Yield": "Yield",
    "Yield Aggregator": "Yield Aggregator",
    "Perpetuals": "Perpetuals",
    "Stablecoins": "Stablecoins",
    "Bridge": "Bridge",
    "Derivatives": "Derivatives",
    "Options": "Options",
    "Insurance": "Insurance",
    "RWA": "RWA",
    "Liquid Staking": "Liquid Staking",
    "CDP": "CDP",
    "Synthetics": "Synthetics",
  };
  
  return categoryMap[category] || "Other";
}

/**
 * Determine risk level based on protocol data
 */
function determineRiskLevel(protocol: DeFiLlamaProtocol | DeFiLlamaProtocolDetail): RiskLevel {
  // Simple heuristic: based on TVL and age
  const tvl = typeof protocol.tvl === 'number' ? protocol.tvl : 0;
  if (tvl > 1000000000) return "low";
  if (tvl > 100000000) return "medium";
  if (tvl > 10000000) return "high";
  return "very-high";
}

/**
 * Transform DeFiLlama protocol data to our Protocol type
 */
function transformProtocolData(data: (DeFiLlamaProtocol | DeFiLlamaProtocolDetail)[]): Protocol[] {
  return data.map((protocol) => {
    // Handle both DeFiLlamaProtocol and DeFiLlamaProtocolDetail
    const currentTvl = typeof protocol.tvl === 'number' ? protocol.tvl : 0;
    
    return {
      id: protocol.id,
      name: protocol.name,
      slug: protocol.slug || protocol.id || protocol.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      logo: protocol.logo,
      category: mapCategory(protocol.category),
      chains: protocol.chains || [protocol.chain],
      tvl: currentTvl,
      tvlChange24h: protocol.change_1d,
      apy: protocol.apy || protocol.apyBase,
      apyRange: protocol.apyBase && protocol.apyReward
        ? {
            min: protocol.apyBase,
            max: (protocol.apyBase || 0) + (protocol.apyReward || 0),
          }
        : undefined,
      volume24h: protocol.volume_1d,
      fees24h: protocol.fees_24h,
      marketCap: protocol.mcap,
      riskLevel: determineRiskLevel(protocol as DeFiLlamaProtocol),
      description: protocol.description,
      website: protocol.url,
      twitter: protocol.twitter,
      github: protocol.github?.[0],
      symbol: protocol.symbol,
    };
  });
}

/**
 * Fetch all protocols (cached)
 */
let allProtocolsCache: Protocol[] | null = null;
let allProtocolsCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchAllProtocols(): Promise<Protocol[]> {
  // Return cached data if still valid
  if (allProtocolsCache && Date.now() - allProtocolsCacheTime < CACHE_DURATION) {
    return allProtocolsCache;
  }

  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/protocols`);
    if (!response.ok) {
      throw new Error(`Failed to fetch protocols: ${response.statusText}`);
    }
    const data: DeFiLlamaProtocol[] = await response.json();
    allProtocolsCache = transformProtocolData(data);
    allProtocolsCacheTime = Date.now();
    return allProtocolsCache;
  } catch (error) {
    console.error("Error fetching all protocols:", error);
    throw error;
  }
}

/**
 * Fetch protocols for a specific blockchain
 */
export const fetchProtocolsByChain = async (
  chainId: string
): Promise<Protocol[]> => {
  try {
    const allProtocols = await fetchAllProtocols();
    // Filter protocols by chain
    const chainProtocols = allProtocols.filter((protocol) =>
      protocol.chains.some((chain) => 
        chain.toLowerCase() === chainId.toLowerCase() ||
        chain.toLowerCase().replace(/\s+/g, "-") === chainId.toLowerCase()
      )
    );
    
    // Fetch token prices for protocols in this chain
    const priceMap = await fetchProtocolTokenPrices(chainProtocols);
    
    // Update protocols with token prices
    chainProtocols.forEach((protocol) => {
      const priceData = priceMap.get(protocol.id);
      if (priceData) {
        protocol.tokenPrice = priceData.price;
        protocol.tokenPriceChange24h = priceData.change24h;
        // Also set coingeckoId if we found it
        const coingeckoId = getCoinGeckoId(protocol.name, protocol.id, protocol.symbol);
        if (coingeckoId) {
          protocol.coingeckoId = coingeckoId;
        }
      }
    });
    
    return chainProtocols.sort((a, b) => b.tvl - a.tvl); // Sort by TVL descending
  } catch (error) {
    console.error(`Error fetching protocols for ${chainId}:`, error);
    throw error;
  }
};

/**
 * Fetch protocol by ID
 */
export const fetchProtocol = async (id: string): Promise<Protocol> => {
  try {
    console.log(`Fetching protocol with ID: ${id}`);
    
    // Normalize the ID for matching (lowercase, handle dashes/spaces)
    const normalizedId = id.toLowerCase().trim();
    
    // First try to fetch from all protocols cache
    const allProtocols = await fetchAllProtocols();
    console.log(`Total protocols in cache: ${allProtocols.length}`);
    
    // Try multiple matching strategies
    let protocol = allProtocols.find((p) => {
      const protocolId = (p.id || "").toLowerCase().trim();
      const protocolSlug = (p.slug || "").toLowerCase().trim();
      return protocolId === normalizedId || 
             protocolSlug === normalizedId ||
             protocolId === id || 
             protocolSlug === id ||
             protocolId.includes(normalizedId) ||
             protocolSlug.includes(normalizedId);
    });
    
    console.log(`Protocol found in cache:`, protocol ? protocol.name : "No");
    
    // If not found, try fetching directly from API
    if (!protocol) {
      console.log(`Protocol not in cache, trying direct API fetch...`);
      try {
        const response = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${id}`);
        if (response.ok) {
          const data: DeFiLlamaProtocolDetail = await response.json();
          console.log(`Direct API fetch successful for ${id}:`, data.name);
          const transformed = transformProtocolData([data]);
          if (transformed.length > 0) {
            protocol = transformed[0];
            // Add to cache for future use
            if (allProtocolsCache) {
              allProtocolsCache.push(protocol);
            }
          }
        } else {
          console.warn(`Direct API fetch returned ${response.status} for ${id}`);
        }
      } catch (apiError) {
        console.warn(`Direct API fetch failed for ${id}:`, apiError);
      }
    }
    
    if (!protocol) {
      // Last attempt: try to find by name (case-insensitive partial match)
      const nameMatch = allProtocols.find((p) => 
        p.name.toLowerCase().includes(normalizedId) ||
        normalizedId.includes(p.name.toLowerCase())
      );
      if (nameMatch) {
        console.log(`Found protocol by name match: ${nameMatch.name}`);
        protocol = nameMatch;
      }
    }
    
    if (!protocol) {
      console.error(`Protocol ${id} not found. Available protocols:`, 
        allProtocols.slice(0, 10).map(p => ({ id: p.id, slug: p.slug, name: p.name }))
      );
      throw new Error(`Protocol ${id} not found`);
    }
    
    console.log(`Successfully fetched protocol: ${protocol.name} (ID: ${protocol.id}, Slug: ${protocol.slug})`);
    
    // Try to fetch token price from CoinGecko if available
    const coingeckoId = getCoinGeckoId(protocol.name, protocol.id, protocol.symbol);
    if (coingeckoId) {
      protocol.coingeckoId = coingeckoId;
      const priceData = await fetchTokenPrice(coingeckoId);
      if (priceData) {
        protocol.tokenPrice = priceData.price;
        protocol.tokenPriceChange24h = priceData.change24h;
      }
    }
    
    return protocol;
  } catch (error) {
    console.error(`Error fetching protocol ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch protocol metrics
 */
export const fetchProtocolMetrics = async (
  protocolId: string
): Promise<ProtocolMetrics> => {
  try {
    // Fetch protocol details - this endpoint includes TVL history according to DeFiLlama docs
    const protocolResponse = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${protocolId}`);
    if (!protocolResponse.ok) {
      throw new Error(`Failed to fetch protocol: ${protocolResponse.statusText}`);
    }
    const protocol: DeFiLlamaProtocolDetail = await protocolResponse.json();
    console.log(`Protocol response for ${protocolId}:`, protocol);

    // Extract current TVL and TVL history from protocol response
    let currentTvl = 0;
    let tvlHistory: TVLDataPoint[] = [];
    
    // Check if protocol response has tvl as array (history) or number (current)
    if (Array.isArray(protocol.tvl)) {
      console.log(`Found TVL array in protocol response, length: ${protocol.tvl.length}`);
      tvlHistory = protocol.tvl
        .map((item) => {
          const value = item.totalLiquidityUSD || item.tvl || 0;
          if (value > 0 && item.date) {
            return {
              date: new Date(item.date * 1000).toISOString().split("T")[0],
              value: value,
            };
          }
          return null;
        })
        .filter((item): item is TVLDataPoint => item !== null)
        .sort((a, b) => a.date.localeCompare(b.date));
      
      // Get current TVL from the last data point
      if (tvlHistory.length > 0) {
        currentTvl = tvlHistory[tvlHistory.length - 1].value;
      }
      console.log(`Extracted ${tvlHistory.length} TVL data points from protocol response`);
    } else if (typeof protocol.tvl === 'number') {
      currentTvl = protocol.tvl;
      console.log(`Found current TVL: ${currentTvl}`);
    }

    // If no TVL history in protocol response, try the dedicated TVL endpoint
    if (tvlHistory.length === 0) {
      try {
        // According to DeFiLlama docs: /tvl/{protocol} returns historical TVL
        const tvlResponse = await fetch(`${DEFILLAMA_BASE_URL}/tvl/${protocolId}`);
        
        if (tvlResponse.ok) {
          const tvlData = await tvlResponse.json();
          console.log(`TVL endpoint response for ${protocolId}:`, tvlData);
          
          // Handle different response formats
          if (Array.isArray(tvlData)) {
            // Array format: [{ date: timestamp, totalLiquidityUSD: value }]
            tvlHistory = tvlData
              .map((item: any) => {
                const value = item.totalLiquidityUSD || item.tvl || item.value || 0;
                if (value > 0 && item.date) {
                  const date = typeof item.date === 'number' 
                    ? new Date(item.date * 1000).toISOString().split("T")[0]
                    : item.date.split('T')[0];
                  return {
                    date,
                    value,
                  };
                }
                return null;
              })
              .filter((item): item is TVLDataPoint => item !== null)
              .sort((a, b) => a.date.localeCompare(b.date));
          } else if (typeof tvlData === 'object' && tvlData !== null) {
            // Object format: { timestamp: value }
            tvlHistory = Object.entries(tvlData)
              .map(([timestamp, value]) => {
                const numTimestamp = Number(timestamp);
                const numValue = typeof value === 'number' ? value : 0;
                if (!isNaN(numTimestamp) && numValue > 0) {
                  return {
                    date: new Date(numTimestamp * 1000).toISOString().split("T")[0],
                    value: numValue,
                  };
                }
                return null;
              })
              .filter((item): item is TVLDataPoint => item !== null)
              .sort((a, b) => a.date.localeCompare(b.date));
          }
          console.log(`Extracted ${tvlHistory.length} TVL data points from TVL endpoint`);
        } else {
          console.warn(`TVL endpoint returned ${tvlResponse.status} for ${protocolId}`);
        }
      } catch (tvlError) {
        console.warn(`Error fetching TVL history for ${protocolId}:`, tvlError);
      }
    }

    console.log(`Final TVL history length for ${protocolId}:`, tvlHistory.length);

    // If still no history, generate a basic one from current TVL and change data
    if (tvlHistory.length === 0 && currentTvl > 0) {
      console.warn(`No TVL history found for ${protocolId}, generating from current TVL`);
      const now = Date.now();
      const days = 30;
      const baseTvl = currentTvl;
      const change7d = protocol.change_7d || 0;
      const dailyChange = change7d / 7; // Approximate daily change
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(now - i * 24 * 60 * 60 * 1000);
        // Calculate TVL based on days ago and change rate
        const daysAgo = i;
        const estimatedTvl = baseTvl * (1 - (dailyChange / 100) * daysAgo);
        tvlHistory.push({
          date: date.toISOString().split("T")[0],
          value: Math.max(0, estimatedTvl), // Ensure non-negative
        });
      }
    }

    // Try to fetch volume history from CoinGecko if available
    let volumeHistory: Array<{ date: string; value: number }> = [];
    const coingeckoId = getCoinGeckoId(protocol.name, protocolId, protocol.symbol);
    if (coingeckoId) {
      volumeHistory = await fetchVolumeHistory(coingeckoId, 30);
      console.log(`Fetched ${volumeHistory.length} volume data points from CoinGecko for ${coingeckoId}`);
    }
    
    return {
      tvl: currentTvl || 0,
      tvlHistory,
      volume24h: protocol.volume_1d || 0,
      volumeHistory, // Now includes CoinGecko data if available
      fees24h: protocol.fees_24h || 0,
      feesHistory: [], // DeFiLlama doesn't provide fees history in this endpoint
      apy: protocol.apy || protocol.apyBase,
    };
  } catch (error) {
    console.error(`Error fetching metrics for ${protocolId}:`, error);
    throw error;
  }
};

/**
 * Fetch risk data for a protocol
 */
/**
 * Extract audit information from audit links
 */
function parseAuditReports(auditLinks?: string[] | string, audits?: string[] | string): Array<{ auditor: string; date: string; url?: string }> {
  const reports: Array<{ auditor: string; date: string; url?: string }> = [];
  
  // Handle auditLinks - can be array or string
  if (auditLinks) {
    const linksArray = Array.isArray(auditLinks) ? auditLinks : [auditLinks];
    linksArray.forEach((link) => {
      if (typeof link === 'string' && link.trim()) {
        try {
          const url = new URL(link);
          // Try to extract auditor name from URL
          const hostname = url.hostname.replace('www.', '');
          const auditor = hostname.split('.')[0];
          reports.push({
            auditor: auditor.charAt(0).toUpperCase() + auditor.slice(1),
            date: new Date().toISOString().split('T')[0], // Use current date if not available
            url: link,
          });
        } catch {
          // Invalid URL, skip
        }
      }
    });
  }
  
  // Handle audits - can be array or string
  if (audits) {
    const auditsArray = Array.isArray(audits) ? audits : [audits];
    auditsArray.forEach((audit) => {
      if (typeof audit === 'string' && audit.trim()) {
        // Try to parse audit string (format may vary)
        if (audit.includes('http')) {
          try {
            const url = new URL(audit);
            const hostname = url.hostname.replace('www.', '');
            const auditor = hostname.split('.')[0];
            reports.push({
              auditor: auditor.charAt(0).toUpperCase() + auditor.slice(1),
              date: new Date().toISOString().split('T')[0],
              url: audit,
            });
          } catch {
            // Invalid URL, skip
          }
        }
      }
    });
  }
  
  return reports;
}

/**
 * Determine audit status based on available audit data
 */
function determineAuditStatus(auditLinks?: string[] | string, audits?: string[] | string): "audited" | "unaudited" | "partial" {
  // Normalize to arrays for counting
  const auditLinksArray = auditLinks 
    ? (Array.isArray(auditLinks) ? auditLinks : [auditLinks]).filter(link => typeof link === 'string' && link.trim())
    : [];
  const auditsArray = audits
    ? (Array.isArray(audits) ? audits : [audits]).filter(audit => typeof audit === 'string' && audit.trim())
    : [];
  
  const hasAuditLinks = auditLinksArray.length > 0;
  const hasAudits = auditsArray.length > 0;
  
  if (hasAuditLinks || hasAudits) {
    const totalAudits = auditLinksArray.length + auditsArray.length;
    // Consider it fully audited if there are 2+ audit sources
    return totalAudits >= 2 ? "audited" : "partial";
  }
  
  return "unaudited";
}

/**
 * Calculate security score based on multiple factors
 */
function calculateSecurityScore(
  protocol: Protocol,
  auditLinks?: string[] | string,
  audits?: string[] | string,
  listedAt?: number
): number {
  let score = 50; // Base score
  
  // TVL factor (higher TVL = more trust, but not linearly)
  if (protocol.tvl > 1000000000) score += 20;
  else if (protocol.tvl > 100000000) score += 15;
  else if (protocol.tvl > 10000000) score += 10;
  else if (protocol.tvl > 1000000) score += 5;
  
  // Audit factor
  const auditStatus = determineAuditStatus(auditLinks, audits);
  if (auditStatus === "audited") score += 15;
  else if (auditStatus === "partial") score += 8;
  
  // Age factor (older protocols = more mature)
  if (listedAt) {
    const ageInDays = (Date.now() - listedAt * 1000) / (1000 * 60 * 60 * 24);
    if (ageInDays > 365) score += 10; // Over 1 year
    else if (ageInDays > 180) score += 5; // Over 6 months
  }
  
  // GitHub presence (open source = more transparent)
  if (protocol.github) score += 5;
  
  // Cap at 100
  return Math.min(100, score);
}

export const fetchRiskData = async (protocolId: string): Promise<RiskData> => {
  try {
    // Fetch protocol details to get audit information
    const protocolResponse = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${protocolId}`);
    if (!protocolResponse.ok) {
      throw new Error(`Failed to fetch protocol: ${protocolResponse.statusText}`);
    }
    const protocolDetail: DeFiLlamaProtocolDetail = await protocolResponse.json();
    
    // Get protocol data for additional metrics
    const protocol = await fetchProtocol(protocolId);
    
    // Extract audit information
    const auditReports = parseAuditReports(protocolDetail.audit_links, protocolDetail.audits);
    const auditStatus = determineAuditStatus(protocolDetail.audit_links, protocolDetail.audits);
    
    // Calculate security score
    const securityScore = calculateSecurityScore(
      protocol,
      protocolDetail.audit_links,
      protocolDetail.audits,
      protocolDetail.listedAt
    );
    
    // Determine protocol maturity
    let protocolMaturity: "new" | "established" | "mature" = "new";
    if (protocolDetail.listedAt) {
      const ageInDays = (Date.now() - protocolDetail.listedAt * 1000) / (1000 * 60 * 60 * 24);
      if (ageInDays > 730) protocolMaturity = "mature"; // Over 2 years
      else if (ageInDays > 365) protocolMaturity = "established"; // Over 1 year
    } else if (protocol.tvl > 100000000) {
      protocolMaturity = "established";
    }
    
    return {
      securityScore,
      auditStatus,
      smartContractRisk: protocol.riskLevel,
      impermanentLossRisk: protocol.category === "DEX" ? "medium" as const : undefined,
      protocolMaturity,
      auditReports,
    };
  } catch (error) {
    console.error(`Error fetching risk data for ${protocolId}:`, error);
    throw error;
  }
};

/**
 * Map protocol names/IDs to CoinGecko coin IDs
 * This is a common mapping for major protocols
 */
function getCoinGeckoId(protocolName: string, protocolId: string, symbol?: string): string | null {
  const name = protocolName.toLowerCase();
  const id = protocolId.toLowerCase();
  const sym = symbol?.toLowerCase();
  
  // Common protocol mappings
  const protocolMap: Record<string, string> = {
    // Major protocols
    "aave": "aave",
    "aave-v3": "aave",
    "uniswap": "uniswap",
    "uniswap-v3": "uniswap",
    "uniswap-v2": "uniswap",
    "compound": "compound-governance-token",
    "makerdao": "maker",
    "curve": "curve-dao-token",
    "yearn": "yearn-finance",
    "sushiswap": "sushi",
    "pancakeswap": "pancakeswap-token",
    "balancer": "balancer",
    "1inch": "1inch",
    "dydx": "dydx",
    "synthetix": "havven",
    "chainlink": "chainlink",
    "the-graph": "the-graph",
    "lido": "lido-dao",
    "rocket-pool": "rocket-pool-eth",
    "frax": "frax",
    "convex": "convex-finance",
    "gmx": "gmx",
    "arbitrum": "arbitrum",
    "optimism": "optimism",
    "polygon": "matic-network",
    "avalanche": "avalanche-2",
    "solana": "solana",
    "ethereum": "ethereum",
    "bitcoin": "bitcoin",
  };
  
  // Try exact matches first
  if (protocolMap[id]) return protocolMap[id];
  if (protocolMap[name]) return protocolMap[name];
  if (sym && protocolMap[sym]) return protocolMap[sym];
  
  // Try partial matches
  for (const [key, value] of Object.entries(protocolMap)) {
    if (name.includes(key) || id.includes(key)) {
      return value;
    }
  }
  
  return null;
}

/**
 * Get CoinGecko ID for a blockchain
 */

/**
 * Map blockchain IDs to DeFiLlama coin IDs for price fetching
 */
function getDeFiLlamaCoinId(blockchainId: string, blockchainName: string, symbol?: string): string | null {
  const id = blockchainId.toLowerCase();
  const name = blockchainName.toLowerCase();
  const sym = symbol?.toLowerCase();
  
  // DeFiLlama coin ID mappings (these are the IDs used in /chart/{coins} endpoint)
  const defillamaCoinMap: Record<string, string> = {
    "ethereum": "ethereum",
    "eth": "ethereum",
    "bitcoin": "bitcoin",
    "btc": "bitcoin",
    "bsc": "binancecoin",
    "binance-smart-chain": "binancecoin",
    "bnb": "binancecoin",
    "solana": "solana",
    "sol": "solana",
    "arbitrum": "arbitrum",
    "arb": "arbitrum",
    "optimism": "optimism",
    "op": "optimism",
    "polygon": "matic-network",
    "matic": "matic-network",
    "avalanche": "avalanche-2",
    "avax": "avalanche-2",
    "base": "base",
    "tron": "tron",
    "trx": "tron",
    "sui": "sui",
    "hedera": "hedera-hashgraph",
    "hbar": "hedera-hashgraph",
    "cardano": "cardano",
    "ada": "cardano",
    "polkadot": "polkadot",
    "dot": "polkadot",
    "cosmos": "cosmos",
    "atom": "cosmos",
    "chainlink": "chainlink",
    "link": "chainlink",
  };
  
  // Try exact matches first
  if (defillamaCoinMap[id]) return defillamaCoinMap[id];
  if (defillamaCoinMap[name]) return defillamaCoinMap[name];
  if (sym && defillamaCoinMap[sym]) return defillamaCoinMap[sym];
  
  // Try partial matches
  for (const [key, value] of Object.entries(defillamaCoinMap)) {
    if (name.includes(key) || id.includes(key)) {
      return value;
    }
  }
  
  return null;
}

/**
 * Fetch price data from DeFiLlama chart endpoint
 * Returns current price and 24h change
 * Endpoint: /coins/chart/{coinId}
 */
async function fetchDeFiLlamaPrice(
  defillamaCoinId: string
): Promise<{ price: number; change24h: number } | null> {
  try {
    // Try the coins/chart endpoint (based on API docs)
    const response = await fetch(`${DEFILLAMA_BASE_URL}/coins/chart/${defillamaCoinId}`);
    
    if (!response.ok) {
      // If that fails, try the chart endpoint as fallback
      const fallbackResponse = await fetch(`${DEFILLAMA_BASE_URL}/chart/${defillamaCoinId}`);
      if (!fallbackResponse.ok) {
        console.warn(`DeFiLlama price fetch failed for ${defillamaCoinId}: ${response.status}`);
        return null;
      }
      const fallbackData = await fallbackResponse.json();
      return parseChartData(fallbackData, defillamaCoinId);
    }
    
    const data = await response.json();
    return parseChartData(data, defillamaCoinId);
  } catch (error) {
    console.warn(`Error fetching DeFiLlama price for ${defillamaCoinId}:`, error);
    return null;
  }
}

/**
 * Parse chart data from DeFiLlama API response
 * Handles different response formats
 */
function parseChartData(
  data: any,
  coinId: string
): { price: number; change24h: number } | null {
  try {
    // Handle different response formats
    let chartData: any[] = [];
    
    // Format 1: Direct array
    if (Array.isArray(data)) {
      chartData = data;
    }
    // Format 2: Object with coins property
    else if (data.coins && typeof data.coins === 'object') {
      const coinData = data.coins[coinId];
      if (coinData && Array.isArray(coinData)) {
        chartData = coinData;
      }
    }
    // Format 3: Object with data property
    else if (data.data && Array.isArray(data.data)) {
      chartData = data.data;
    }
    // Format 4: Object with prices array
    else if (data.prices && Array.isArray(data.prices)) {
      chartData = data.prices;
    }
    
    if (!chartData || chartData.length === 0) {
      return null;
    }
    
    // Get the latest price (most recent entry)
    const latest: any = chartData[chartData.length - 1];
    
    // Support different data formats: {date, priceUsd}, {date, price}, or [timestamp, price]
    let currentPrice: number | null = null;
    if (typeof latest === 'object' && latest !== null) {
      currentPrice = latest.priceUsd || latest.price || (Array.isArray(latest) ? latest[1] : null);
    } else if (Array.isArray(latest)) {
      currentPrice = latest[1];
    }
    
    if (!currentPrice || currentPrice === 0) {
      return null;
    }
    
    // Calculate 24h change
    // Find price 24 hours ago (approximately)
    const now = Date.now() / 1000; // Current timestamp in seconds
    const twentyFourHoursAgo = now - (24 * 60 * 60); // 24 hours ago
    
    // Find the closest data point to 24 hours ago
    let price24hAgo = currentPrice;
    for (let i = chartData.length - 1; i >= 0; i--) {
      const point: any = chartData[i];
      let timestamp: number | null = null;
      
      // Support different timestamp formats
      if (typeof point === 'object' && point !== null) {
        timestamp = point.date || (Array.isArray(point) ? point[0] : null);
      } else if (Array.isArray(point)) {
        timestamp = point[0];
      }
      
      if (timestamp && timestamp <= twentyFourHoursAgo) {
        // Get price from this point
        if (typeof point === 'object' && point !== null) {
          price24hAgo = point.priceUsd || point.price || (Array.isArray(point) ? point[1] : currentPrice);
        } else if (Array.isArray(point)) {
          price24hAgo = point[1];
        }
        break;
      }
    }
    
    // Calculate 24h change percentage
    const change24h = price24hAgo > 0 
      ? ((currentPrice - price24hAgo) / price24hAgo) * 100 
      : 0;
    
    return {
      price: currentPrice,
      change24h: change24h,
    };
  } catch (error) {
    console.warn(`Error parsing chart data for ${coinId}:`, error);
    return null;
  }
}

/**
 * Batch fetch prices for multiple blockchains using DeFiLlama (replaces CoinGecko)
 * DeFiLlama doesn't have CORS issues and is more reliable
 */
async function fetchBatchBlockchainPrices(
  blockchains: Blockchain[]
): Promise<Map<string, { price: number; change24h: number }>> {
  const priceMap = new Map<string, { price: number; change24h: number }>();
  
  // Get unique DeFiLlama coin IDs
  const defillamaCoinIds: string[] = [];
  const blockchainIdMap = new Map<string, string>(); // defillamaCoinId -> blockchainId
  
  blockchains.forEach((blockchain) => {
    const defillamaCoinId = getDeFiLlamaCoinId(blockchain.id, blockchain.name, blockchain.symbol);
    if (defillamaCoinId && !defillamaCoinIds.includes(defillamaCoinId)) {
      defillamaCoinIds.push(defillamaCoinId);
      blockchainIdMap.set(defillamaCoinId, blockchain.id);
    }
  });

  if (defillamaCoinIds.length === 0) {
    return priceMap;
  }

  try {
    // DeFiLlama chart endpoint can handle multiple coins: /chart/{coin1},{coin2},...
    // Fetch prices in parallel with a small delay to avoid overwhelming the API
    await Promise.all(defillamaCoinIds.map(async (defillamaCoinId, index) => {
      // Add small delay between requests (100ms)
      if (index > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      try {
        const priceData = await fetchDeFiLlamaPrice(defillamaCoinId);
        if (priceData) {
          const blockchainId = blockchainIdMap.get(defillamaCoinId);
          if (blockchainId) {
            priceMap.set(blockchainId, priceData);
          }
        }
      } catch (error) {
        // Silently fail for individual coins - continue with others
        console.warn(`Error fetching price for ${defillamaCoinId}:`, error);
      }
    }));
  } catch (error) {
    // Overall error - return what we have so far
    console.warn(`Error batch fetching blockchain prices from DeFiLlama:`, error);
  }

  return priceMap;
}


/**
 * Fetch token price from DeFiLlama (single token)
 * Uses DeFiLlama's chart endpoint - no CORS issues!
 * Note: For multiple tokens, use fetchBatchBlockchainPrices instead
 */
async function fetchTokenPrice(defillamaCoinId: string): Promise<{ price: number; change24h: number } | null> {
  return fetchDeFiLlamaPrice(defillamaCoinId);
}

/**
 * Fetch blockchain token price from DeFiLlama
 */
export async function fetchBlockchainTokenPrice(
  blockchainId: string,
  blockchainName: string,
  symbol?: string
): Promise<{ price: number; change24h: number } | null> {
  const defillamaCoinId = getDeFiLlamaCoinId(blockchainId, blockchainName, symbol);
  if (!defillamaCoinId) {
    return null;
  }
  return fetchTokenPrice(defillamaCoinId);
}

/**
 * Fetch volume history from CoinGecko
 */
async function fetchVolumeHistory(
  coingeckoId: string,
  days: number = 30
): Promise<Array<{ date: string; value: number }>> {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/${coingeckoId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (data.total_volumes && Array.isArray(data.total_volumes)) {
      return data.total_volumes
        .map(([timestamp, volume]: [number, number]) => ({
          date: new Date(timestamp).toISOString().split("T")[0],
          value: volume,
        }))
        .filter((point: { date: string; value: number }) => point.value > 0)
        .sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date));
    }
    return [];
  } catch (error) {
    console.warn(`Error fetching volume history for ${coingeckoId}:`, error);
    return [];
  }
}


/**
 * Fetch average gas fee for a blockchain
 * Uses CoinGecko for native token price and estimates based on typical gas usage
 */
async function fetchGasFee(chainId: string): Promise<number | null> {
  try {
    // Get blockchain name and symbol for DeFiLlama coin ID lookup
    // We need to get this from the blockchain data, but for now use chainId
    const defillamaCoinId = getDeFiLlamaCoinId(chainId, chainId, undefined);
    if (!defillamaCoinId) {
      return null;
    }

    // Get native token price from DeFiLlama
    const priceData = await fetchTokenPrice(defillamaCoinId);
    if (!priceData) {
      return null;
    }

    // Typical gas usage and gas prices for different chains
    const gasConfig: Record<string, { gasLimit: number; gasPriceGwei: number }> = {
      ethereum: { gasLimit: 21000, gasPriceGwei: 20 }, // Standard transfer
      bsc: { gasLimit: 21000, gasPriceGwei: 3 },
      arbitrum: { gasLimit: 21000, gasPriceGwei: 0.1 },
      base: { gasLimit: 21000, gasPriceGwei: 0.1 },
      polygon: { gasLimit: 21000, gasPriceGwei: 30 },
      avalanche: { gasLimit: 21000, gasPriceGwei: 25 },
      optimism: { gasLimit: 21000, gasPriceGwei: 0.001 },
      solana: { gasLimit: 5000, gasPriceGwei: 0.00025 }, // Solana uses lamports
      tron: { gasLimit: 21000, gasPriceGwei: 0 },
      sui: { gasLimit: 1000, gasPriceGwei: 0.001 },
    };

    const config = gasConfig[chainId.toLowerCase()] || { gasLimit: 21000, gasPriceGwei: 1 };
    
    // Calculate gas fee in USD: (gasLimit * gasPriceGwei * 1e-9) * tokenPrice
    const gasFeeInNative = (config.gasLimit * config.gasPriceGwei) / 1e9;
    const gasFeeInUSD = gasFeeInNative * priceData.price;

    return gasFeeInUSD;
  } catch (error) {
    console.warn(`Error fetching gas fee for ${chainId}:`, error);
    return null;
  }
}

/**
 * Fetch token prices for multiple protocols in batch from CoinGecko
 */
async function fetchProtocolTokenPrices(protocols: Protocol[]): Promise<Map<string, { price: number; change24h: number }>> {
  const priceMap = new Map<string, { price: number; change24h: number }>();
  
  // Get unique CoinGecko IDs
  const coingeckoIds: string[] = [];
  const protocolIdMap = new Map<string, string>(); // coingeckoId -> protocolId
  
  protocols.forEach((protocol) => {
    const coingeckoId = getCoinGeckoId(protocol.name, protocol.id, protocol.symbol);
    if (coingeckoId && !coingeckoIds.includes(coingeckoId)) {
      coingeckoIds.push(coingeckoId);
      protocolIdMap.set(coingeckoId, protocol.id);
    }
  });

  if (coingeckoIds.length === 0) {
    return priceMap;
  }

  try {
    // Fetch prices in batch (CoinGecko allows up to 50 IDs per request)
    const batchSize = 50;
    for (let i = 0; i < coingeckoIds.length; i += batchSize) {
      const batch = coingeckoIds.slice(i, i + batchSize);
      const idsParam = batch.join(',');
      
      const response = await fetch(
        `${COINGECKO_BASE_URL}/simple/price?ids=${idsParam}&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (response.ok) {
        const data = await response.json();
        batch.forEach((coingeckoId) => {
          const coinData = data[coingeckoId];
          if (coinData && coinData.usd) {
            const protocolId = protocolIdMap.get(coingeckoId);
            if (protocolId) {
              priceMap.set(protocolId, {
                price: coinData.usd,
                change24h: coinData.usd_24h_change || 0,
              });
            }
          }
        });
      }
      
      // Rate limiting: wait 1 second between batches
      if (i + batchSize < coingeckoIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.warn(`Error fetching protocol token prices:`, error);
  }

  return priceMap;
}


