import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname.startsWith('/admin')) {
        const authHeader = req.headers.get('authorization');

        // MVP Basic Auth protection
        // admin / admin123
        if (authHeader !== 'Basic YWRtaW46YWRtaW4xMjM=') {
            return new NextResponse('Authentication required', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Secure Area"',
                },
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
