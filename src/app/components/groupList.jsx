import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    let checkObject;
    let localArray;

    if (Array.isArray(items)) {
        localArray = items;
        checkObject = false;
    } else {
        localArray = Object.keys(items);
        checkObject = true;
    }

    return (
        <ul className="list-group">
            {localArray.map((item, index) => {
                const checker = checkObject ? item : index;
                return (
                    <li
                        key={items[checker][valueProperty]}
                        className={
                            items[checker] === selectedItem
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        onClick={() => onItemSelect(items[checker])}
                        role="button"
                    >
                        {items[checker][contentProperty]}
                    </li>
                );
            })}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};
export default GroupList;
