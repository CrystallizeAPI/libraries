import { FC } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Code: FC<{ language: string; children: string }> = ({ language, children }) => {
    return (
        //@ts-ignore
        <SyntaxHighlighter language={language} style={docco}>
            {children}
        </SyntaxHighlighter>
    );
};
