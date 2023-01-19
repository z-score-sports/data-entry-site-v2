import { observer } from "mobx-react-lite";

type keyProps = {
    keyValue: string;
};

const Key = ({ keyValue }: keyProps) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: ".3em",
                margin: ".15em",
                backgroundColor: "white",
                border: "1px solid gray",
                borderRadius: "5px",
                textAlign: "center",
                fontWeight: "bold",
                width: "1em",
                height: "1em",
                position: "relative",
            }}
        >
            {keyValue}
        </div>
    );
};

export default observer(Key);