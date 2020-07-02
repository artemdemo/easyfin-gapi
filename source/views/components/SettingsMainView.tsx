import React from "react";

type TProps = {};
type TState = {};

class SettingsMainView extends React.PureComponent<TProps, TState> {
    render() {
        return (
            <>
                <a
                    className=""
                    href="https://docs.google.com/spreadsheets/d/14jrtwzsJzU8TeMfP-qU-HJ0xm6D_P3yshd_B2wYTuqQ/edit#gid=0"
                >
                    Open spreadsheet DB
                </a>
            </>
        );
    }
}

export default SettingsMainView;
