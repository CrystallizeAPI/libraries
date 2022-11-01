import { Schema } from 'zod';

export type DtoOptions = {
    schema?: Schema
}

export type DtoNode = {
    _key: string;
    _z: any;
}

export type DtoMatcher = <T>(input: T) => boolean;

export type DtoMatcherRule = Record<string, any>;

export type DtoOperation = {
    key: string;
    _type: string;
    matcher: DtoMatcher | DtoMatcherRule | string
    dto: DtoMapping
}

/**
*/
export type DtoArrayRule = [path: string, mapping: DtoMapping]

export type DtoFunction = (input: any) => any

export type DtoMapping = string | DtoArrayRule | DtoConfig | DtoFunction | DtoNode | DtoOperation

export type DtoConfig = {
    [key: string]: DtoMapping
}
