import * as React from "react";
import "./../assets/scss/App.scss";
import {
    Account, AccountHttp, Address, MosaicHttp, MosaicService, NamespaceHttp, NetworkType, Password,
    SimpleWallet
} from "nem2-sdk";

type State = {
    account1: Account;
    account2: Account;
    selectedAccount: Account;
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {account1: null, account2: null, selectedAccount: null};
    };

    createNewAccount = () => {
        const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
        this.state.account1 ? this.setState({account2: account}) : this.setState({account1: account});
    };

    loginToAccountWithPrivateKey = (privateKey: string) => {
        const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
        console.log(account);
    };

    createSimpleWallet = () => {
        const pwd = document.getElementById("pwdInput") as HTMLInputElement;
        const password = new Password(pwd.value);
        const wallet = SimpleWallet.create("User1-Wallet", password, NetworkType.MIJIN_TEST);
        const account = wallet.open(password);
        if (!this.state.account1) {
            this.setState({account1: account});
            return;
        }
        if (!this.state.account2) {
            this.setState({account2: account});
            return;
        }
        else {
            console.log(account);
        }
    };

    getAccountInfo = (address: Address) => {
        const url = 'http://localhost:3000';
        const accountHttp = new AccountHttp(url);
        const mosaicHttp = new MosaicHttp(url);
        const namespaceHttp = new NamespaceHttp(url);
        const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);
        console.log(mosaicService);
        mosaicService.mosaicsAmountViewFromAddress(address).subscribe(info => console.log(info), error => console.log(error));
    };

    render() {
        return (
            <div className="app">
                <h1>Create Account</h1>
                <div className="pwdInput">
                    <div>
                        <div>Password:</div>
                    </div>
                    <div>
                        <div>
                            <input id={"pwdInput"} placeholder={"This will be used to access your account"}
                                   type="search"/>
                            <button className={"createWallet"} type="button"
                                    onClick={() => this.createSimpleWallet()}>Create Wallet
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={() => this.createNewAccount()} type="button" className={"createWallet"}>CREATE ACCT
                </button>
                <div className={"accountInfo"}>
                    <span
                        onClick={() => this.setState({selectedAccount: this.state.account1})}>User 1 Account: {this.state.selectedAccount === this.state.account1 && "Selected"}</span>
                    <p>Public Address: {this.state.account1 && this.state.account1.address.pretty()}</p>
                    <p>Private Key: {this.state.account1 && this.state.account1.privateKey}</p>
                    <span
                        onClick={() => this.setState({selectedAccount: this.state.account2})}>User 2 Account: {this.state.selectedAccount === this.state.account2 && "Selected"}</span>
                    <p>PublicAddress: {this.state.account2 && this.state.account2.address.pretty()}</p>
                    <p>Private Key: {this.state.account2 && this.state.account2.privateKey}</p>
                </div>
                {this.state.selectedAccount && <button type="button" className={"createWallet"}
                                                       onClick={() => this.loginToAccountWithPrivateKey(this.state.selectedAccount.privateKey)}>Login</button>}
                <button type="button" className={"createWallet"}
                        onClick={() => this.getAccountInfo(this.state.selectedAccount.address)}>Account Info
                </button>
            </div>
        );
    }
}
