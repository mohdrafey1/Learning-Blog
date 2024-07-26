import React from 'react';

function Logo({ width = '100px' }) {
    return (
        <div className={`text-4xl font-bold italic ${width}`}>
            Learning-Blog
        </div>
    );
}

export default Logo;
