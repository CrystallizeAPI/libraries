import { FC } from 'react';

export const Home: FC = () => {
    return (
        <div>
            <img
                className="img-fluid"
                src="https://raw.githubusercontent.com/CrystallizeAPI/.github/main/images/header.jpeg"
                alt="Crystallize Header"
            />
            <br />

            <br />
            <h1>TEST</h1>
            <p className="text-center">
                This demo application has been created to show how to use the different Crystallize libraries.
            </p>

            <p className="text-center">
                At anytime you can change the <em>tenantIdentifier</em> in the footer input (on the left). If your
                tenant catalogue is public, that will work.
            </p>
        </div>
    );
};
