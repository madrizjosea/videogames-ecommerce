import { Link } from 'react-router-dom';
import './VideogameCard.css';
import Rating from '@mui/material/Rating';

export default function Videogamecard({
  name,
  image,
  rating,
  genres,
  id,
  canReview,
}) {
  return (
    <div className="card">
      <div className="card__cointainerimagen">
        <Link to={`/Details/${id}`}>
          <img className="imagen" src={image} alt={name}></img>
        </Link>
      </div>
      <div className="card__body">
        <p className="card__name">Name: {name}</p>
        <p className="card__rating">
          <Rating
            name="half-rating-read"
            value={rating}
            precision={0.5}
            readOnly
          />
        </p>
        {genres ? (
          <div>
            <p className="card__genres">Genres:</p>
            {genres.map((g, i) => (
              <p key={i}>{g.name}</p>
            ))}
          </div>
        ) : null}
        {canReview ? <Link to={`/Details/${id}`}>Review game</Link> : null}
      </div>
    </div>
  );
}
