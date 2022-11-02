import _ from 'object-path';
import { debug } from './util'
import type {
    DtoOptions,
    DtoOperation,
    DtoMapping,
    DtoMatcher,
    DtoArrayRule,
} from './types/internal'
import { images } from './matchers/images'

type LooseObject = Record<string, any>;

export function buildMatcher (rules: LooseObject | string): DtoMatcher {
    return (data: LooseObject) => {
        debug("match", typeof rules, rules, data);
        if (typeof rules === "string") {
            return data.id === rules;
        }
        const entries = Object.entries(rules);
        return !entries.some(([key, value]) => {
            return data[key] !== value;
        });
    };
}

export const first = (
    key: string,
    matcher: DtoOperation["matcher"],
    dto: DtoMapping,
    options: DtoOptions = {}
): DtoOperation => {
    return { _type: "first", key, matcher, dto, ...options }
}

export const find = (
    key: string,
    matcher: DtoOperation["matcher"],
    dto: DtoMapping,
    options: DtoOptions = {}
): DtoOperation => {
    return { _type: "find", key, matcher, dto, ...options }
}

export const filter = (
    key: string,
    matcher: DtoOperation["matcher"],
    dto: DtoMapping,
    options: DtoOptions = {}
): DtoOperation => {
    return { _type: "filter", key, matcher, dto, ...options }
}

/**
* Mapper to search the `components` array by `id` and apply `dto` mapping
*
* ```ts
* component('my-single-line', 'content.text')
* component('my-rich-text', {
*   html: 'content.html',
*   text: 'content.plainText',
* })
* ```
*/
export const component = (id: DtoOperation["matcher"], dto: DtoMapping, options: DtoOptions = {}) => {
    return find("components", id, dto, options);
}

/**
* Mapper to search the `components` array by `id` and apply a default image mapping
*
* ```ts
* component.image('my-images', {
*   variants: true, // default value
*   path: 'content.images' // default value. ov
* })
* // will use the same mapper as
* const mapper = {
*   key: 'key',
*   url: 'url',
*   altText: 'altText',
*   variants: {
*       key: 'url',
*       url: 'url',
*       width: 'width',
*   }
* }
* ```
*/
component.image = (id: DtoOperation["matcher"]) => {
    return component(id, images({
        variants: true,
        path: 'content.images',
    }))
}


/**
* Mapper to search the `components` array by `id` and apply a default image relation mapping
*
* ```ts
* component.relation('my-images')
* // will use the same mapper as
* const mapper = {
*   name: 'name',
*   path: 'path',
* }
* ```
*/
component.relation = (id: DtoOperation["matcher"]) => {
    return component(id, [
        "content.items", {
            name: 'name',
            path: 'path',
        }
    ])
}