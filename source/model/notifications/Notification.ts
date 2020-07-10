import { v4 as uuidv4 } from "uuid";

export enum ENotificationAppearance {
    SUCCESS = 'success',
    ERROR = 'error',
}

type TNotificationProps = {
    msg: string;
    appearance?: ENotificationAppearance;
};

type TOnDeleteCb = (self: Notification) => void;

const DELETE_TIMEOUT = 5000;

class Notification {
    // `id` is used as "key" in list
    readonly id: string;
    readonly msg: string;
    readonly timeoutToken: number;
    readonly appearance: ENotificationAppearance;
    private readonly onDeleteCbs: Set<TOnDeleteCb>;

    constructor(props: TNotificationProps) {
        this.id = uuidv4();
        this.msg = props.msg;
        this.appearance = props.appearance || ENotificationAppearance.SUCCESS;
        this.onDeleteCbs = new Set<TOnDeleteCb>();

        this.timeoutToken = setTimeout(() => {
            this.onDeleteCbs.forEach((cb) => {
                cb(this);
            });
        }, DELETE_TIMEOUT);
    }

    /**
     * Add callback, that will be called when there is time to delete notification (obviously)
     */
    onDelete(cb: TOnDeleteCb) {
        this.onDeleteCbs.add(cb);
    }

    beforeDelete() {
        clearTimeout(this.timeoutToken);
        this.onDeleteCbs.clear();
    }
}

export default Notification;
