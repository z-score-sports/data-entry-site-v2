import { observer } from "mobx-react-lite";
import "../../App.css";

function LeftPanel() {
    return (
        <div className="lPanel">
            <img className="regionTooltip" src="halfcourt.jpg"></img>
            <div className="keytooltip">
                <div className="container playtooltip"></div>
                <div className="container actiontooltip">
                    <p className = "toolTipLbl">Q - Miss Shot</p>
                    <p className = "toolTipLbl">W - Made Shot</p>
                    <p className = "toolTipLbl">Z - Def Rebound</p>
                    <p className = "toolTipLbl">X - Off Rebound</p>
                    <p className = "toolTipLbl">A - Assist</p>
                    <p className = "toolTipLbl">D - Off Foul</p>
                    <p className = "toolTipLbl">F - Def Foul</p>
                    <p className = "toolTipLbl">T - Turnover</p>
                    <p className = "toolTipLbl">S - Steal</p>
                    <p className = "toolTipLbl">E - Free Throw</p>
                    <p className = "toolTipLbl">B - Block</p>
                    <p className = "toolTipLbl">, - Undo</p>
                    <p className = "toolTipLbl">. - Redo</p>
                    <p className = "toolTipLbl">/ - Change Pos</p>
                </div>
            </div>
            <div className="container actionlog"></div>
        </div>
    );
}

export default observer(LeftPanel);
