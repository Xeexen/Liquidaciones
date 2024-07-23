export interface ContractsType {
  code: string;
  name: string;
  rate: number;
}

export interface Contract {
  region: string;
  firstDate: string;
  lastDate: string;
  contractType: ContractsType;
  lastPay: number;
  vacations: number;
  decimoTercero: false;
  decimoCuarto: false;
}

export interface CalculateResult {
  label: string;
  value: number;
}
