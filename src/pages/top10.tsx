import { GetStaticProps } from 'next';

interface IProducts {
	id: string;
	title: string;
}

interface Top10Props {
	products: IProducts[];
}

function Top10({ products }: Top10Props) {
	return (
		<div>
			<h1>Top 10</h1>

			{products.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</div>
	);
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

	const products = await response.json();

	return {
		props: { products },
		// Interval, in seconds, to wait until the page content is reloaded - create a new version of the page
		revalidate: 5,
	};
};

export default Top10;
