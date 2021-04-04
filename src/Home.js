import React, {Component} from 'react';
import Page1 from "./Page1";
import Prompt from "./Prompt";
import Note from "./Note";


const clickables = new Map([
    ['door', { x1: 141, y1: 238, x2: 305, y2: 560 }],
    ['computer', { x1: 0.4558333333, y1: 0.36625, x2: 0.6291666667, y2: 0.52875 }],
    ['note', { x1: 0.74, y1: 0.39875, x2: 0.795, y2: 0.4775 }]
]);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: null,
            image: null,

            // clickables
            openComputer: false,
            openNote: false,

            // solved puzzles
            unlockedComputer: false
        };

        this.image = React.createRef();
    }

    componentDidMount() {
        this.fetchAndSaveImage();
    }

    componentDidUpdate() {
    }

    fetchAndSaveImage() {
        let background = new Image();
        background.src = "./room1.png";

        background.onload = () => {
            this.setState({
                backgroundImage: background,
            })
        };
    }

    handleClick(e) {
        const rect = this.image.current.getBoundingClientRect();
        console.log({x: e.clientX - rect.left, y: e.clientY - rect.top});
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    hasClickedObject(click) {
        const rect = this.image.current.getBoundingClientRect();
        for (let [key, coord] of clickables.entries()) {
            if (click.x >= rect.width * coord.x1 && click.x <= rect.width * coord.x2
                && click.y >= rect.height * coord.y1 && click.y <= rect.height * coord.y2) {
                return key;
            }
        }

        return null;
    }

    handleClickOpen = (e) => {
        const objectClicked = this.hasClickedObject(this.handleClick(e));
        if (objectClicked != null) {
            this.handleToggleDialog(objectClicked);
        }
    };

    handleToggleDialog(object) {
        switch (object) {
            case 'computer':
                console.log("clicked computer");
                this.setState({
                    openComputer: !this.state.openComputer
                })
                break;
            case 'note':
                console.log("clicked note");
                this.setState({
                    openNote: !this.state.openNote
                })
                break;
            case 'door':
                console.log("clicked door");
                break;
            default:
                break;
        }
    }

    handlePuzzleSolved(puzzle) {
        switch (puzzle) {
            case 'unlockedComputer':
                this.setState({
                    unlockedComputer: true
                })
                console.log("unlockedComputer");
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <img
                    ref={this.image}
                    id={'backgroundImage'}
                    src={ process.env.PUBLIC_URL + "room1.png" }
                    alt="Room1"
                    onClick={(e) => this.handleClickOpen(e)}/>
                <Prompt
                    open={this.state.openComputer}
                    handleClose={() => this.handleToggleDialog('computer')}
                    title={this.state.unlockedComputer ?
                        "The computer is unlocked, but it looks a bit strange." :
                        "Seems like the computer is locked."}
                    componentToOpen={
                        <Page1
                            puzzle1={() => this.handlePuzzleSolved('unlockedComputer')}
                            puzzle1Solved={this.state.unlockedComputer}
                        />}/>
                <Prompt
                    open={this.state.openNote}
                    maxWidth={'xs'}
                    handleClose={() => this.handleToggleDialog('note')}
                    title={"A note is taped to the wall."}
                    componentToOpen={<Note/>}/>
            </div>
        )
    }
}

export default Home;