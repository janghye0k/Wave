import styled from 'styled-components'

// App Wrapper
export const AppWrapper = styled.div<{ fold: boolean }>`
  max-width: 1920px;
  margin: 0 auto;

  & .app-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background-color: #121212;
    opacity: 0.6;
    display: none;
  }

  ${({ theme }) => theme.device.desktop} {
    & .app-backdrop {
      display: ${({ fold }) => !fold && 'block'};
    }
  }
`

// App Header
const headerWidth = ['225px', '75px']
const getHeaderWidth = (fold: boolean) => {
  return !fold ? headerWidth[0] : headerWidth[1]
}

export const AppHeader = styled.header<{ fold: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: 0.3s ease width;
  padding: 24px 0;
  width: ${({ fold }) => getHeaderWidth(fold)};
  border-right: 1px solid ${({ theme }) => theme.colors.border1};
  background-color: ${({ theme }) => theme.colors.bgColor};

  & .header-top,
  & .header-nav ul {
    padding: ${({ fold }) => (!fold ? '0 24px' : '0 12px')};
  }
  & .header-top {
    height: 200px;
  }
  & .header-nav {
    height: calc(100% - 200px);
    overflow-y: auto;
  }
  & .header-nav::-webkit-scrollbar {
    width: 5px;
    border-radius: 2.5px;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.06')};
  }
  & .header-nav::-webkit-scrollbar-thumb {
    border-radius: 2.5px;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.16')};
  }

  & .header-logo {
    margin-top: 30px;
    margin-bottom: 45px;
    visibility: ${({ fold }) => (fold ? 'hidden' : 'visible')};
  }
  & .header-fold,
  & .menuItem-link {
    justify-content: ${({ fold }) => fold && 'center'};
  }
`

export const FoldMenuArea = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: right;
  & .header-foldBtn {
    padding: 0;
    border: none;
  }
  & .header-foldBtn svg {
    font-size: 24px;
  }
`

export const MenuItem = styled.li<{ active: boolean }>`
  margin-bottom: 0.5rem;
  min-width: 50px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme, active }) =>
    active ? theme.colors.primaryColor : theme.colors.bgText};
  padding: 0 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primaryColor : theme.colors.bgTextRGBA('0.86')};
  }
  &:last-child {
    margin-bottom: 0;
  }

  & .menuItem-link {
    height: 100%;
    display: flex;
    align-items: center;
  }
  & .menuItem-link svg {
    font-size: 20px;
    min-width: 20px;
  }
  & .menuItem-name {
    margin-left: 0.5rem;
  }
`

const floatBoxHeight = '72px'

// App Container
export const AppContainer = styled.div<{ fold: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 600px;
  overflow-y: auto;
  transition: padding-left 0.3s ease;
  padding-left: ${({ fold }) => getHeaderWidth(fold)};
  background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.12')};
  padding-top: ${floatBoxHeight};

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.06')};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.38')};
  }

  /* media 1200px */
  ${({ theme }) => theme.device.desktop} {
    padding-left: ${headerWidth[1]};
  }
`

export const FloatBox = styled.div<{ fold: boolean }>`
  height: ${floatBoxHeight};
  z-index: 48;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-left: ${({ fold }) => getHeaderWidth(fold)};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease padding-left;

  & .float-logo {
    position: absolute;
    left: ${({ fold }) => getHeaderWidth(fold)};
    transform: scale(75%);
    display: ${({ fold }) => (!fold ? 'none' : 'bloack')};
  }

  & .float-search {
    z-index: 49;
    margin: 0 16px;
  }

  /* media 1200px */
  ${({ theme }) => theme.device.desktop} {
    padding-left: ${headerWidth[1]};
  }

  ${({ theme }) => theme.device.tablet} {
    justify-content: right;
  }
`

export const MainContent = styled.main`
  height: calc(100% - ${floatBoxHeight});
  padding: 3rem;
`
