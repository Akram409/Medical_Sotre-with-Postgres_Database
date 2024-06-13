import React from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const Navbar = () => {
    const { auths, logOut } = useContext(AuthContext);
    const user = auths?.user;
    return (
        <div>
            
        </div>
    );
};

export default Navbar;