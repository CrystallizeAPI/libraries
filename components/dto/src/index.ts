import z from 'zod';
import _ from 'object-path';

const debug = (...args) => {
    if (process.env.DEBUG) {
        console.log(...args);
    }
}

type LooseObject = Record<string, any>;

function buildMatcher (rules: LooseObject | string) {
    return (data: LooseObject) => {
        debug("match", typeof rules, rules, data.id);
        if (typeof rules === "string") {
            return data.id === rules;
        }
        const entries = Object.entries(rules);
        return !entries.find(([key, value]) => {
            return data[key] === value;
        });
    };
}

const dtoMatchers = {
    array: {
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
}

export const matchers = {
    find: (key, matcher, dto) => {
        return { type: "array.find", key, matcher, dto }
    },
    filter: (key, matcher, dto) => {
        return { type: "array.filter", key, matcher, dto }
    }
}
export const component = (matcher, dto) => matchers.find("components", matcher, dto);

type DtoNode = {
    _key: string;
    _z: any;
}
type DtoMatcher = <T>(input: T) => boolean;
type DtoMatcherRule = Record<string, any>;
type DtoOperation = {
    key: string;
    type: string;
    match: DtoMatcher | DtoMatcherRule
    dto: DtoMapping
}
type DtoFunction = (input: any) => any
type DtoMapping = string | [string, DtoMapping] | DtoConfig | DtoFunction | DtoNode | DtoOperation
type DtoConfig = {
    [key: string]: DtoMapping
}

function parseNode<T> (
    mapping: DtoMapping,
    input: Record<string, any>
) {
    if (typeof mapping === "string") {
        return typeof input === "object" ? _.get(input, mapping) : input
    }

    if (Array.isArray(mapping)) {
        const [path, map] = mapping as [string, any]
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
        const type = mapping?.type ?? "o"
        if (type === "array.find") {
            return dtoMatchers.array.find(mapping, input);
        }
        return Object.entries(mapping).reduce((memo, [key, mapping]) => {
            const localInput = _.get(input, key);
            let value;
            if (Array.isArray(localInput)) {
                value = localInput.map(input => parseNode(mapping, input))
            } else {
                value = parseNode(mapping, localInput);
            }
            return {
                ...memo,
                [key]: value
            }
        }, {} as T)
        return dto(mapping as DtoConfig)(input)
    }
}

export function dto<T>(config: DtoConfig) {
    return (input: Record<string,any>) => {
        return Object.entries(config).reduce<T>((memo, [key, mapping]) => {
            let value = parseNode<T>(mapping, input);
            return {
                ...memo,
                [key]: value,
            }
        }, {} as T)
    }
}

dto.string = (key: string): DtoNode => {
    return {
        _key: key,
        _z: z.string(),
    }
}

const productTransformer = {
    id: 'id',
    name: 'name',
    path: 'patch',
    tenantIdentifier: 'tenantIdentifier.content.text',
    tenantId: 'tenantId.content.text',
    logo: {
        'logos.content.firstImage': { key: '@', url: '@' }
    },
    logos: {
        'logos.content.images': [
            {
                key: '@',
                url: '@',
            }
        ]
    },
    configuration: {
        'configuration.content.sections': section => {
        },
    },
}
