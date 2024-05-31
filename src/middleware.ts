import { type NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

import { type TCriticalAny } from '@core/types/critical-any'

export const middleware = (request: NextRequest) => {
    const { cookies, url } = request

    const baseUrl = new URL('/', request.url).href
    if (url === baseUrl) {
        return NextResponse.redirect(new URL('/auth', url))
    }
    const token = cookies.get('Secure-KY')

    const userData: TCriticalAny = token ? jwtDecode(token?.value ?? '') : undefined

    // redirect user from auth page to valid page if available token
    if (userData?.national_code && url.startsWith(`${baseUrl}auth`)) {
        return NextResponse.redirect(new URL(`/${userData.userType}`, url))
    }

    // redirect user from auth page if national_code not access
    if (
        (!userData || !userData?.national_code) &&
        (url.startsWith(`${baseUrl}admin`) || url.startsWith(`${baseUrl}teacher`))
    ) {
        return NextResponse.redirect(new URL(`/auth`, url))
    }

    // redirect admin from 'admin' page to 'admin/teacher' page as default admin page
    if (userData?.national_code && url === `${baseUrl}admin` && userData.userType.includes('admin')) {
        return NextResponse.redirect(new URL(`/${userData.userType}`, url))
    }

    // redirect teacher to /not-access page as name as 'not access'
    if (userData?.national_code && url.includes('admin') && userData.userType === 'user') {
        return NextResponse.redirect(new URL(`/not-access`, url))
    }

    // redirect admin from 'teacher' page to 'admin/teacher' page as name as 'not access'
    if (userData?.national_code && url === `${baseUrl}teacher` && userData.userType.includes('admin')) {
        return NextResponse.redirect(new URL(`/not-access`, url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!_next/static|_next/image|images|icons|fonts|favicon.ico).*)'],
}
