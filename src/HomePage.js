import Typography from '@material-ui/core/Typography';
import LinkButton from './LinkButton';

const HomePage = () => {
    return (
      <div id={'welcome'}>
        <Typography variant="h2">
        Welcome to CS Explore Day!
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

export default HomePage;