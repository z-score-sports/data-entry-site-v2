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

    public notify(info:Object) {
        this.subscribers.forEach((sub) => {
            sub.update(info);
        })
        
    }
}

export {Publisher}