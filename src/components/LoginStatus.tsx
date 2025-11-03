import React from 'react'
import { getCurrentUser } from '../auth'
import { signOut } from '../app/functions/auth'

const LoginStatus = async() => {
const user = await getCurrentUser()

  return (
    <div>
        {user ? (
                  <div>
                    <p>Welcome {user.name}</p>
                    <form action={signOut}>
                      <button>Logout</button>
                    </form>
                  </div>
                ) : (
                  <a href="/login">Login</a>
                )}
    </div>
  )
}

export default LoginStatus
