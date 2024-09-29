import React from "react";

function Search() {
    return (
        <div>
            <div className="search_area zoom-anim-dialog mfp-hide" id="test-search">
                <div className="search_box_inner">
                    <h3>Search</h3>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for..."
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <i className="icon icon-Search" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search