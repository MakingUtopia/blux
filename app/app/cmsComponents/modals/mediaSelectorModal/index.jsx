import React from 'react'
import Modal from '../../abstract/modal'
import Footer from './footer'
import MediaNavigator, { API_ROOT } from '../../navigators/mediaNavigator'
import { cmsify } from '../../cmsify'
const path = require("path")
import './styles.css'

function _MediaSelectorModal(props) {
    //State
    const [navigation, setNavigation] = React.useState("./")
    const [selected, setSelected] = React.useState(null)
    const [externalMostRecentFetch, setExternalMostRecentFetch]
        = React.useState(null)
    const fileInputRef = React.createRef(fileInputRef)
    //Functions 
    const refreshNavigator = () => {
        setExternalMostRecentFetch(Date.now())
    }
    //Navigator Events
    const onNavigate = (navigation) => {
        setNavigation(navigation)
    }
    const onSelect = (thumbProps) => {
        setSelected(thumbProps)
    }
    //Modal Events
    const onConfirm = () => {
        if (props.onConfirm)
            props.onConfirm(selected, navigation)
    }
    const onUploadFileClick = async () => {
        fileInputRef.current.click()
    }
    const onUploadFileConfirm = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("media", file)
        const uploadPath = path.join(
            API_ROOT, navigation, file.name
        )
        const response = await fetch(
            uploadPath, 
            {
                method: "POST",
                credentials: "same-origin",
                body: formData
            }
        )
        if (!response.ok) {
            alert("Could not upload file.")
        }
        refreshNavigator()
    }
    const onCreateNewFolderClick = async () => {
        const requestPath = path.join(
            API_ROOT, navigation
        )
        const response = await fetch(
            requestPath, 
            { method: "POST", credentials: "same-origin" }
        )
        if (!response.ok) {
            alert("Could not create new folder.")
        }
        refreshNavigator()
    }
    //
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={navigation}
            footer={
                <Footer
                    onUploadFileClick={() => onUploadFileClick()}
                    onCreateNewFolderClick={() => onCreateNewFolderClick()}
                    confirmDisabled={props.selected === null}
                    onConfirm={() => onConfirm()}
                />
            }
        >
            <MediaNavigator 
                onNavigate={
                    (navigation) => onNavigate(navigation)
                }
                onSelect={
                    (thumbProps) => onSelect(thumbProps)
                }
                mediaFilter={props.mediaFilter}
                canSelect={props.canSelect || true}
                canRename={props.canRename}
                canDelete={props.canDelete}
                canDrop={props.canDrop}
                externalMostRecentFetch={externalMostRecentFetch}
            />
            <input
                ref={fileInputRef}
                type="file"
                className="blux-media-selector-modal__file-input"
                onChange={(e) => onUploadFileConfirm(e)}
            />
        </Modal>
    )
}

const MediaSelectorModal = cmsify(_MediaSelectorModal)
export default MediaSelectorModal