import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { NFTMetadata } from "@/models/NFTMetadata";
import { DEMO_NFTS } from "@/lib/data/nftCollection";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const rarity = searchParams.get("rarity")?.trim() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    let nfts = DEMO_NFTS;

    if (isMongoConfigured()) {
      await connectToDatabase();
      const count = await NFTMetadata.countDocuments();
      if (count > 0) {
        // Query from Mongo
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        if (search) {
          const num = parseInt(search, 10);
          if (!isNaN(num)) {
            query.tokenId = num;
          } else {
            query.name = { $regex: search, $options: "i" };
          }
        }
        if (rarity && rarity !== "All") {
          query.rarityTier = rarity;
        }

        const totalItems = await NFTMetadata.countDocuments(query);
        const docs = await NFTMetadata.find(query)
          .sort({ tokenId: 1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();

        return NextResponse.json({
          success: true,
          data: docs,
          pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
          },
        });
      }
    }

    // Filter demo data
    if (search) {
      nfts = nfts.filter(
        (nft) =>
          nft.tokenId.toString() === search ||
          nft.name.toLowerCase().includes(search) ||
          nft.attributes.some((a) => a.value.toLowerCase().includes(search))
      );
    }

    if (rarity && rarity !== "All") {
      nfts = nfts.filter((nft) => nft.rarityTier.toLowerCase() === rarity.toLowerCase());
    }

    const totalItems = nfts.length;
    const paginated = nfts.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    console.error("NFT fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch NFTs" }, { status: 500 });
  }
}
