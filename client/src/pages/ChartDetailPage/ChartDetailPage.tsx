import { IMusic } from '@appTypes/music.type'
import Loading from '@components/Loading/Loading'
import PlaylistMusics from '@pages/PlaylistPage/PlaylistMusics/PlaylistMusics'
import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChartDetailHead from './ChartDetailHead/ChartDetailHead'
import * as S from './ChartDetailPage.style'
import { IoPerson } from 'react-icons/io5'
import { IUser } from '@appTypes/user.type'
import { EmptyProfileImage } from '@styles/EmptyImage'
import { IoMdPeople } from 'react-icons/io'
import { BsSoundwave } from 'react-icons/bs'
import { FollowTextButton } from '@components/Common/Button'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { userToggleFollow } from '@redux/thunks/userThunks'
import { useLoginOpen } from '@redux/context/loginProvider'

interface IChartDetailPagePrpps {
  getMusics: (...args: any[]) => any
  title: string
  description: string
  genre?: string
}

const ChartDetailPage = ({
  title,
  description,
  genre,
  getMusics,
}: IChartDetailPagePrpps) => {
  const { search } = useLocation()
  const dispatch = useAppDispatch()
  const openLogin = useLoginOpen()

  const following = useAppSelector(
    (state) => state.user.userData?.following || []
  )
  const myId = useAppSelector((state) => state.user.userData?.id)

  const sideRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(true)
  const [musics, setMusics] = useState<IMusic[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [date, setDate] = useState('week')

  const handleClickFollow = useCallback(
    (userId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!myId) {
        openLogin()
        return
      }

      event.preventDefault()
      dispatch(userToggleFollow(userId)).then((value) => {
        if (value.type.indexOf('fulfilled') !== -1) {
          const { type } = value.payload
          setUsers((state) =>
            state.map((user) => {
              if (user.id === userId) {
                const add = type === 'follow' ? 1 : -1
                return { ...user, followersCount: user.followersCount + add }
              } else {
                return user
              }
            })
          )
        }
      })
    },
    [dispatch, myId, openLogin]
  )

  const getChartMusics = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getMusics(genre, date)
      const getItems = response?.data || []
      setMusics(getItems)
    } catch (error) {
      console.error(error)
      setMusics([])
    } finally {
      setLoading(false)
    }
  }, [getMusics, genre, date])

  const resizeSideContent = useCallback(() => {
    if (sideRef.current) {
      const docH = document.body.offsetHeight
      const sideH = sideRef.current.getBoundingClientRect().height
      const calcH = Math.floor(docH - sideH - 101)

      console.log(docH, sideH)
      sideRef.current.style.top = `${calcH < 81 ? calcH : 80}px`
    }
  }, [])

  useEffect(() => {
    resizeSideContent()
    window.addEventListener('resize', resizeSideContent)
    return () => {
      window.removeEventListener('resize', resizeSideContent)
    }
  }, [resizeSideContent])

  useLayoutEffect(() => {
    getChartMusics()
  }, [getChartMusics])

  useLayoutEffect(() => {
    if (!search) {
      setDate('week')
    } else {
      const newDate = search.replace('?date=', '')
      if (newDate === 'month') {
        setDate('month')
      } else {
        const num = Number(newDate)
        if (num < 8 && num > 0) {
          setDate(`${num}`)
        } else {
          setDate('week')
        }
      }
    }
  }, [search])

  useLayoutEffect(() => {
    if (musics.length) {
      const arr: IUser[] = []
      musics.forEach((music) => {
        const { user } = music
        if (arr.findIndex((u) => u.id === user.id) === -1) {
          arr.push(user)
        }
      })
      setUsers(arr)
    }
  }, [musics])

  return loading ? (
    <Loading />
  ) : !loading && musics.length ? (
    <>
      <S.Wrapper>
        <ChartDetailHead {...{ musics, title }} />
        <S.Container>
          <div className="main">
            <PlaylistMusics musics={musics} />
          </div>
          <S.SideContent ref={sideRef}>
            <div className="side-description">{description}</div>
            <S.BoxTitle>
              <IoPerson className="icon repost" />
              <div className="text">Artists featured</div>
            </S.BoxTitle>
            <S.StyledDivider />
            <ul className="side-userBox">
              {users.map((user, index) => (
                <S.UserItem key={index}>
                  <div className="userItem-profileImage">
                    <Link className="link" to={`/profile/${user.id}`}>
                      {user.profileImage ? (
                        <img className="img" src={user.profileImage} alt="" />
                      ) : (
                        <EmptyProfileImage className="img" />
                      )}
                    </Link>
                  </div>
                  <div className="userItem-info">
                    <div className="name">
                      <Link to={`/profile/${user.id}`}>
                        {user.nickname || user.username}
                      </Link>
                    </div>
                    <div className="countGroup">
                      <Link
                        to={`/profile/${user.id}/followers`}
                        className="followers"
                        title={`${user.followersCount} followers`}
                      >
                        <IoMdPeople className="icon" />
                        {user.followersCount}
                      </Link>
                      <Link
                        to={`/profile/${user.id}/tracks`}
                        className="tracks"
                        title={`${user.musicsCount} tracks`}
                      >
                        <BsSoundwave className="icon" />
                        {user.musicsCount}
                      </Link>
                    </div>
                  </div>
                  <FollowTextButton
                    className="userItem-button"
                    isFollow={
                      following.findIndex((f) => f.id === user.id) !== -1
                    }
                    onClick={handleClickFollow(user.id)}
                  />
                </S.UserItem>
              ))}
            </ul>
          </S.SideContent>
        </S.Container>
      </S.Wrapper>
    </>
  ) : (
    <S.Error>
      <h1 className="notfound">Opps...</h1>
      Sorry... Something wrong
      <br />
      Failed to get tracks.
    </S.Error>
  )
}

export default ChartDetailPage