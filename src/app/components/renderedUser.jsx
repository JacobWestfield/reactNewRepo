import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const RenderedUser = ({ userId, data }) => {
    const user = data.find((item) => item._id === userId);
    const history = useHistory();
    return (
        <>
            {userId ? (
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия:{user.profession.name}</h2>
                    {user.qualities.map((quality) => (
                        <span
                            key={quality._id}
                            className={"badge m-1 bg-" + quality.color}
                        >
                            {quality.name}
                        </span>
                    ))}
                    <h4>Мероприятий:{user.completedMeetings}</h4>
                    <h2>Рейтинг:{user.rate}</h2>
                    <button onClick={() => history.replace("/users")}>
                        All users
                    </button>
                </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

RenderedUser.propTypes = {
    userId: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default RenderedUser;
