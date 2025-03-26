export class Transaction {
    id : number;
    emitterAccountId: string;
    receiverAccountId: string;
    amount: number;
    description: string;
    date: Date;

    constructor(id: number, emitterAccountId: string, receiverAccountId: string, amount: number, description: string, date: Date) {
        this.id = id;
        this.emitterAccountId = emitterAccountId;
        this.receiverAccountId = receiverAccountId;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    getTransactionId() {
        return this.id;
    }

    getTransactionDetails() {
        return {
            id: this.id,
            emitterAccountId: this.emitterAccountId,
            receiverAccountId: this.receiverAccountId,
            amount: this.amount,
            description: this.description,
            date: this.date
        };
    }
}