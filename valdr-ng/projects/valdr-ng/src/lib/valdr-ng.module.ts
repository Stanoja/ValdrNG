import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ValdrNgService } from './valdr-ng.service';
import { CommonModule } from '@angular/common';

// Validators
import { BaseValidatorFactory } from './validators/base-validator-factory';
import { RequiredValidatorFactory } from './validators/required-validator-factory';
import { SizeValidatorFactory } from './validators/size-validator-factory';
import { PatternValidatorFactory } from './validators/pattern-validator-factory';
import { EmailValidatorFactory } from './validators/email-validator-factory';
import { DecimalMaxFactory } from './validators/decimal-max-factory';
import { DecimalMinFactory } from './validators/decimal-min-factory';
import { MaxLengthValidatorFactory } from './validators/max-length-validator-factory';
import { MinLengthValidatorFactory } from './validators/min-length-validator-factory';
import { UrlValidatorFactory } from './validators/url-validator-factory';

function getFactoryProvider(clazz: Type<any>) {
  return { provide: BaseValidatorFactory, useClass: clazz, multi: true };
}

/**
 * ValdrNG module.
 */
@NgModule({
  providers: [
    ValdrNgService,
    getFactoryProvider(RequiredValidatorFactory),
    getFactoryProvider(SizeValidatorFactory),
    getFactoryProvider(PatternValidatorFactory),
    getFactoryProvider(EmailValidatorFactory),
    getFactoryProvider(DecimalMaxFactory),
    getFactoryProvider(DecimalMinFactory),
    getFactoryProvider(MaxLengthValidatorFactory),
    getFactoryProvider(MinLengthValidatorFactory),
    getFactoryProvider(UrlValidatorFactory),
  ],
  imports: [CommonModule],
})
export class ValdrNgModule {
  private static created = false;

  static forRoot(
    factories: Type<BaseValidatorFactory>[]
  ): ModuleWithProviders<ValdrNgModule> {
    if (ValdrNgModule.created) {
      throw new Error('ValdrNgModule already created!');
    }
    ValdrNgModule.created = true;

    return {
      ngModule: ValdrNgModule,
      providers: [...factories.map(getFactoryProvider)],
    };
  }
}
