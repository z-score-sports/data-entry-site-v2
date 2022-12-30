import { makeAutoObservable } from "mobx";
import { region } from "./actions/Shot";

interface PromptInput {
    inputTitle: string;
    handleInput(key: string): void;
    getValue(): any;
    setNull(): void;
}

class NumberPromptInput implements PromptInput {
    inputTitle: string;
    curNum: number = 0;
    constructor(inputTitle: string) {
        makeAutoObservable(this);
        this.inputTitle = inputTitle;
    }

    handleInput(key: string): void {
        if (key === "BACKSPACE") {
            this.curNum = Math.floor(this.curNum / 10);
        } else if (!isNaN(+key)) {
            let digit: number = parseInt(key);
            if (!this.curNum) {
                this.curNum = digit;
            } else {
                this.curNum = this.curNum * 10 + digit;
            }
        }
    }

    getValue(): number {
        return this.curNum;
    }

    setNull() {
        this.curNum = null;
    }
}

class RegionPromptInput implements PromptInput {
    inputTitle: string;
    curRegion: region;

    constructor(inputTitle: string) {
        makeAutoObservable(this);
        this.inputTitle = inputTitle;
    }

    handleInput(key: string): void {
        if (key === "BACKSPACE") {
            this.curRegion = null;
        } else if (!isNaN(+key) && parseInt(key) > 0) {
            let digit = parseInt(key) as region;
            this.curRegion = digit;
        }
    }

    getValue(): region {
        return this.curRegion;
    }

    setNull(): void {
        this.curRegion = null;
    }
}

class MakeMissPromptInput implements PromptInput {
    inputTitle: string;
    made: boolean = null;
    constructor(inputTitle: string) {
        makeAutoObservable(this);
        this.inputTitle = inputTitle;
    }

    handleInput(key: string) {
        if (key === "BACKSPACE") {
            this.made = null;
        } else if (key === "M") {
            this.made = true;
        } else if (key === "N") {
            this.made = false;
        }
    }

    getValue(): boolean {
        return this.made;
    }

    setNull() {
        this.made = null;
    }
}

class Prompt {
    promptingKey: string;
    promptTitle: string;
    inputs: Array<PromptInput>;
    inputIndex: number = 0;

    constructor(
        promptingKey: string,
        promptTitle: string,
        inputs: Array<PromptInput>
    ) {
        makeAutoObservable(this);
        this.promptingKey = promptingKey;
        this.promptTitle = promptTitle;
        this.inputs = inputs;
    }

    get index() {
        return this.inputIndex % this.inputs.length;
    }

    handleInput(key: string) {
        if (key === "ENTER") {
            return this.handleEnter();
        } else if (key === "ARROWLEFT") {
            //this.inputs[this.index].setNull();
            this.inputIndex = Math.max(this.inputIndex - 1, 0);
        } else {
            this.inputs[this.index].handleInput(key);
        }
        return false;
    }

    handleEnter() {
        if (this.index + 1 < this.inputs.length) {
            this.inputIndex += 1;
            return false;
        } else {
            return true;
        }
    }
}

export type { PromptInput };
export { Prompt, NumberPromptInput, RegionPromptInput, MakeMissPromptInput };
