import { auth, signOut, signIn } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session=await auth()
    return (
        <header className='px-5 py-3 bg-white-100 shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/" >
                    <Image src="/logo.svg" alt='logo' width={25} height={25}/>
                </Link>

                <div className='flex items-center gap-5'>
                    {session && session?.user?(
                        <>
                            <Link href="/startup/create">
                                <span>Create account</span>
                            </Link>

                            <form action={async()=>{
                                "use server";
                                await signOut({redirectTo:"/"})
                            }}>
                                <button type='submit'>
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ):(
                        <form action={async()=>{
                            "use server";
                            await signIn('github')
                        }}>
                            <button type='submit'>
                                <span>Login</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar