import * as React from "react";

import "../assets/scss/shop-center.scss";
const logo = require("../assets/img/react_logo.svg");
interface State {
    shoppingList: Array<ShopItem>;
}

export default class ShopCenter extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {shoppingList: []};
    }

    loadInventoryList = () => {
        let listArray: Array<ShopItem> = [];
        Inventory.forEach((obj: ShopItem) => {
            let item = new ShopItem(obj);
            listArray = [...listArray, item];
        });
        this.setState({shoppingList: listArray});
    }

    displayList = (list: Array<ShopItem>) => {
        return list.map(item => {
            return (
                <div key={item.name}>{item.name}</div>
            );
        });
    }

    render() {
        const {shoppingList} = this.state;
        if (shoppingList.length <= 0) { this.loadInventoryList(); }
        return (
            <div className="shopBody">
                <div className="shopHeaderBar">
                    <div>Home | Support | Contact | Account</div>
                </div>
                <div className="shopModalBody">
                    {this.displayList(shoppingList)}
                </div>
            </div>
        );
    }
}

export class ShopItem {
    name: string;
    imgPath: string;
    price: number;
    sale: boolean;

    constructor(data: ShopItem) {
        this.name = data.name;
        this.imgPath = data.imgPath;
        this.price = data.price;
        this.sale = data.sale;
    }
}

export const Inventory = [{
    name: "Shoes",
    imgPath: logo,
    price: 5.00,
    sale: false
}, {
    name: "Shirt",
    imgPath: logo,
    price: 10.00,
    sale: true
}];