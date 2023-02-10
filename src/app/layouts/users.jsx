import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import GroupList from "../components/groupList";
import api from "../api/index";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import RenderedUser from "../components/renderedUser";
import SearchField from "../components/searchField";

const Users = () => {
    const { userId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [tempUserId, setTempUserId] = useState();
    const [searchData] = useState();
    const [users, setUsers] = useState();

    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        if (userId) {
            api.users.getById(userId).then((data) => {
                setTempUserId(data);
            });
            if (tempUserId) {
                return <>{<RenderedUser data={users} userId={userId} />}</>;
            } else {
                return <h1>Loading...</h1>;
            }
        }

        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const clearFilter = () => {
            setSelectedProf(undefined);
        };

        function handleSearch(data) {
            clearFilter();
            data.trim();
            if (data) {
                const regExp = new RegExp(`\\${data}`, "g");
                /* только частично сделано задание, не могу вернуть старый массив пользователей после изменения поиска
                Не знаю почему, но компонент не перерендеривается ничем кроме как setUsers() хоть убей. А setUsers() затирает старый массив
                Также не получилось сделать сброс поиска при выборе фильтра профессии, только наоборот сброс фильтра
                */
                setUsers(
                    users.filter((user) =>
                        regExp.test(user.name) ? user : undefined
                    )
                );
            }
        }

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            onClick={clearFilter}
                            className="btn btn-secondary mt-2"
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchField
                        onSearch={handleSearch}
                        searchData={searchData}
                    />
                    {count > 0 && (
                        <UsersTable
                            onSort={handleSort}
                            selectedSort={sortBy}
                            users={usersCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading page...</h1>;
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
