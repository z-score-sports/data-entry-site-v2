import { observer } from "mobx-react-lite";
import "../../App.css";
import LogView from "../elements/LogView";

function LeftPanel() {
    return (
        <div className="lPanel">
            <img className="regionTooltip" src="halfcourt.jpg"></img>
            <div className="keytooltip">
                <div className="container playtooltip"></div>
                <div className="container actiontooltip"></div>
            </div>
            <div className="container actionlog">
                <LogView />
            </div>
        </div>
    );
}

export default observer(LeftPanel);
