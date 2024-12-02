import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: Request) {
    const url = new URL(req.url); // Create a URL object to access 'origin' and query parameters
    const userData = Object.fromEntries(url.searchParams.entries());
    const hash = userData.hash;

    // Remove the hash from userData as it's not part of the auth check
    delete userData.hash;

    const botToken = "7988459166:AAG5orryx8V6k5-Npkdl3F65NEs65LxhDQA"; // Replace with your bot token
    const secret = crypto.createHash("sha256").update(botToken).digest();

    const checkString = Object.keys(userData)
        .sort()
        .map((key) => `${key}=${userData[key]}`)
        .join("\n");

    const hmac = crypto.createHmac("sha256", secret).update(checkString).digest("hex");

    if (hmac === hash) {
        console.log("Authenticated user:", userData);

        // Redirect back to LoginPage with user details as query parameters
        const redirectUrl = new URL("", 'https://660c-2409-4081-e3e-9d30-4811-3d4d-a035-e08f.ngrok-free.app'); // Use url.origin here
        Object.entries(userData).forEach(([key, value]) =>
            redirectUrl.searchParams.append(key, value)
        );

        return NextResponse.redirect(redirectUrl);
    } else {
        console.error("Authentication failed");
        return NextResponse.json({ message: "Authentication failed" }, { status: 403 });
    }
}

export async function POST() {
    return new Response("Method Not Allowed", { status: 405 });
}
