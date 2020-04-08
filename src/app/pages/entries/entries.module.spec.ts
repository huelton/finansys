import { EntriesModule } from './entries.module';

describe('EntriesModule', () => {
  let entriesModule: EntriesModule;

  beforeEach(() => {
    entriesModule = new EntriesModule();
  });

  it('should create an instance', () => {
    expect(entriesModule).toBeTruthy();
  });
});
