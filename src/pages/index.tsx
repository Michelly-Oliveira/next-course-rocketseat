import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

import SEO from '@/components/SEO';

interface IProducts {
	id: string;
	title: string;
}

interface HomeProps {
	recommendedProducts: IProducts[];
}

function Home({ recommendedProducts }: HomeProps) {
	async function handleSum() {
		// Access the default export from math file
		const math = (await import('../lib/math')).default;

		alert(math.sum(3, 5));
	}

	return (
		<div>
			<SEO
				title='DevCommerce, the best e-commerce for devs'
				shouldExcludeTitleSuffix
				image='safe_image.png'
			/>

			<section>
				<Title>Products</Title>

				<ul>
					{recommendedProducts.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
				</ul>
			</section>

			<button onClick={handleSum}>Sum</button>
		</div>
	);
}

// Loads data on the server and send it to the component through props
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/recommended`
	);

	const recommendedProducts = await response.json();

	return {
		props: {
			recommendedProducts,
		},
	};
};

export default Home;
