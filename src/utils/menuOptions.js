import { TbMovie, TbUserPlus } from 'react-icons/tb';

export const menuOptions = [
    {
        label: 'Animes',
        icon: <TbMovie />,
        path: '/animes',
        enable: [
            'admin',
            'user'
        ]
    },
    {
        label: 'Usuários',
        icon: <TbUserPlus />,
        path: '/users',
        enable: [
            'admin'
        ]
    }
]