import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 9999;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 8px;
  height: 81px;
  background-color: ${({ theme }) => theme.colors.bgColor};
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.12')};
  height: 100%;
`

// 음악정보
export const InfoBox = styled.div`
  padding-top: 3px;
  display: inline-block;
  height: 100%;
`

export const InfoArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1em;
    &:last-child {
      margin-right: 0;
    }
  }

  .img-container {
    margin-left: 1em;
    position: relative;
    width: 50px;
    height: 50px;
    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 6px;
      box-shadow: 0 5px 30px 5px rgba(0, 0, 0, 0.3);
    }
  }

  .music-info {
    font-size: 0.8em;

    & .uploader {
      color: ${({ theme }) => theme.colors.bgTextRGBA('0.6')};
    }
    & .title {
      color: ${({ theme }) => theme.colors.bgTextRGBA('0.86')};
    }
    & .title:hover,
    & .uploader:hover {
      color: ${({ theme }) => theme.colors.bgText};
    }
  }
`

export const Btn = styled.button`
  position: relative;
  border: none;
  padding: 0;
  width: 20px;
  height: 20px;
  opacity: 0.6;
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 1;
  }

  & svg {
    width: 100%;
    height: 100%;
  }
`

export const LikeBtn = styled(Btn)<{ isLike: boolean }>`
  color: ${({ isLike, theme }) => isLike && theme.colors.errorColor};
`

export const FollowBtn = styled(Btn)<{ isFollow: boolean }>`
  color: ${({ isFollow, theme }) => isFollow && theme.colors.primaryColor};
`

// 음악 컨트롤러
export const ControllBox = styled.div`
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 150px;
`

export const ControllArea = styled.div`
  margin: 0 auto;
  & .btn {
    padding: 12px;
    border: none;
    height: 50px;
    width: 50px;

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  & .playBtn {
    border-radius: 25px;
    color: ${({ theme }) => theme.colors.primaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.06')};
    }

    & svg {
      transform: translateX(2px);
    }
  }

  & .backwardBtn,
  & .fowardBtn {
    transform: scale(85%);

    &:hover {
      transform: scale(90%);
    }
  }
`

export const SubControllBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px 0;
  padding-right: 1em;
  height: 100%;
  display: flex;
  align-items: center;
`

export const DurationArea = styled.div`
  font-size: 0.75em;
  margin-right: 1em;
  color: ${({ theme }) => theme.colors.bgTextRGBA(0.6)};
  & .currentTime {
    &:after {
      content: '/';
      margin: 0 0.5em;
    }
  }
  & .progressTime {
    color: ${({ theme }) => theme.colors.bgTextRGBA(0.86)};
  }
`

export const VolumeArea = styled.div`
  z-index: 11111;
  position: relative;
  transform: translateY(1px);
  & .volume-controll {
    display: none;
  }
  &:hover .volume-controll {
    display: block;
  }
`

export const VolumeControll = styled.div`
  transform: translate(-50%, -90px);
  position: absolute;
  border-radius: 3px;
  top: -10px;
  left: 50%;
  background-color: ${({ theme }) => theme.colors.bgColor};
  cursor: default;

  & .volume-container {
    border-radius: inherit;
    width: 30px;
    height: 100px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA('0.12')};
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.bgColorRGBA('0.3')};

    & .volume {
      cursor: pointer;
      width: 80px;
      height: 6px;
      transform: rotate(270deg);
    }
  }
`

export const ProgressBox = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16px;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bgColorRGBA(0.16)};
  }

  & .progress {
    position: relative;
    z-index: 10001;
    background-color: ${({ theme }) => theme.colors.primaryColor};
  }

  &::before,
  & .progress {
    height: 3px;
    transition: 0.1s ease all;
  }

  &:hover {
    &::before,
    & .progress {
      height: 100%;
    }

    & ~ .progress-backdrop {
      display: block;
    }

    & .hoverTime,
    & .progress::after {
      cursor: default;
      position: absolute;
      bottom: 0;
      font-size: 0.8em;
      transform: translateY(1.5em);
    }

    & .progress::after {
      right: 0;
      content: attr(data-current);
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }
`

export const ProgressBackDrop = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.33);
  cursor: default;
  transition: 0.1s ease all;
  display: none;
`