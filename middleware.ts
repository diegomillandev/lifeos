import { NextResponse, NextRequest } from 'next/server'
import { NEXT_PUBLIC_BASE_URL } from './constants/env'

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('LIFEOS_TOKEN')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const url = `${NEXT_PUBLIC_BASE_URL}/api/auth/check`;
    const response = await fetch(url, {
      headers: { token },
    })

    const data = await response.json()
    console.log(data)
    if (!data.success) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()

  } catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico|auth).*)',
  ],
}