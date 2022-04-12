import React, { useCallback, useEffect, useState, useRef } from 'react'
import * as S from './EditMusic.style'
import * as mmb from 'music-metadata-browser'
import { ICommonTagsResult } from 'music-metadata/lib/type'
import axios from 'axios'
import EditHead from './EditHead/EditHead'
import EditBasicInfo, {
  IEditBasicInfoHandler,
} from './EditBasicInfo/EditBasicInfo'
import EditMetadata, { IEditMetadataHandler } from './EditMetadata/EditMetadata'

interface EditMusicProps {
  files?: FileList
}

export interface IMusicMetadata extends ICommonTagsResult {
  duration?: number
}

const EditMusic = ({ files }: EditMusicProps) => {
  const editNavItems = ['Basic Info', 'Metadata']

  const editBasicInfoRef = useRef<IEditBasicInfoHandler>(null)
  const editMetadataRef = useRef<IEditMetadataHandler>(null)

  const [editNavIndex, setEditNavIndex] = useState(0)
  const [musicMetadata, setMusicMetadata] = useState<
    IMusicMetadata | undefined
  >()

  const uploadFile = useCallback(() => {
    if (!files) {
      return
    }

    const formData = new FormData()
    formData.append('file', files[0])

    axios
      .post('/api/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error))
  }, [files])

  const handleGetData = useCallback(() => {
    const basicInfoData = editBasicInfoRef.current?.getData()
    console.log('basicInfoData', basicInfoData)
    if (!basicInfoData) {
      setEditNavIndex(0)
    }
    const metadataData = editMetadataRef.current?.getData()
    console.log('metadataData', metadataData)
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 표준에 따라 기본 동작 방지
      event.preventDefault()
      // Chrome에서는 returnValue 설정이 필요함
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (files?.length) {
      mmb
        .parseBlob(files[0], {
          duration: true,
        })
        .then((metadata) => {
          const newMetadata = {
            ...metadata.common,
            duration: metadata.format.duration,
          }
          setMusicMetadata(newMetadata)
        })
        .catch((err) => console.log(err))
    }
  }, [files])

  return (
    <>
      <S.Container>
        <EditHead files={files} />
        <S.EditMain className="editMain">
          <S.EditNav className="editNav">
            {editNavItems.map((item, index) => (
              <S.EditNavItem
                key={item}
                className="editNav-item"
                onClick={() => setEditNavIndex(index)}
                select={editNavIndex === index}
              >
                {item}
              </S.EditNavItem>
            ))}
          </S.EditNav>
          <EditBasicInfo
            metadata={musicMetadata}
            ref={editBasicInfoRef}
            style={{ display: editNavIndex === 0 ? 'flex' : 'none' }}
          />
          <EditMetadata
            metadata={musicMetadata}
            ref={editMetadataRef}
            style={{ display: editNavIndex === 1 ? 'block' : 'none' }}
          />
          <div>
            <button onClick={handleGetData}>Cancel</button>
            <button onClick={uploadFile}>Save</button>
          </div>
        </S.EditMain>
      </S.Container>
    </>
  )
}

export default EditMusic