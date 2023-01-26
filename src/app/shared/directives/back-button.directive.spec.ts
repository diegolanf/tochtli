import { inject } from '@angular/core/testing';
import { NavigationService } from '@app/core/services/navigation.service';

import { BackButtonDirective } from './back-button.directive';

describe('BackButtonDirective', () => {
  it('should create an instance', inject([NavigationService], (navigation: NavigationService) => {
    const directive = new BackButtonDirective(navigation);
    expect(directive).toBeTruthy();
  }));
});
