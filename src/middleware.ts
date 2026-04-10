import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export const middleware = async (request: NextRequest) => {
    const response = await updateSession(request)
    const pathname = request.nextUrl.pathname

    if (pathname.startsWith('/admin')) {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => request.cookies.getAll(),
                    setAll: () => {},
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}