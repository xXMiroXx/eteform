import type { NextFetchEvent, NextRequest } from "next/server";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.geo.country?.startsWith("CZ"))
    return new Response("Down For maintenance");
}
