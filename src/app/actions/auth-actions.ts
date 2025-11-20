'use server';

import { cookies } from 'next/headers';

export async function adminLogin(password: string) {
    // Simple hardcoded password for now
    if (password === 'admin123') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return true;
    }
    return false;
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}
