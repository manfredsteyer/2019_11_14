import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPassenger from './passenger.reducer';
import { PassengerComponent } from './passenger/passenger.component';

@NgModule({
  declarations: [PassengerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('passenger', fromPassenger.reducer)
  ],
  exports: [
    PassengerComponent
  ]
})
export class PassengerModule { }

