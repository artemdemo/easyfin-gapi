import React from "react";
import classnames from "classnames";

type TProps = {
    className: string;
    children: any;
};
type TState = {};

const TabsContainer = (props: TProps) => (
    <div className={classnames('flex', props.className)}>
        {props.children}
    </div>
);

export default TabsContainer;
