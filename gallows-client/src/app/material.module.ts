import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [ MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule ],
    exports: [ MatToolbarModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatListModule, MatCardModule ]
})

export class MaterialModule { }
