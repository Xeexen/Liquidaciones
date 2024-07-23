import moment from "moment";
import type { Contract } from "./../models/models";

const minSalary: number = 460;
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

  calculateDecimocuarto() {
    let decimocuarto = 0;
    if (!this.contract.decimoCuarto) {
      decimocuarto = this.#getDecimoDiff() * (this.contract.lastPay / 12);
    } else {
      decimocuarto =
        ((this.contract.lastPay / 12) * moment(this.contract.lastDate).day()) /
        30;
    }
    return decimocuarto;
  }

  calculateDecimotercero() {
    let decimotercero = 0;
    if (!this.contract.decimoTercero) {
      decimotercero = this.#getDecimoDiff() * (minSalary / 12);
    } else {
      decimotercero =
        ((minSalary / 12) * moment(this.contract.lastDate).day()) / 30;
    }
    return decimotercero;
  }

  calculateHolyDays() {
    let holyDaysPayment = 0;
    if (this.contract.vacations > 0) {
      holyDaysPayment = (this.contract.lastPay / 2) * this.contract.vacations;
    }
    return holyDaysPayment;
  }

  #getDecimoDiff() {
    let lastDate = moment(this.contract.lastDate);
    let diffInMonth = 0;
    if (lastDate.month() > this.#getInitialMonth()) {
      diffInMonth = lastDate.diff(
        moment(new Date(`${lastDate.year()}-08-15`)),
        "month"
      );
    } else {
      diffInMonth = lastDate.diff(
        moment(new Date(`${lastDate.year() - 1}-08-15`)),
        "month"
      );
    }
    return diffInMonth;
  }

  #getInitialMonth() {
    switch (this.contract.region) {
      case "2":
        return 3;
      case "4":
        return 3;
      default:
        return 8;
    }
  }
}
