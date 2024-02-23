import { InjectionToken, Type, Provider, forwardRef } from '@angular/core';

export function COMMON_COMPONENT_PROVIDER_FACTORY(
  injectionToken: InjectionToken<any>,
  component: Type<any>
): Provider {
  return {
    provide: injectionToken,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
