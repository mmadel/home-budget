import { HomeBudgetPage } from './app.po';

describe('home-budget App', function() {
  let page: HomeBudgetPage;

  beforeEach(() => {
    page = new HomeBudgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
