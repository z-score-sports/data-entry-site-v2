import { Subscriber } from "../Subscriber";

abstract class Publisher {

    public subscribers : Array<Subscriber> = new Array<Subscriber>();

    public constructor() {

    }
    
    public subscribe(newSubscriber:Subscriber) {
        this.subscribers.push(newSubscriber);
    }

    public unsubscribe(oldSubsriber:Subscriber) {
        let index :number = this.subscribers.indexOf(oldSubsriber);
        if(index === -1) {return;}
        this.subscribers.splice(index, 1);
    }

    abstract notify(oldImage:Object, newImage:Object) : void
}

type createDelete = "CREATE" | "DELETE"

export {Publisher}
export type {createDelete}