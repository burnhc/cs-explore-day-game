import Typography from '@material-ui/core/Typography';
import LinkButton from './LinkButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function HomePage() {
  const classes = useStyles();
  const pretitle = "Enter the CS Explore Day";
  const title = "Escape Room";
  const subtitle = "Presented by ACM-W at the University of Washington"
  return (
    <div id={"welcome"}>
      <div id={"bannerImage"}>
      <img
        src={ process.env.PUBLIC_URL + "banner.png" }
        alt="banner"/>
      </div>
      <Grid container className={classes.root}>
      <Grid item xs={12}>
          <Typography variant={"h4"}>{pretitle}</Typography>
          <Typography className={classes.title}>{title}</Typography>
          <Typography variant={"h5"} className={classes.subtitle}>{subtitle}</Typography>
          <Typography variant={"h6"}>Choose your role:</Typography>
        <LinkButton
          className={classes.button}
          to={'/EscapeRoomPage'}
          color={'primary'}
          variant={'contained'}
          disableElevation>
            Escaper
        </LinkButton>
        <LinkButton
          className={classes.button}
          to={'/NavigationRoomPage'}
          color={'secondary'}
          variant={'contained'}
          disableElevation>
            Navigator
        </LinkButton>
          <Typography className={classes.requirements}>For best performance, use Firefox, Google Chrome, or Microsoft Edge.</Typography>
          <Typography className={classes.requirements}>Keep your screen at 100% zoom.</Typography>
      </Grid>
  </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
      margin: 0,
      flexGrow: 1,
      height: '100%',
      width: '100%',
  },
  title: {
      fontWeight: 700,
      margin: 0,
      color: '#32263b',
      fontSize: '6rem',
      paddingBottom: '15px',
  },
  subtitle: {
    paddingBottom: '55px',
  },
  requirements: {
    color: '#555',
  },
  button: {
    marginTop: '15px',
    marginRight: '15px',
    marginLeft: '5px',
    fontSize: '1rem',
    marginBottom: '20px',
},
}));

/*
const HomePage = () => {
    return (
      <div id={'welcome'}>
        <img
            id={'bannerImage'}
            src={ process.env.PUBLIC_URL + "banner.png" }
            alt="banner"/>
        <Typography variant="h4">
          Welcome to the
        </Typography>
        <Typography variant="h1">
        Escape Room
        </Typography>
        <Typography variant="h4">
        @ CS Explore Day
        </Typography>
        <LinkButton
          to={'/NavigationRoomPage'}
          color={'secondary'}
          variant={'outlined'}>
            Navigation Room
        </LinkButton>
        <LinkButton
          to={'/EscapeRoomPage'}
          color={'primary'}
          variant={'contained'}
          disableElevation>
            Escape Room
        </LinkButton>
      </div>
    );
}
*/

export default HomePage;