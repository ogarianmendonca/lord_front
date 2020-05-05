import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from 'app/services/auth.service';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AuthComponent],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
