import { removeLeadingSlash } from './string-utils';

const testString = 'Test string';
const testStringWithSlashes = `/${testString}/`;

describe('removeLeadingSlash', () => {
  it('should remove leading slash', () => {
    expect(removeLeadingSlash(testStringWithSlashes)).toBe('Test string/');
  });

  it('should return unmodified string if no leading slash is present', () => {
    expect(removeLeadingSlash(testString)).toBe(testString);
  });
});
