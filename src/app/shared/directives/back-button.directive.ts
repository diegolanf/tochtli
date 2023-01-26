import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Directive({
  selector: '[appBackButton]',
  standalone: true,
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  public onClick(): void {
    this.navigation.back();
  }
}
