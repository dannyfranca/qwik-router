import { getHistory, getWindow } from './get-window';

describe(getWindow.name, () => {
  it('Does return the window', async () => {
    expect(getWindow()).toBeDefined();
  });
});

describe(getHistory.name, () => {
  it('Does return the history', async () => {
    expect(getHistory()).toBeDefined();
  });
});
