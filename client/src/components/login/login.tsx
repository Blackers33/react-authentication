import React, { useRef, useState } from 'react'

function Login() {

    const userRef = useRef(null)
    const errRef = useRef(null)

    const [user, setUser] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')
    
  return (
    <div>Login</div>
  )
}

export default Login