import { ReactNode } from "react";


const Container = ({children} : {children:ReactNode}) => {
    return (
        <div className="w-full max-w-full 2xl:max-w-[1440px] mx-auto px-5 md:px-7 2xl:px-0">
            {children}
        </div>
    );
};

export default Container;