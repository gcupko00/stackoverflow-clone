import { StackoverflowClonePage } from './app.po';

describe('stackoverflow-clone App', function() {
  let page: StackoverflowClonePage;

  beforeEach(() => {
    page = new StackoverflowClonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
