// import 'server-only'
// import { cookies } from 'next/headers'
 
// export async function createSession(session:any) {
//   const expiresAt = session.expires_at
//   const session = await encrypt({ userId, expiresAt })
//   const cookieStore = await cookies()
 
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   })
// }