import { InjectionToken, Type, Provider, forwardRef } from '@angular/core';

export function COMMON_COMPONENT_PROVIDER_FACTORY(
  injectionToken: InjectionToken<unknown>,
  component: Type<unknown>,
): Provider {
  return {
    provide: injectionToken,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
