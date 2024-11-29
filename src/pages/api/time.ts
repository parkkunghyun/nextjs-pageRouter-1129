import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = new Date();
    res.json({ time: data.toLocaleString() } );
}