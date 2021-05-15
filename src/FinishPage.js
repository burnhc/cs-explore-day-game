import Typography from '@material-ui/core/Typography';
import LinkButton from './LinkButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function FinishPage() {
  const classes = useStyles();
  const pretitle = "Your team has managed to escape."
  const title = "Well done! 🎉";
  const subtitle = "(and Dr. Python is not happy)"

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
          <Typography className={classes.requirements}>Thanks for participating! We hope you enjoyed the activity.</Typography>
        <LinkButton
          className={classes.button}
          to={'/'}
          color={'secondary'}
          variant={'contained'}
          disableElevation={true}>
            Return home
        </LinkButton>
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
    paddingBottom: '40px',
  },
  requirements: {
    color: '#555',
  },
  button: {
    marginTop: '40px',
    marginRight: '15px',
    marginLeft: '5px',
    fontSize: '1rem',
    marginBottom: '40px',
  }
}));

export default FinishPage;