import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ searchQuery, onSearchChange }) => (
    <div className="search-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon
            icon={faSearch}
            style={{ position: 'absolute', left: '10px', color: '#888' }}
        />
        <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '30px' }} // Chừa khoảng trống cho icon
        />
    </div>
);

export default SearchBox;
