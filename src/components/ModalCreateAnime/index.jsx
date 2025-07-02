import React, { useState } from 'react';

export default function ModalCreateAnimes({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        gender: '',
        description: '',
        rating: '',
        imageUrl: '',
        episodes: ''
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Função para validar o formulário
    const validateForm = () => {
        const newErrors = {}

        // Validação do título
        if (!formData.title.trim()) {
            newErrors.title = 'O título é obrigatório'
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'O título deve ter pelo menos 2 caracteres'
        }

        // Validação de gênero
        if (formData.gender.trim().length < 2) {
            newErrors.gender = 'O gênero deve ter pelo menos 2 caracteres'
        }

        // Validação da descrição
        if (formData.description.trim() && formData.description.trim().length < 10) {
            newErrors.description = 'A descrição deve ter pelo menos 10 caracteres'
        }

        // Validação do rating
        if (formData.rating !== '') {
            const rating = parseFloat(formData.rating)
            if (isNaN(rating) || rating < 0 || rating > 5) {
                newErrors.rating = 'A avaliação deve ser um número entre 0 e 5'
            }
        }

        // Validação da URL da imagem
        if (formData.imageUrl.trim()) {
            try {
                new URL(formData.imageUrl)
            } catch {
                newErrors.imageUrl = 'Por favor, insira uma URL válida'
            }
        }

        // Validação de episodios
        if (formData.episodes !== '') {
            const episodes = parseInt(formData.episodes)
            if (isNaN(episodes) || episodes < 0) {
                newErrors.episodes = 'O número de episódios deve ser um número maior que 0'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Função para lidar com mudanças nos campos
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Limpar erro do campo quando o usuário começa a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Preparar dados para envio
            const animeData = {
                title: formData.title.trim(),
                gender: formData.gender.trim(),
                description: formData.description.trim() || null,
                rating: formData.rating ? parseFloat(formData.rating) : null,
                imageUrl: formData.imageUrl.trim() || null,
                episodes: formData.episodes ? parseInt(formData.episodes) : null
            }

            await onSubmit(animeData)

            // Limpar formulário e fechar modal
            setFormData({
                title: '',
                gender: '',
                description: '',
                rating: '',
                imageUrl: '',
                episodes: ''
            })
            setErrors({})
            onClose()
        } catch (error) {
            console.error('Erro ao criar anime:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Função para fechar o modal
    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                title: '',
                gender: '',
                description: '',
                rating: '',
                imageUrl: '',
                episodes: ''
            })
            setErrors({})
            onClose()
        }
    }

    // Função para lidar com clique fora do modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
            handleClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-auto border border-gray-700 scale-85">
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <span className="mr-2">🎬</span>
                        Novo Anime
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Campo Título */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Título <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 ${errors.title ? 'border-red-400' : 'border-gray-600'
                                }`}
                            placeholder="Digite o título do anime"
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                        )}
                    </div>

                    {/* Campo Gênero */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                            Gênero
                        </label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 ${errors.gender ? 'border-red-400' : 'border-gray-600'
                                }`}
                            placeholder="Digite o gênero do anime (opicional)"
                            disabled={isSubmitting}
                        />
                        {errors.gender && (
                            <p className="mt-1 text-sm text-red-400">{errors.gender}</p>
                        )}
                    </div>

                    {/* Campo Episodios */}
                    <div>
                        <label htmlFor="episodes" className="block text-sm font-medium text-gray-300 mb-2">
                            Episódios
                        </label>
                        <input
                            type="text"
                            id="episodes"
                            name="episodes"
                            value={formData.episodes}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 ${errors.episodes ? 'border-red-400' : 'border-gray-600'
                                }`}
                            placeholder="Digite o número de episódios do anime (opicional)"
                            disabled={isSubmitting}
                        />
                        {errors.episodes && (
                            <p className="mt-1 text-sm text-red-400">{errors.episodes}</p>
                        )}
                    </div>

                    {/* Campo Descrição */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 resize-none ${errors.description ? 'border-red-400' : 'border-gray-600'
                                }`}
                            placeholder="Digite uma descrição do anime (opcional)"
                            disabled={isSubmitting}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                        )}
                    </div>

                    {/* Campo Avaliação */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
                            Avaliação
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                min="0"
                                max="5"
                                step="0.1"
                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 ${errors.rating ? 'border-red-400' : 'border-gray-600'
                                    }`}
                                placeholder="0.0 - 5.0"
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                                ⭐
                            </div>
                        </div>
                        {errors.rating && (
                            <p className="mt-1 text-sm text-red-400">{errors.rating}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">Deixe vazio se não houver avaliação</p>
                    </div>

                    {/* Campo URL da Imagem */}
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                            URL da Imagem
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200 ${errors.imageUrl ? 'border-red-400' : 'border-gray-600'
                                }`}
                            placeholder="https://exemplo.com/imagem.jpg"
                            disabled={isSubmitting}
                        />
                        {errors.imageUrl && (
                            <p className="mt-1 text-sm text-red-400">{errors.imageUrl}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">Deixe vazio se não houver imagem</p>
                    </div>

                    {/* Botões */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Criando...
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">✨</span>
                                    Criar Anime
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}