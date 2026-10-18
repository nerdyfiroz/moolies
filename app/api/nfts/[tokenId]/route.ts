import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoConfigured } from "@/lib/mongodb";
import { NFTMetadata } from "@/models/NFTMetadata";
import { DEMO_NFTS } from "@/lib/data/nftCollection";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> }
) {
  try {
    const { tokenId } = await params;
    const id = parseInt(tokenId, 10);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid token ID" }, { status: 400 });
    }

    if (isMongoConfigured()) {
      await connectToDatabase();
      const nft = await NFTMetadata.findOne({ tokenId: id }).lean();
      if (nft) {
        return NextResponse.json({ success: true, data: nft });
      }
    }

    const demo = DEMO_NFTS.find((item) => item.tokenId === id);
    if (demo) {
      return NextResponse.json({ success: true, data: demo });
    }

    return NextResponse.json({ success: false, error: "NFT not found" }, { status: 404 });
  } catch (error) {
    console.error("NFT by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch NFT" }, { status: 500 });
  }
}
