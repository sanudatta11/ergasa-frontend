import { ClubAppPage } from './app.po';

describe('club-app App', () => {
  let page: ClubAppPage;

  beforeEach(() => {
    page = new ClubAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
