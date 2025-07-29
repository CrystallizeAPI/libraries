import { catalogueFetcherGraphqlBuilder, createCatalogueFetcher, createClient } from '@crystallize/js-api-client';
import { Image } from '@crystallize/reactjs-components';

export const ImageDemo = async () => {
    const apiClient = createClient({
        tenantIdentifier: 'furniture',
    });
    const fetcher = createCatalogueFetcher(apiClient);
    const builder = catalogueFetcherGraphqlBuilder;
    const query = {
        catalogue: {
            __args: {
                path: '/shop/chairs',
                language: 'en',
            },
            children: {
                __on: [
                    builder.onItem(),
                    builder.onProduct({
                        defaultVariant: {
                            price: true,
                            firstImage: {
                                url: true,
                                altText: true,
                                variants: {
                                    width: true,
                                    url: true,
                                },
                            },
                        },
                    }),
                    builder.onDocument(),
                    builder.onFolder(),
                ],
            },
        },
    };
    const response = await fetcher<{ catalogue: { children: { ____typename: string }[] } }>(query);
    const products = response.catalogue.children.filter((item: any) => item.__typename === 'Product');

    return (
        <div>
            {products.map((product: any) => (
                <div key={product.path}>
                    <Image
                        className="card-img-top img-fluid"
                        {...product.defaultVariant.firstImage}
                        sizes="100w, 700px"
                    />
                    <div>
                        <h4>{product.name}</h4>
                        <div>
                            Price: {product.defaultVariant.price} <br />
                            {product.topics && (
                                <span>
                                    Topics:
                                    {product.topics.map((topic: any, index: number) => (
                                        <span key={topic.path + index}>{topic.name}</span>
                                    ))}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
