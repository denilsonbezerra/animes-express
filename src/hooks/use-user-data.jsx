import { useEffect, useState } from "react"

export default function useUserData() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem("user")
        
        setUser(JSON.parse(user))
    }, [])

    return user
}