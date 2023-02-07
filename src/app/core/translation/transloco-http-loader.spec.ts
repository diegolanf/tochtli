import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TranslocoHttpLoader } from './transloco-http-loader';

describe('TranslocoHttpLoaderService', () => {
  let loader: TranslocoHttpLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    loader = TestBed.inject(TranslocoHttpLoader);
  });

  it('should be created', () => {
    expect(loader).toBeTruthy();
  });
});
