import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  // Local and global variables
  tracelog = '1'; // Checks if we console.log or not

  constructor() { }

  /**
   * This method is console log handler
   * @param data
   * @param data2
   */
  consoleHandler(data: any, data2?: any){
    if(this.tracelog !== '0'){
      console.log(data);
      if(data2 !== undefined){
        console.log(data2);
      }
    }
  }

  /**
   * This method checks if the input parameter is null or undefined
   * @param inputGiven
   */
  checkUndefinedNull(inputGiven: any){
    return !(inputGiven === undefined || inputGiven === null);
  }

  /**
   * This method checks if the input parameter is null or undefined or empty
   * @param inputGiven
   */
  checkNecessaryCases(inputGiven: any){
    return !(inputGiven === undefined || inputGiven === null || inputGiven === '');
  }
}
