import React from 'react';

interface MenuButtonProps {
    title: string;
    onClick?: () => void; // Optional click handler
    active?: boolean; // Optional prop to indicate active state
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, onClick, active }) => {
    const buttonStyles: React.CSSProperties = {
        height: '45px',
        width: '158px',
        borderRadius: '14px',
        background: active ? '#FFFFFF' : '#262626',
        color: active ? '#282828' : '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Raleway',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer', // Add cursor pointer if clickable
    };

    return (
        <div style={buttonStyles} onClick={onClick}>
            {title}
        </div>
    );
};

export default MenuButton;
