import Home from '../home/Home';
import AddAlbum from '../add-album/AddAlbum';

const rotas = [
	{ nome: 'Home',      caminho: '/',         componente: Home },
	{ nome: 'Add album', caminho: '/addAlbum', componente: AddAlbum }
];

export default rotas;
