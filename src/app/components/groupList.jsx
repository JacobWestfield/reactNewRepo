import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    /*Моё первое решение. Более императивное, где просто происходит другой  рендеринг в зависимости от типа аргумента items. Не мог решить проблему скобочной нотации к массиву, которая не работает как в объекте. А потом вспомнил что в параметры метода .map() можно поставить индекс
     */
    // if (Array.isArray(items)) {
    //     return (
    //         <ul className="list-group">
    //             {items.map((item) => (
    //                 <li
    //                     key={item[valueProperty]}
    //                     className={
    //                         item === selectedItem
    //                             ? "list-group-item active"
    //                             : "list-group-item"
    //                     }
    //                     onClick={() => onItemSelect(item)}
    //                     role="button"
    //                 >
    //                     {item[contentProperty]}
    //                 </li>
    //             ))}
    //         </ul>
    //     );
    // }

    //Пришлось сделать пару глобальных переменных для дополнительных проверок
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
