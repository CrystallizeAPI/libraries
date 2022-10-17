import { dto, component } from '../src'
import test from 'ava'

const input = {
    components: [
        {
            "id": "title",
            "name": "Title",
            "type": "singleLine",
            "content": {
                "text": "Professional Starter Kit"
            }
        },
        {
            "id": "description",
            "name": "Description",
            "type": "richText",
            "content": {
                "json": [
                    {
                        "kind": "block",
                        "type": "paragraph",
                        "metadata": {},
                        "children": [
                            {
                                "kind": "inline",
                                "metadata": {},
                                "textContent": "for your perfect start!"
                            }
                        ]
                    }
                ],
                "html": [
                    "<p>for your perfect start!</p>"
                ],
                "plainText": [
                    "for your perfect start!"
                ]
            }
        },
    ],
}

test('Component helper single field lookup', t => {
    const transformer = dto<{ title: string }>({
        title: component('title', 'content.text'),
    })
    const value = transformer(input);
    t.is(value.title, input.components[0].content.text);
})

test('Component helper object output', t => {
    const transformer = dto<{
        description: {
            text: string[];
            html: string[];
        }
    }>({
        description: component('description', {
            text: 'content.plainText',
            html: 'content.html',
        })
    })
    const value = transformer(input);
    t.is(value.description.html, input.components[1].content.html);
})
