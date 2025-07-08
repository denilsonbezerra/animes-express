import CardAnime from "@/components/CardAnime";
import ModalCreateAnimes from "@/components/ModalCreateAnime";
import PageWrapper from "@/components/PageWrapper";
import SpinnerLoad from "@/components/SpinnerLoad";
import useUserData from "@/hooks/use-user-data";
import instance from "@/instance/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Animes() {
    const [loading, setLoading] = useState(true)
    const [animes, setAnimes] = useState([])
    const [openModal, setOpenModal] = useState(false)

    const user = useUserData()

    useEffect(() => {
        async function getAnimes() {
            try {
                const animes = await instance.get("/animes")
                setAnimes(animes.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getAnimes()
    }, [])

    async function postAnime(animeData) {
        try {
            if (user.role !== "admin") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                router.push("/animes")
            }

            const response = await instance.post("/anime", animeData)

            setAnimes([...animes, response.data])
            setOpenModal(false)
            toast.success("Anime adicionado com sucesso")
        } catch (error) {
            toast.error("Erro ao adicionar anime")
            console.log(error)
        }
    }

    return (
        <PageWrapper>
            {loading &&
                <SpinnerLoad />
            }

            {user?.role === 'admin' &&
                <div className="w-full flex justify-end mb-[10px]">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                        onClick={() => setOpenModal(true)}
                    >
                        Adicionar Anime
                    </button>
                </div>
            }

            <div className="h-full grid grid-cols-4 gap-4">
                {animes.map((anime) => {
                    return (
                        <CardAnime key={anime.id} anime={anime} />
                    )
                })}
            </div>

            <ModalCreateAnimes
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={postAnime}
            />
        </PageWrapper>
    )
}