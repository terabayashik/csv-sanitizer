// Simple static file server using Bun.serve

import { join } from "node:path";
import { file } from "bun";

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html for root path
    if (pathname === "/") {
      pathname = "/index.html";
    }

    // Serve files from current directory
    const filePath = join(process.cwd(), pathname);
    const bunFile = file(filePath);

    // Check if file exists
    if (await bunFile.exists()) {
      return new Response(bunFile);
    }

    // 404 for non-existent files
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from: ${process.cwd()}`);
console.log(`📄 Open http://localhost:${server.port} to view CSV Sanitizer`);
