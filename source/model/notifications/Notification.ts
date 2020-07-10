import { v4 as uuidv4 } from "uuid";

type TNotificationProps = {
    msg: string;
};

class Notification {
    readonly id: string;
    readonly msg: string;

    constructor(props: TNotificationProps) {
        this.id = uuidv4();
        this.msg = props.msg;
    }
}

export default Notification;
