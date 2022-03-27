import { FC } from 'react';

export const ListedNav: FC<{ list: any[] }> = ({ list }) => {
    return (
        <ul className="list-disc pl-4">
            {list.map((item) => {
                return (
                    <li key={item.path}>
                        <a href={item.path}>{item.name}</a>
                        {item.children && <ListedNav list={item.children} />}
                    </li>
                );
            })}
        </ul>
    );
};
