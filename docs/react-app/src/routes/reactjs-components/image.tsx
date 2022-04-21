import { catalogueFetcherGraphqlBuilder } from '@crystallize/js-api-client';
import { useCrystallize } from '@crystallize/reactjs-hooks';
import { Image } from '@crystallize/reactjs-components/dist/image';
import { FC, useEffect, useState } from 'react';
import Card from 'react-bootstrap/esm/Card';
import CardGroup from 'react-bootstrap/esm/CardGroup';
import { Code } from '../../components/Code';

export const CrystallizeImage: FC = () => {
    const { state, helpers } = useCrystallize();
    const [products, setProducts] = useState<any[]>([]);
    const fetch = helpers.catalogueFetcher;
    useEffect(() => {
        (async () => {
            const builder = catalogueFetcherGraphqlBuilder;
            const query = {
                catalogue: {
                    __args: {
                        path: '/shop/chairs',
                        language: 'en'
                    },
                    children: {
                        __on: [
                            builder.onItem(),
                            builder.onProduct({
                                defaultVariant: {
                                    price: true,
                                    firstImage: {
                                        altText: true,
                                        variants: {
                                            width: true,
                                            url: true
                                        }
                                    }
                                }
                            }),
                            builder.onDocument(),
                            builder.onFolder()
                        ]
                    }
                }
            };
            const response = await fetch<any>(query);
            const products = response.catalogue.children.filter((item: any) => item.__typename === 'Product');
            setProducts(products);
        })();
    }, [state.configuration.tenantIdentifier]);

    const usageCode = `import { Image } from '@crystallize/reactjs-components/dist/image';
    // fetch data and then
<Image className="card-img-top img-fluid" {...product.defaultVariant.firstImage} sizes="100w, 700px" />
`;

    return (
        <div>
            <h1>Image Component</h1>
            <Code language="javascript">{usageCode}</Code>
            <CardGroup>
                {products &&
                    products.slice(0, 5).map((product: any) => <Product product={product} key={'1' + product.path} />)}
            </CardGroup>
            <CardGroup>
                {products &&
                    products.slice(5, 10).map((product: any) => <Product product={product} key={'2' + product.path} />)}
            </CardGroup>
            <CardGroup>
                {products &&
                    products
                        .slice(10, 15)
                        .map((product: any) => <Product product={product} key={'3' + product.path} />)}
            </CardGroup>
        </div>
    );
};

const Product: FC<{ product: any }> = ({ product }) => {
    return (
        <Card key={product.path}>
            {/* <Card.Img variant="top" src={product.defaultVariant.firstImage.variants[2].url} /> */}
            <Image className="card-img-top img-fluid" {...product.defaultVariant.firstImage} sizes="100w, 700px" />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    Price: {product.defaultVariant.price} <br />
                    {product.topics && (
                        <span>
                            Topics:
                            {product.topics.map((topic: any, index: number) => (
                                <span key={topic.path + index}>{topic.name}</span>
                            ))}
                        </span>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
