import _ from 'object-path';
import { debug } from './util'
import type {
    DtoOptions,
    DtoOperation,
    DtoMapping,
    DtoMatcher,
    DtoArrayRule,
} from './types/internal'

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

export const component = (matcher: DtoOperation["matcher"], dto: DtoMapping, options: DtoOptions = {}) => {
    return find("components", matcher, dto, options);
}

component.image = (matcher: DtoOperation["matcher"]) => {
    return component(matcher, images({
        variants: true,
        path: 'content.images',
    }))
}

export type ImagesOptions = {
    variants?: boolean
    path?: string;
}

export const images = (options: ImagesOptions = {}): DtoArrayRule => {
    const fields: DtoMapping = {
        key: 'key',
        url: 'url',
        altText: 'altText',
    }

    if (options?.variants) {
        fields.variants = {
            key: 'key',
            url: 'url',
            width: 'width',
        };
    }
    return [options?.path ?? 'images', fields]
}
