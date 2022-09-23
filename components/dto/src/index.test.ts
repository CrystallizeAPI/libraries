import { dto, matchers, component } from './'
import util from 'util'

const output = {
    id: '123',
    name: 'Test',
    path: '/test',
    tenantIdentifier: 'identifier-123',
    tenantId: 'id-123',
    logo: {
        key: 'image-1',
        url: '/images/1',
        variants: [
            {
                url: '/images/1/a',
                width: 100,
                height: 100,
            }
        ],
    },
    configuration: [
        {
            title: 'Settings',
            properties: [{
                key: 'test',
                value: 't3est value',
            }],
        },
    ],
}

const input = {
    id: output.id,
    name: output.name,
    path: output.path,
    components: [
        {
            id: "foo",
            content: {
                text: "bar",
            },
        },
        {
            id: "bar",
            content: {
                is: {
                    with: "keys",
                    yes: "many",
                    keys: "yes",
                }
            },
        },
    ],
    tenantIdentifier: {
        content: { text: output.tenantIdentifier }
    },
    tenantId: {
        content: { text: output.tenantId }
    },
    logos: {
        content: {
            firstImage: { ...output.logo }
        }
    },
    configuration: {
        content: {
            sections: structuredClone(output.configuration),
        }
    },
}

type TenantDto = {
    id: string;
    name: string;
    path: string;
    foobs: string;
    tenantIdentifier: string;
    tenantId: string;
    logo: {
        key: string;
        url: string;
    }
}
const transformer = dto<TenantDto>({
    id: 'id',
    name: 'name', // Default is path lookup a string
    path: 'path',

    // A component mapper function to make it very easy to grab one component by id
    foo: component("foo", "content.text"),

    bars: component("bar", ["content.is", {
        keys: "keys",
    }]),

    fooManual: component(o => o.id === "foo", "content.text"),

    // Or use the underlying `find` matcher (which component wraps)
    // foo2: matchers.find("components", "foo", "content.text"),

    tenantIdentifier: 'tenantIdentifier.content.text',
    tenantId: 'tenantId.content.text',
    logo: [ // use arrays to map more complex types. First do a path lookup then pass it to the sub-dto
        'logos.content.firstImage',
        {
            key: 'key',
            url: 'url',
            variants: {
                url: 'url',
                width: 'width',
                height: 'height',
            },
        }
    ],
})

const value = transformer(input);

console.log(JSON.stringify(value));
//console.log(util.inspect(value, { depth: 5 }));
