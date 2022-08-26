import { z } from 'zod';

export const RichTextContentInputSchema = z
    .object({
        html: z.array(z.string()).optional(),
        json: z.array(z.string()).optional(),
    })
    .refine(
        ({ json }) => {
            if (!json?.length) {
                return true;
            }

            try {
                json?.map((str) => JSON.parse(str));
                return true;
            } catch (err) {
                return false;
            }
        },
        {
            message: 'Invalid json provided to rich text content input',
        },
    );

export type RichTextContentInput = z.infer<typeof RichTextContentInputSchema>;
