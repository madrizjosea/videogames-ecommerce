import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Pagination from '../Pagination/Pagination';
import DashUserCards from '../DashUserCards/DashUserCards';
import style from './DashUsers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/user/index';
import { UserContext } from '../../Context/UserContext';

export default function DashUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useContext(UserContext);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, users.length]);

  function handlerPrev() {
    setCurrentPage(currentPage - 1);
  }

  function handlerNext() {
    setCurrentPage(currentPage + 1);
  }

  const postperPage = 12;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = users
    .slice(firstPostIndex, lastPostIndex)
    .filter(user => user.email !== value.email);

  return (
    <div>
      <div>
        <DashUserCards users={currentPost} />
        {users.length ? (
          <Pagination
            totalPosts={users.length}
            postPerPage={postperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlerPrev={handlerPrev}
            handlerNext={handlerNext}
          />
        ) : null}
      </div>
    </div>
  );
}
