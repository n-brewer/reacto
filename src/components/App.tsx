import * as React from "react";
import "./../assets/scss/App.scss";
import {
    Account, AccountHttp, Address, MosaicHttp, MosaicService, NamespaceHttp, NetworkType, Password,
    SimpleWallet,
} from "nem2-sdk";
import MovieMadness from "./movie-madness";
import ShopCenter from "./shop-center";

type State = {
    account1: Account;
    account2: Account;
    selectedAccount: Account;
    personList: Person[];
};

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {account1: null, account2: null, selectedAccount: null, personList: []};
    }

    createNewAccount = () => {
        const privateKey = !this.state.account1 ? "1535B144776E65C10770938E6392880B5926B943D537D645D0541D80D5C9AAE6" : "9531BDCA4DE86E691105F5A3F3F78210D00680CE2C4A447BE4E3626805E80199";
        const account = Account.createFromPrivateKey(privateKey, NetworkType.MIJIN_TEST);
        this.state.account1 ? this.setState({account2: account}) : this.setState({account1: account});
    }

    loginToAccountWithPrivateKey = () => {
        const el = document.getElementById("pwdInput") as HTMLInputElement;
        let newPerson = new Person(el.value, el.defaultValue);
        this.state.personList.push(newPerson);
        this.setState({personList: this.state.personList});
    }

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
    }

    getAccountInfo = (address: string) => {
        const url = "http://api.beta.catapult.mijin.io:3000";
        const accountHttp = new AccountHttp(url);
        const mosaicHttp = new MosaicHttp(url);
        const namespaceHttp = new NamespaceHttp(url);
        const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);
        mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress(address))
            .flatMap((mos) => mos)
            .subscribe(mosaic => console.log(mosaic.relativeAmount() + "," + mosaic.fullName(), mosaic.amount),
                err => console.log(err));
    }
    render() {
        const {selectedAccount, account2, account1, personList} = this.state;
        if (!account2) {return <ShopCenter/>;}
        if (!account1) {return <MovieMadness/>;}
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
                                   defaultValue={"Blabs"}
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
                        onClick={() => this.setState({selectedAccount: account1})}>User 1 Account: {selectedAccount === account1 && "Selected"}</span>
                    <p>Public Address: {account1 && account1.address.pretty()}</p>
                    <p>Private Key: {account1 && account1.privateKey}</p>
                    <span
                        onClick={() => this.setState({selectedAccount: account2})}>User 2 Account: {selectedAccount === account2 && "Selected"}</span>
                    <p>PublicAddress: {account2 && account2.address.pretty()}</p>
                    <p>Private Key: {account2 && account2.privateKey}</p>
                </div>
                {selectedAccount && <button type="button" className={"createWallet"}
                                            onClick={() => this.loginToAccountWithPrivateKey()}>Add
                    Person</button>}
                <button type="button" className={"createWallet"}
                        onClick={() => this.getAccountInfo(selectedAccount.address.pretty())}>Account Info
                </button>
                <div>
                    <ToDoApp list={personList}/>
                </div>
            </div>
        );
    }
}

type ListProps = {
    list: Person[];
};

export class ToDoApp extends React.Component<ListProps, {}> {

    handleClick = (event: any) => {
        event.currentTarget.innerHTML = "changed";
    }
    listPeople = (list: Person[]) => {
        return list.map(dude => {
            return <div
                onClick={(blabs) => this.handleClick(blabs)}>{`${dude.firstName} ${dude.lastName} -- a cool person`}</div>;
        });
    }
    render() {
        const {list} = this.props;
        return (
            <div>
                {this.listPeople(list)}
            </div>
        );
    }
}

class Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
