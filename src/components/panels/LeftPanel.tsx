import { observer } from "mobx-react-lite";
import "../../App.css";
import Key from "../elements/Key";
import LogView from "../elements/LogView";

type markingInput = {
    color: string;
    key: string;
    description: string;
};

const markingData: Array<markingInput> = [
    {
        color: "red",
        key: "P",
        description: "Pick & Roll",
    },
    {
        color: "orange",
        key: "O",
        description: "Pick & Pop",
    },
    {
        color: "yellow",
        key: "I",
        description: "Drive & Kick",
    },
    {
        color: "green",
        key: "L",
        description: "Isolation",
    },
];

type keyProps = {
    keyValue: string;
};



function LeftPanel() {
    const generateMarkingComponents = (mData: Array<markingInput>) => {
        return mData.map((value, index) => {
            return (
                <div
                    key={index}
                    style={{
                        textAlign: "left",
                        paddingLeft: "1em",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        gap: "0.5em",
                    }}
                >
                    <div
                        style={{
                            width: "1em",
                            height: "1em",
                            backgroundColor: value.color,
                            borderRadius: "50%",
                            display: "inline-block",
                        }}
                    />
                    <Key keyValue={value.key} />
                    {value.description}
                </div>
            );
        });
    };
    return (
        <div className="lPanel">
            <img className="regionTooltip" src="halfcourt.jpg"></img>
            <div className="keytooltip">
                <div className="container playtooltip">
                    {generateMarkingComponents(markingData)}
                </div>
                <div className="container actiontooltip">
                    <div className="toolTipLbl">
                        <Key keyValue="," /> Undo
                    </div>
                    <p className="toolTipLbl">
                        <Key keyValue="." /> Redo
                    </p>
                    <p className="toolTipLbl">
                        <Key keyValue="/" /> Change Pos
                    </p>
                </div>
            </div>
            <div className="container actionlog">
                <LogView />
            </div>
        </div>
    );
}

export default observer(LeftPanel);
