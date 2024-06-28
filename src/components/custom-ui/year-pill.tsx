import React from 'react';

const YearPill = ({ batch }: { batch: number }) => {
    return <div style={yearPillStyles}>{batch}</div>;
};

export default YearPill;

const yearPillStyles: React.CSSProperties = {
    width: '44px',
    height: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1px 10px 2px 11px',
    borderRadius: '20px',
    border: '1px solid #1E6AFF',
    color: '#FFFFFF', 
    fontFamily: 'Raleway',
    fontSize: '10px',
    fontStyle: 'normal',
    fontWeight: 600, 
    lineHeight: 'normal',
    textTransform: 'lowercase',
};
