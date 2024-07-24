import moment from "moment";
import type { CalculateResult, Contract } from "./../models/models";
import { isLabeledStatement } from "typescript";

const minSalary: number = 460;
export class Calculator {
  contract: Contract;
  constructor(contract: Contract) {
    this.contract = contract;
  }

  getResult(): CalculateResult[] {
    let result: CalculateResult[] = [];
    result.push({
      label: "Decimo cuarto",
      value: this.#calculateDecimocuarto(),
    });
    result.push({
      label: "Decimo tercero",
      value: this.#calculateDecimotercero(),
    });
    result.push({
      label: "Desahucio",
      value: this.#calculateDesahucio(),
    });
    return result;
  }

  #calculateDecimocuarto() {
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

  #calculateDecimotercero() {
    let decimotercero = 0;
    if (!this.contract.decimoTercero) {
      decimotercero = this.#getDecimoDiff() * (minSalary / 12);
    } else {
      decimotercero =
        ((minSalary / 12) * moment(this.contract.lastDate).day()) / 30;
    }
    return decimotercero;
  }

  #calculateHolyDays() {
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

  #calculateDesahucio() {
    let result = 0;
    let contractType = this.contract.contractType;
    this.contract.lastPay // salario
    switch (contractType.code) {
      case "1":
        result = this.contract.lastPay * 0.25 * this.#getDesahucioDiff();
        break;
      case "2":
        result = this.contract.lastPay * 0.25 * this.#getDesahucioDiff();
        break;
      case "7":
        result = this.contract.lastPay * 0.25 * this.#getDesahucioDiff();
        break;
      case "8":
        result = this.contract.lastPay * 0.25 * this.#getDesahucioDiff();
      break;
      case "9":
        result = this.contract.lastPay * 0.25 * this.#getDesahucioDiff();
      break;
      default:
        break;
    }
    return result;
  }

  #getDesahucioDiff() {
    let diffInYears = 0;
    diffInYears = moment(this.contract.lastDate).diff(
      moment(this.contract.firstDate),
      "years"
    );
    return diffInYears;
  }
}
