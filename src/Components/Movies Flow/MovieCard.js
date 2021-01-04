import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FireBaseApi from '../../Api Utils/FireBaseApi';
import { MoviesContext } from '../../Context/MoviesContext';

const GetGenresText = (genresArr) => {
  if (genresArr && genresArr.length > 0) {
    return genresArr.join();
  } else {
    return 'Genres data not available ';
  }
};

const useStyles = makeStyles({
  root: {
    width: 345,
    //maxWidth: 345,
    //minWidth: 345,
    height:'auto',
    marginBottom: 20,
    backgroundColor: '#b5ebd9',
  },
  media: {
    height: 10,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
    objectFit: 'fill',
  },
});

const MovieCardComp = ({ data, subscribers, canDeleteMovieCBF, canEditMovieCBF }) => {
  const classes = useStyles();
  let history = useHistory();
  const { setUpdateMoviesList, setMovieToEdit } = useContext(MoviesContext);

  const deleteMovie = async () => {
    await FireBaseApi.deleteDocument('movies', data.id, true);
    setTimeout(() => {
      setUpdateMoviesList(true);
    }, 200);
  };

  const editMovie = () => {
    setMovieToEdit(data);
    history.push('/main/movies/edit');
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.image}
          title="Movie Image"
        />
      </CardActionArea>
      <CardContent>
        <Paper>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {data.name}
          </Typography>
        </Paper>
        <Typography variant="subtitle2" color="textPrimary" component="p" />
        Genres:
        <ul>
          {data.genres.map((g, index) => {
            return <li key={index}>{g}</li>;
          })}
        </ul>

        <Typography variant="subtitle2" color="textPrimary" component="p">
          Premiered: {data.premiered?.toString()}
        </Typography>

        <br/>
        Subscribers:
        <ul>
          {subscribers && subscribers.length > 0 && subscribers.map((s, index) => {
            return <li key={index}>{s.subscriberName} , {s.subscriptionDate.toDate().toLocaleDateString()}</li>;
          })}
        </ul>

      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={editMovie}
          disabled={!canEditMovieCBF()}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={deleteMovie}
          color="secondary"
          disabled={!canDeleteMovieCBF()}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCardComp;
