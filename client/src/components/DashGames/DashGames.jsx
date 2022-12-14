import React from 'react';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import DashCardsGames from '../DashCardsGames/DashCardsGames';
import style from './DashGames.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions/games';

export default function DashGames() {
  const [buscar, setBuscar] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  //const [gamedata, setGame] = useState([]);
  const [order, setOrder] = useState('asc');
  const [order2, setOrder2] = useState('asc');
  const [genre, setGenre] = useState('');

  const dispatch = useDispatch();
  const games = useSelector(state => state.games.allGames);

  useEffect(() => {
    if (games.length < 1) {
      dispatch(getAllGames());
    }
  }, [dispatch, games]);

  let handleSelect = e => {
    setGenre(e.target.value);
    setCurrentPage(1);
  };

  const searcher = e => {
    setBuscar(e.target.value);
    setCurrentPage(1);
  };

  function handlerPrev() {
    setCurrentPage(currentPage - 1);
  }

  function handlerNext() {
    setCurrentPage(currentPage + 1);
  }

  let results = [];

  if (!buscar) {
    results = games;
  } else {
    results = games.filter(dato =>
      dato.name.toLowerCase().includes(buscar.toLowerCase())
    );
  }

  if (genre) {
    results = results.filter(game =>
      game.genres.find(g => g.name.toLowerCase() === genre.toLowerCase())
    );
  }

  const sorting = e => {
    e.preventDefault();
    if (order === 'asc') {
      results = results.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      setOrder('dsc');
    }
    if (order === 'dsc') {
      results = results.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
      setOrder('asc');
    }
  };

  const sorting2 = e => {
    e.preventDefault();
    if (order2 === 'asc') {
      results = results.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      setOrder2('dsc');
    }
    if (order2 === 'dsc') {
      results = results.sort((a, b) => (a.rating < b.rating ? 1 : -1));

      setOrder2('asc');
    }
  };

  const postperPage = 14;
  const lastPostIndex = currentPage * postperPage;
  const firstPostIndex = lastPostIndex - postperPage;
  const currentPost = results.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div id={style.controls}>
        <div>
          <label className={style.text} htmlFor="title">
            Search:{' '}
          </label>
          <input
            placeholder="Title..."
            type="text"
            value={buscar}
            onChange={searcher}
          ></input>
        </div>

        {/* <div>
                    <a className={style.bttn} type='button' href='/AddGame'>New Game</a>
                </div> */}

        <div>
          <label className={style.text}>Genres </label>

          <select name="filtro" onChange={handleSelect}>
            <option value="">All Genres</option>
            <option>Action</option>
            <option>Indie</option>
            <option>Adventure</option>
            <option>RPG</option>
            <option>Strategy</option>
            <option>Shooter</option>
            <option>Casual</option>
            <option>Simulation</option>
            <option>Puzzle</option>
            <option>Arcade</option>
            <option>Platformer</option>
            <option>Racing</option>
            <option>Massively Multiplayer</option>
            <option>Sports</option>
            <option>Fighting</option>
            <option>Family</option>
            <option>Board Games</option>
            <option>Educational</option>
            <option>Card</option>
          </select>
        </div>
        {/* <div>
                    <a className={style.bttn} type='button' href='/AddGame'>New Game</a>
                </div> */}

        <div>
          <a className={style.bttn} type="button" href="/AddGame">
            New Game
          </a>
          <button className={style.bttn} type="button" onClick={sorting}>
            Order by Name
          </button>
          <button className={style.bttn} type="button" onClick={sorting2}>
            Order by Rating
          </button>
        </div>
      </div>

      <div>
        <DashCardsGames gamedata={currentPost} />
        {results.length > 1 ? (
          <Pagination
            totalPosts={results.length}
            postPerPage={postperPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlerPrev={handlerPrev}
            handlerNext={handlerNext}
          />
        ) : undefined}
      </div>
    </div>
  );
}
