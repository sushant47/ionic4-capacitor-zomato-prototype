import { Injectable } from '@angular/core';
import { BMI } from './models/bmi.model';

@Injectable({
  providedIn: 'root'
})
export class BmiService {

  BMI: BMI = {
    bmiCalculated: 1,
    bmiCategory: ''
  };
  constructor() { }

  public calculateBMI(weight: number, height: number) {
    return this.getBMICategory(weight / (height * height));
  }

  private getBMICategory(calculatedBMI: number) {
    this.BMI['bmiCalculated'] = +calculatedBMI.toFixed(2);
    if (calculatedBMI < 15) {
      this.BMI.bmiCategory = 'Very severely underweight';
    } else if (calculatedBMI >= 15 && calculatedBMI < 16) {
      this.BMI.bmiCategory = 'Severely underweight';
    } else if (calculatedBMI >= 16 && calculatedBMI < 18.5) {
      this.BMI.bmiCategory = 'Underweight';
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      this.BMI.bmiCategory = 'Normal (healthy weight)';
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      this.BMI.bmiCategory = 'Overweight';
    } else if (calculatedBMI >= 30 && calculatedBMI < 35) {
      this.BMI.bmiCategory = 'Moderately obese';
    } else if (calculatedBMI >= 35 && calculatedBMI < 40) {
      this.BMI.bmiCategory = 'Severely obese';
    } else if (calculatedBMI > 40) {
      this.BMI.bmiCategory = 'Very severely obese';
    }
    return this.BMI;
  }
}
