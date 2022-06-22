import styled from 'styled-components'

export const EditBasicInfo = styled.div`
  padding: 1rem 0;
  display: flex;

  ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }

  & .imageBox {
    position: relative;
    flex-shrink: 0;
    width: 256px;
    height: 256px;
    margin-right: 1rem;

    & label,
    & .btn.resetBtn {
      display: inline-flex;
      align-items: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.66);
      color: black;
      padding: 0 6px;
      height: 28px;
      font-size: 12px;
      border-radius: 4px;
      border: 1px solid lightgray;

      & svg {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    }

    & label {
      bottom: 40px;
    }

    & .btn.resetBtn.resetBtn {
      bottom: 5px;
    }

    & .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ${({ theme }) => theme.device.tablet} {
      align-self: center;
      margin-right: 0;
      margin: 1rem;
    }
  }
`

export const EditBasicInfoForm = styled.form`
  flex-shrink: 1;
  width: 100%;
`

export const EditInputBox = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }

  & .label {
    display: block;
    margin-bottom: 0.5rem;

    & .require {
      display: inline;
      color: ${({ theme }) => theme.colors.errorColor};
    }
  }

  & input,
  & textarea {
    border: 1px solid ${({ theme }) => theme.colors.border1};
    border-radius: 4px;
    background-color: inherit;
    color: ${({ theme }) => theme.colors.bgTextRGBA(0.86)};
    width: 100%;
    font-size: 0.85rem;
    padding: 4px 8px;

    &:hover,
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.border2};
    }
  }
  & textarea {
    resize: vertical;
  }
`

export const EditInputPermalink = styled(EditInputBox)`
  & .inputwrap {
    display: flex;
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.bgTextRGBA(0.86)};

    & input {
      padding: 4px 0;
      border: none;
      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.border2};
      }
    }

    & input:focus + .permalinkBtn {
      display: none;
    }

    & .permalinkBtn {
      border: none;
      & svg {
        width: 1rem;
        height: 1rem;
      }
      &:hover {
        color: ${({ theme }) => theme.colors.bgTextRGBA(0.86)};
      }
    }
  }
`

export const EditInputPrivacy = styled(EditInputBox)`
  & input {
    width: auto;
  }
`