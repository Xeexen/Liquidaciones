import moment from "moment";
import type { Contract } from "./../models/models";

export class Calculator {
  contract: Contract;
  constructor(contract: Contract) {
    this.contract = contract;
  }

  getTime() {
    this.contract.firstDate;
    this.contract.lastDate;
    let diffInDate = moment(this.contract.lastDate).diff(
      moment(this.contract.firstDate),
      "days"
    );
  }
}
