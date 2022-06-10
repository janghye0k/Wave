import { PrimaryButton } from '@components/Common/Button'
import styled from 'styled-components'
import InteractionBar from '@components/InteractionBar/InteractionBar'

export const Container = styled.div`
  padding: 10px 0;
  display: flex;

  & .musicCard-imageBox {
    width: 160px;
    height: 160px;
    margin-right: 10px;

    & .musicCard-imageBox-link,
    & .musicCard-imageBox-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .musicCard-imageBox {
    flex-shrink: 0;
  }

  & .musicCard-infoBox {
    height: 160px;
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;
  }

  ${({ theme }) => theme.device.tablet} {
    & .musicCard-imageBox {
      width: 120px;
      height: 120px;
    }

    & .musicCard-infoBox {
      height: 120px;
    }
  }
`

export const PlayBtn = styled(PrimaryButton)`
  font-size: 20px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;

  & .icon.play {
    transform: translateX(2px);
  }
`

export const MusicInfo = styled.div`
  min-width: 0;
  width: 100%;
  & .musicCard-infoBox-play {
    float: left;

    &::after {
      content: '';
      display: inline-block;
      clear: both;
    }
  }

  & .musicCard-infoBox-info {
    width: 100%;
    & .musicCard-uploader {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.bgTextRGBA(0.6)};

      & a:hover {
        color: ${({ theme }) => theme.colors.bgText};
      }
    }

    & .musicCard-title {
      font-size: 16px;
    }

    & .musicCard-title,
    & .musicCard-uploader {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  & .musicCard-createdAt {
    float: right;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.bgTextRGBA(0.6)};

    &::after {
      content: '';
      display: inline-block;
      clear: both;
    }

    @media screen and (max-width: 600px) {
      display: none;
    }
  }
`

export const StyledInteractionBar = styled(InteractionBar)`
  min-width: 0;
  width: 100%;
  flex-shrink: 0;

  @media screen and (max-width: 700px) {
    & .interactionCount {
      display: none;
    }
  }
`
