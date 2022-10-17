import { dto, pick, find, images, component } from './'
import type { Image } from './'
import product from '../product-frntr.json'

type ProductVariant = {
    id: string;
    name: string;
    path: string;
    sku: string;
    price: number;
    images: Image[];
}
type Product = {
    id: string;
    name: string;
    path: string;

    title: string;
    description: string;
    relatedItems: Array<{
        name: string;
        path: string;
    }>;
    defaultVariant: ProductVariant;
}

const variantTransformer = dto({
    ...pick(['id', 'name', 'sku', 'price']),
    stock: find("stockLocations", {identifier: "default"}, 'stock'),
    images: images({
        variants: true,
    }),
})

const datetime = () => ([
    'content.datetime',
    dateStr => new Date(dateStr)
]);


const transformer = dto<Product>({
    id: 'id',
    name: 'name', // Default is path lookup a string
    path: 'path',

    title: component("title", "content.text"),
    description: component("description", "content.html"),
    relatedItems: component("related-items", [
        "content.items", {
            name: 'name',
            path: 'path',
        }
    ]),
    defaultVariant: find("variants", {isDefault: true}, variantTransformer),
})

const value = transformer(product);

console.log(JSON.stringify(value));
//console.log(util.inspect(value, { depth: 5 }));
