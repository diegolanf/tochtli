import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Directive({
  selector: '[appBackButton]',
  standalone: true,
})
export class BackButtonDirective {
  constructor(private navigationService: NavigationService) {}

  @HostListener('click')
  public onClick(): void {
    this.navigationService.back();
  }
}
