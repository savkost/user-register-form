import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
  standalone: false
})
export class BasicInputComponent  implements OnInit {

  // INPUTS
  @Input() titleOfInput: string | undefined;
  @Input() placeholderInput: string | undefined;
  @Input() initialContents: string | undefined;
  @Input() requiredInput: boolean | undefined;
  @Input() isEmailInput: boolean | undefined;
  @Input() readOnlyInput: boolean = false;
  @Input() presentTitle: boolean = true;

  // OUTPUTS
  @Output() contentsInputWritter: EventEmitter<string> = new EventEmitter();
  @Output() emitEnterPressedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public helper: HelperService) { }

  ngOnInit() {}

  /**
   * This method emits content back to the parent element
   */
  emitInputContent(){
    this.contentsInputWritter.emit(this.initialContents);
  }

  /**
   * This method emits the boolean value indicating whether the enter key was pressed
   */
  emitEnterPressed(){
    this.emitEnterPressedEvent.emit(true);
  }

  /**
   * This method checks the validity of the email pattern
   */
  checkEmailPattern(){
    const emailValueInputContents = this.initialContents;

    // Test the contents against the regular expression
    if (this.helper.checkNecessaryCases(emailValueInputContents)){
      if (!RegExp('^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$').test(emailValueInputContents)){
        return true;
      }
    }

    return false;
  }
}
