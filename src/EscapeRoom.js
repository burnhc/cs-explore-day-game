import React, {Component} from 'react';
import TerminalPuzzle from "./TerminalPuzzle";
import PuzzlePrompt from "./PuzzlePrompt";
import NotePuzzle from "./NotePuzzle";
import GraphPuzzle from "./GraphPuzzle";

const clickables = new Map([
    ['door', { x1: 141, y1: 238, x2: 305, y2: 560 }],
    ['computer', { x1: 0.4558333333, y1: 0.36625, x2: 0.6291666667, y2: 0.52875 }],
    ['graph', {x1: 0.305 , y1: 0.3025, x2: 0.429166666667, y2: 0.42 }],
    ['note', { x1: 0.74, y1: 0.39875, x2: 0.795, y2: 0.4775 }]
]);

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: null,

            // clickables
            openComputer: false,
            openNote: false,
            openGraph: false,

            // storing state of solved puzzles
            unlockedComputer: false,
            solvedGraph: false,
            solvedGraphEdges: new Set([]),
            solvedGraphDots: new Set([])
        };

        this.PuzzlePrompt = React.createRef();
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
                backgroundImage: background
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
            if (click.x >= rect.width * coord.x1
                && click.x <= rect.width * coord.x2
                && click.y >= rect.height * coord.y1
                && click.y <= rect.height * coord.y2) {
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
            case 'instructions':
                this.setState({
                    openInstructions: !this.state.openInstructions
                })
                break;
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
            case 'graph':
                console.log("clicked graph");
                this.setState({
                    openGraph: !this.state.openGraph
                })
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
            case 'solvedGraph':
                this.setState({
                    solvedGraph: true
                })
                console.log("solved graph");
                break;
            default:
                break;
        }
    }

    storeGraphState(vertexSet, edgeSet) {
        this.setState({
            solvedGraphDots: vertexSet,
            solvedGraphEdges: edgeSet
        }, () => console.log(this.state.solvedGraphEdges));
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
                <PuzzlePrompt
                    open={this.state.openComputer}
                    handleClose={() => this.handleToggleDialog('computer')}
                    title={this.state.unlockedComputer ?
                        "The computer is unlocked, but it looks a bit strange." :
                        "Seems like the computer is locked."}
                    componentToOpen={
                        <TerminalPuzzle
                            puzzle1={() => this.handlePuzzleSolved('unlockedComputer')}
                            puzzle1Solved={this.state.unlockedComputer}
                        />}/>
                <PuzzlePrompt
                    open={this.state.openNote}
                    maxWidth={'xs'}
                    handleClose={() => this.handleToggleDialog('note')}
                    title={"A note is taped to the wall."}
                    componentToOpen={<NotePuzzle/>}/>
                <PuzzlePrompt
                    ref={this.PuzzlePrompt}
                    open={this.state.openGraph}
                    handleClose={() => this.handleToggleDialog('graph')}
                    title={"Not your average Connect the Dots..."}
                    componentToOpen={
                        <GraphPuzzle
                            puzzle={() => this.handlePuzzleSolved('solvedGraph')}
                            puzzleSolved={ this.state.solvedGraph }
                            solvedGraphEdges={ this.state.solvedGraphEdges }
                            solvedGraphDots={ this.state.solvedGraphDots }
                            storeGraphState={ (v,e) => this.storeGraphState(v,e) }
                        />}/>
            </div>
        )
    }
}

export default HomePage;