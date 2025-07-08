import instance from "@/instance/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../Header";
import Head from 'next/head';
import SpinnerLoad from "../SpinnerLoad";

export default function PageWrapper({ children }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/')
        }

        async function profile() {
            try {
                const user = await instance.get('/profile')

                localStorage.setItem(
                    'user',
                    JSON.stringify(user.data)
                )
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                router.push('/')
            } finally {
                setLoading(false)
            }
        }

        profile()
    }, [])

    return (
        <div className="w-full h-full flex flex-col">
            {loading &&
                <SpinnerLoad />
            }
            <Head>
                <title>Home - AnimesExpress</title>
                <meta name="description" content="Animes Express - A melhor hospedeira de animes do Brasil" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="w-full h-full pt-[75px] px-[8px] pb-[20px] bg-gradient-to-b from-gray-900 to-gray-800">
                {children}
            </div>
        </div>
    )
}