export type ImageVariant = {
    key: string;
    height: number;
    width: number;
    url: string;
}

export type Image = {
    key: string;
    url: string;
    altText: string;
    variants?: ImageVariant[]
};
