import * as React from "react";
import "./../assets/scss/App.scss";

type State = {
    pwdInput: string
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {pwdInput: ''}
    };

    displayAccount = () => {

    };
    render() {
        return (
            <div className="app">
                <h1>Create a Simple Wallet!</h1>
                <div className="pwdInput">
                    <div>
                        <div>Password:</div>
                    </div>
                    <div>
                        <input onChange={(event) => this.setState({pwdInput: event.target.value})} placeholder={"This will be used to access your account"} type="search"/>
                    </div>
                </div>
                <button onClick={() => console.log(this.state.pwdInput)} type="button" className={"createWallet"}>CREATE</button>
                {/*{this.displayAccount()}*/}
            </div>
        );
    }
}
