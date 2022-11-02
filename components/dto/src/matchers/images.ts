import { DtoMapping, DtoArrayRule } from '../types/internal'

export type ImagesOptions = {
    variants?: boolean
    path?: string;
}

/**
* Default image mapper definition
*/
export const images = (options: ImagesOptions = {}): DtoArrayRule => {
    const fields: DtoMapping = {
        key: 'key',
        url: 'url',
        altText: 'altText',
    }

    if (options?.variants) {
        fields.variants = ['variants', {
            key: 'key',
            url: 'url',
            width: 'width',
        }];
    }
    return [options?.path ?? 'images', fields]
}
