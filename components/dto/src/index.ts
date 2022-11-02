import z, { Schema } from 'zod';
import _ from 'object-path';
import { buildMatcher } from './matchers'
import { debug } from './util'
import type { DtoMapping, DtoOperation, DtoFunction, DtoNode, DtoConfig, DtoArrayRule } from './types/internal'

export * from './types'
export * from './matchers'

const dtoMatchers = {
    first (matcher, input: Record<string, any>) {
        const data = _.get(input, matcher.key);
        const matcherFn = typeof matcher === "function" ? matcher : buildMatcher(matcher.matcher);
        const item = data?.[0]?.(matcherFn);
        return parseNode(matcher.dto, item);
    },
    find (matcher, input: Record<string, any>) {
        const data = _.get(input, matcher.key);
        const matcherFn = typeof matcher === "function" ? matcher : buildMatcher(matcher.matcher);
        const item = data?.find?.(matcherFn);
        return parseNode(matcher.dto, item);
    },
    filter (matcher, input: Record<string, any>) {
        const data = _.get(input, matcher.key);
        const matcherFn = typeof matcher === "function" ? matcher : buildMatcher(matcher.matcher);
        const item = data?.filter?.(matcherFn);
        return parseNode(matcher.dto, item);
    }
}


function parseNode<T> (
    mapping: DtoMapping,
    input: Record<string, any>
) {
    if (typeof mapping === "string") {
        return typeof input === "object" ? _.get(input, mapping) : input
    }

    if (Array.isArray(mapping)) {
        const [path, map] = mapping as DtoArrayRule
        const localInput = _.get(input, path)
        if (typeof map === "string") {
            return _.get(localInput, map);
        }
        else {
            return parseNode(
                map as DtoMapping,
                localInput
            )
        }
    }

    if (typeof mapping === "function") {
        return (mapping as DtoFunction)(input);
    }

    if (typeof mapping === "object") {
        const type = mapping?._type ?? "o"
        const formatObject = (mapping, input) => {
            if (type === "find") {
                return dtoMatchers.find(mapping, input);
            }
            else if (type === "filter") {
                return dtoMatchers.filter(mapping, input);
            }
            return Object.entries(mapping).reduce((memo, [key, mapping]) => {
                return {
                    ...memo,
                    [key]: parseNode(mapping, input),
                }
            }, {} as T)
        }
        if (Array.isArray(input)) {
            return input.map(input => formatObject(mapping, input));
        } else {
            return formatObject(mapping, input);
        }
    }
}

type Transformer = ((config: DtoConfig) => any) & {
    /**
    * Combine existing DTO with new config (patching)
    *
    * ```ts
    * type Value = {id: string}
    * const transformer = dto<Value>({
    *   id: 'path.to.id'
    * }).extend({
    *   id: 'override.path'
    * })
    * const value: Value = transformer({ override: { path: "1" } })
    * ```
    */
    extend: (newConfig: DtoConfig) => ReturnType<typeof dto>
}

/**
* Create a new DTO transformer with `DtoConfig`
*
* ```ts
* type Value = {id: string}
* const transformer = dto<Value>({
*   id: 'path.to.id'
* })
* const value: Value = transformer({ path: { to: { id: "1" } } })
* ```
*/
export function dto<T>(config: DtoConfig): Transformer {
    const handler = (input: Record<string,any>) => {
        return parseNode<T>(config, input);
    }


    handler.extend = (newConfig: DtoConfig) => {
        return dto({
            ...config,
            ...newConfig,
        })
    }

    return handler
}

export const pick = function (...args: any[]): Record<string,string> {
    return Object.fromEntries(args.flatMap(a => a).map(a => ([a,a])))
}

dto.string = (key: string): DtoNode => {
    return {
        _key: key,
        _z: z.string(),
    }
}
