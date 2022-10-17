import { dto, component, images, Image } from '../src'
import test from 'ava'

const input = {
    components: [
        {
            "id": "shoppable-image",
            "name": "Shoppable image",
            "type": "images",
            "content": {
                "images": [
                    {
                        "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/winner-look-1.png",
                        "altText": null,
                        "key": "pewag-racing/22/7/13/15/winner-look-1.png",
                        "variants": [
                            {
                                "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/@100/winner-look-1.avif",
                                "width": 100,
                                "key": "pewag-racing/22/7/13/15/@100/winner-look-1.avif"
                            },
                            {
                                "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/@100/winner-look-1.webp",
                                "width": 100,
                                "key": "pewag-racing/22/7/13/15/@100/winner-look-1.webp"
                            },
                        ]
                    },
                    {
                        "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/loser-look-1.png",
                        "altText": null,
                        "key": "pewag-racing/22/7/13/15/loser-look-1.png",
                        "variants": [
                            {
                                "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/@100/loser-look-1.avif",
                                "width": 100,
                                "key": "pewag-racing/22/7/13/15/@100/loser-look-1.avif"
                            },
                            {
                                "url": "https://media.crystallize.com/pewag-racing/22/7/13/15/@100/loser-look-1.webp",
                                "width": 100,
                                "key": "pewag-racing/22/7/13/15/@100/loser-look-1.webp"
                            },
                        ]
                    }
                ]
            }
        },
    ],
}

test.only('Image component', t => {
    const expect = input.components[0].content.images
    const transformer = dto<{ images: Image[] }>({
        images: component.image('shoppable-image'),
    })
    const value = transformer(input);
    console.log(value.images)
    t.is(value.images, expect)
})
