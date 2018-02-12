import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [ MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule ],
    exports: [ MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule ]
})

export class MaterialModule { }
