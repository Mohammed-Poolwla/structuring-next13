/* import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Protected (req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions)

  return (
    <div className='grid grid-cols-2 text-white p-4'>
      <div>
        {
          session !== null
            ? <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
                Hi {session?.user.name}!
              </h1>
            : <a className='btn btn-primary' href='/api/auth/signin'>Sign in</a>
        }
      </div>
    </div>
  )
} */

'use client'

import { useSession } from "next-auth/react"
import React, { useState } from "react"

export default function ClientSideRoot (): any {
  const { data: session } = useSession()

  const [shown, setShown] = useState<boolean>(false)
  const clickHandler = (): void => {
    setShown(!shown)
  }
  console.log('session:', session);
  return (
    <div className='grid grid-cols-2 text-white p-4'>
      <div>
        <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
            {/* console.log('session...', session); */}
            
          {/* Hi {session?.user.name}! */}
        </h1>
      </div>
      <div>
        <p>Protected client page</p>
        <button className="btn btn-primary" onClick={clickHandler}>Toggle</button>
        {shown
          ? <pre>{JSON.stringify(session, null, 2)}</pre>
          : null
        }
      </div>
    </div>
  )
}