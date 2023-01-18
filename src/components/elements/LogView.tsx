import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function LogView() {
    const context = useContext(GameStateContext);

    return (
        <div className="logview">
            <div className="logviewtitle">Action Log</div>
            <List dense={true} className="logviewlist">
                {context.actionStack
                    .lastNActions(5)
                    .map((actionRecord, index) => (
                        <ListItem className="logviewitem ">
                            <ListItemText
                                primary={
                                    actionRecord.index +
                                    ". " +
                                    actionRecord.action.actionString
                                }
                            />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

export default observer(LogView);
