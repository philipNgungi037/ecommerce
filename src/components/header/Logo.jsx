import React from 'react'
import { Link } from 'react-router-dom';
const Logo = () => {
    const logo = "No logo";
    return (
        <Link to='/'>
            <div className='logo text-center  text:sm lg:text-4xl font-extrabold text-appColor    rounded-md p-4'>
                <h3 className='logo-text uppercase line-through '>
                    {logo}
                </h3>
            </div>
        </Link>

    )
}

export default Logo