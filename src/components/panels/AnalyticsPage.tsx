import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GameStateContext } from "../../App";

function AnalyticsPage() {
    const context = useContext(GameStateContext);
    return <div>{JSON.stringify(context.actionStack.getStats())}</div>;
}

export default observer(AnalyticsPage);
