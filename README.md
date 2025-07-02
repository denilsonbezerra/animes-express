# AnimeExpress

AnimeExpress é um site dedicado a disponibilizar informações sobre animes de forma rápida e organizada. Desenvolvido com foco em consolidar o aprendizado em desenvolvimento web, o projeto utiliza tecnologias modernas para proporcionar uma experiência fluida ao usuário.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Funcionalidades](#funcionalidades)  
- [Como Rodar o Projeto](#como-rodar-o-projeto)  
- [Estrutura do Projeto](#estrutura-do-projeto)  
- [Contribuição](#contribui%C3%A7%C3%A3o)  
- [Licença](#licen%C3%A7a)  

---

## Sobre o Projeto

AnimeExpress foi criado como projeto pessoal para consolidar conhecimentos em desenvolvimento front-end e back-end. O site permite que os usuários explorem uma lista de animes, visualizem detalhes, e navegarem por um catálogo atualizado.

---

## Tecnologias Utilizadas

- **React** — Biblioteca para construção da interface do usuário  
- **Next.js** — Framework React para SSR e geração estática  
- **Tailwind CSS** — Framework CSS utilitário para estilização rápida  
- **Node.js & Express** — Back-end para servir dados e API  
- **API Externa de Animes** — Integração com APIs para obter dados atualizados  

---

## Funcionalidades

- Listagem de animes populares  
- Visualização detalhada de cada anime  
- Busca por título  
- Navegação fluida entre páginas  
- Layout responsivo para dispositivos móveis  

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Git  

### Passos

1. Clone o repositório:

git clone <https://github.com/denilsonbezerra/animes-express.git>

2. Acesse a pasta do projeto:

cd animes-express

3. Instale as dependências:

npm install

4. Rode o servidor de desenvolvimento:

npm run dev

5. Abra o navegador em [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

```
/animes-express
├── /public          # Arquivos estáticos (imagens, favicon etc.)
├── /src             # Código fonte da aplicação
│   ├── /components  # Componentes React reutilizáveis
│   ├── /pages       # Páginas da aplicação (Next.js)
│   └── /styles      # Arquivos CSS / Tailwind
├── package.json     # Configurações do npm e scripts
└── README.md        # Documentação do projeto
```

---

## Contribuição

Contribuições são bem-vindas!  
Para contribuir, siga os passos:

1. Faça um fork do projeto  
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)  
3. Faça commit das suas alterações (`git commit -m 'feat: descrição da feature'`)  
4. Envie para a branch original (`git push origin feature/nome-da-feature`)  
5. Abra um Pull Request no repositório principal  

---

## Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
