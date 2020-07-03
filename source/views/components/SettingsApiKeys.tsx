import React from "react";
import {getInputClass} from "../../styles/elements";

type TProps = {};
type TState = {};

class SettingsApiKeys extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <div className="max-w-md">
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            className={getInputClass()}
                            placeholder="API key"
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        &nbsp;
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <input
                            type="text"
                            className={getInputClass()}
                            placeholder="Client ID"
                        />
                    </div>
                    <div className="w-1/2 px-2">
                        &nbsp;
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsApiKeys;
