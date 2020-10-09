import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProducts {
	id: string;
	title: string;
}

interface HomeProps {
	recommendedProducts: IProducts[];
}

function Home({ recommendedProducts }: HomeProps) {
	return (
		<div>
			<Title>Products</Title>

			{recommendedProducts.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</div>
	);
}

// Loads data on the server and send it to the component through props
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const response = await fetch('http://localhost:3333/recommended');

	const recommendedProducts = await response.json();

	return {
		props: {
			recommendedProducts,
		},
	};
};

export default Home;
