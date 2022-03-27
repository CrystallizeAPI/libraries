import { FC, useRef } from 'react';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { useCrystallize } from '@crystallize/reactjs-hooks';

export const Footer: FC = () => {
    const [tenant] = useLocalStorage<string>('tenant', 'furniture');
    const { dispatch } = useCrystallize();
    const inputRef = useRef<HTMLInputElement>(null);

    const changeTenant = (newTenant: string) => {
        dispatch.updateConfiguration({
            tenantIdentifier: newTenant
        });
        writeStorage('tenant', newTenant);
    };

    return (
        <footer>
            <div className="changeTenant">
                <div>
                    <label htmlFor="change-tenant">Tenant</label>
                    <input
                        id="change-tenant"
                        type="text"
                        ref={inputRef}
                        defaultValue={tenant}
                    />
                </div>
                <button
                    onClick={() => {
                        if (inputRef.current) {
                            changeTenant(inputRef.current.value);
                        }
                    }}
                >
                    Change
                </button>
            </div>
            <div className="inner">
                <a
                    href="https://crystallize.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>
                        <img
                            src="/images/crystallize.svg"
                            alt="Crystallize Logo"
                            width={75 * 1.5}
                            height={25 * 1.5}
                        />
                    </span>
                </a>
            </div>
        </footer>
    );
};
