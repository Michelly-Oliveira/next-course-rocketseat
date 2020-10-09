import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

interface IProducts {
	id: string;
	title: string;
}

interface CategoryProps {
	products: IProducts[];
}

function Category({ products }: CategoryProps) {
	const router = useRouter();

	if (router.isFallback) {
		return <p>Carregando...</p>;
	}

	return (
		<div>
			<h1>{router.query.slug}</h1>

			{products.map((product) => (
				<li key={product.id}>{product.title}</li>
			))}
		</div>
	);
}

// Generate a dynamic static page
// Provide to getStaticPaths the 'accessed' url/path to be able to get the url params and pass to getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`http://localhost:3333/categories`);
	const categories = await response.json();

	// An object containing all the categories as the slug (needs to be the same name as in getStaticProps)
	const paths = categories.map((category) => {
		return {
			params: { slug: category.id },
		};
	});

	return {
		// Path for the pages - containing the params
		paths,
		// If a page is accessed but it is not yet generated, it will try to generate the necessary static pages
		fallback: true,
	};
};

// Runs for each page
export const getStaticProps: GetStaticProps<CategoryProps> = async (
	context
) => {
	// Get url params
	const { slug } = context.params;

	const response = await fetch(
		`http://localhost:3333/products?category_id=${slug}`
	);

	const products = await response.json();

	return {
		props: { products },
		// Interval, in seconds, to wait until the page content is reloaded - create a new version of the page
		revalidate: 60,
	};
};

export default Category;
