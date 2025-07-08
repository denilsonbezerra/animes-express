import Head from "next/head";

export default function SpinnerLoad() {
    return (
        <>
            <Head>
                <title>Carregando</title>
            </Head>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="ml-4 text-lg font-medium">Carregando...</span>
            </div>
        </>
    )
}