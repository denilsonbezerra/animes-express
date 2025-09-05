import React, { useState, useEffect } from 'react';
import instance from '@/instance/api';
import useUserData from '@/hooks/use-user-data';

const CardAnime = ({ anime }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useUserData()

  const {
    id,
    title,
    description,
    rating,
    imageUrl
  } = anime;

  const fetchMessages = async (groupId) => {
    try {
      setLoading(true);
      setError(null);
      
      
      const response = await instance.get(`/messages/${groupId}`);

      const data = await response.data;
      
      const formattedMessages = data.map(msg => ({
        id: msg.id,
        content: msg.content,
        senderId: msg.senderId,
        senderName: msg.User?.name || `Usuário ${msg.senderId}`, 
        createdAt: new Date(msg.createdAt),
        isCurrentUser: msg.senderId === user.id
      }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessageToAPI = async (content, groupId) => {
    try {
      
      const response = await instance.post(`/messages`, {
        content,
        groupId
      });

      const newMsg = await response.data;
      
      const formattedMessage = {
        content: content,
        senderId: user.id,
        createdAt: new Date(),
        isCurrentUser: true
      };

      setMessages(prev => [...prev, formattedMessage]);
      return true;
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    if (isModalOpen && id) {
      fetchMessages(id);
    }
  }, [isModalOpen, id]);

  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return 'Descrição não disponível';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">☆</span>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-400 text-lg">☆</span>
      );
    }
    
    return stars;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const success = await sendMessageToAPI(newMessage.trim(), id);
    if (success) {
      setNewMessage('');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null); 
  };

  return (
    <>
      <div 
        className="group w-[350px] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-103 border border-gray-700 hover:border-red-400/50 cursor-pointer"
        onClick={openModal}
      >
        {/* Imagem do anime */}
        <div className="relative h-64 w-full overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">🎬</span>
            </div>
          )}
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Rating badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <span className="text-yellow-400 text-sm font-semibold">{rating?.toFixed(1) || 'N/A'}</span>
            <span className="text-yellow-400 text-xs">★</span>
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-6">
          {/* Título */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
            {title || 'Título não disponível'}
          </h3>
          
          {/* Descrição */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {truncateDescription(description)}
          </p>
          
          {/* Rating com estrelas */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              {renderStars(rating || 0)}
            </div>
            <span className="text-gray-400 text-sm">
              {rating ? `${rating.toFixed(1)}/5` : 'Sem avaliação'}
            </span>
          </div>
          
          {/* Botão de ação */}
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl cursor-pointer">
            Ver Detalhes
          </button>
        </div>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Modal lateral com chat */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay de fundo */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40"
            onClick={closeModal}
          ></div>
          
          {/* Modal lateral */}
          <div className="ml-auto w-[400px] h-full bg-gradient-to-br from-gray-800 to-gray-900 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col relative z-50">
            {/* Header do modal */}
            <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-red-400/30">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">🎬</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white line-clamp-1">
                      {title || 'Título não disponível'}
                    </h2>
                    <p className="text-sm text-gray-400">Chat do anime</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Área do chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
                  <span className="ml-3 text-gray-400">Carregando mensagens...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-32 text-center">
                  <div className="text-red-400">
                    <p className="font-semibold">Erro ao carregar chat</p>
                    <p className="text-sm text-gray-400 mt-1">{error}</p>
                    <button 
                      onClick={() => fetchMessages(id)}
                      className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-center text-gray-400">
                  <div>
                    <p className="font-semibold">Nenhuma mensagem ainda</p>
                    <p className="text-sm mt-1">Seja o primeiro a comentar sobre este anime!</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.isCurrentUser
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          : 'bg-gray-700/80 text-gray-200'
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <p className="text-xs font-semibold text-red-400 mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isCurrentUser ? 'text-red-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input para nova mensagem */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || loading}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white p-[15px] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rotate-90"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </form>
            </div>

            {/* Indicador de usuários online */}
            <div className="px-4 pb-2">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{messages.length > 0 ? `${new Set(messages.map(m => m.senderId)).size} usuários participando` : '0 usuários online'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardAnime;