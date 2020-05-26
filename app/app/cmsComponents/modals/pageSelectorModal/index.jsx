import React from 'react'
import Modal from '../../abstract/modal'
import Footer from './footer'
import PageNavigator, { API_ROOT as API_ROOT_PAGE_BROWSER } from '../../navigators/pageNavigator'
import { cmsify } from '../../cmsify'
const path = require("path")

const API_ROOT_PAGE = "/api/page/"

function PageSelectorModal(props) {
    //State
    const [navigation, setNavigation] = React.useState("./")
    const [selected, setSelected] = React.useState(null)
    const [externalMostRecentFetch, setExternalMostRecentFetch]
        = React.useState(null)
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
    const onNewPageClick = async () => {
        const requestPath = path.join(
            API_ROOT_PAGE, navigation
        )
        const response = await fetch(
            requestPath,
            { method: "POST" }
        )
        if (!response.ok) {
            alert("Could not create new page.")
        }
        refreshNavigator()
    }
    const onNewFolderClick = async () => {
        const requestPath = path.join(
            API_ROOT_PAGE_BROWSER, navigation
        )
        const response = await fetch(
            requestPath,
            { method: "POST" }
        )
        if (!response.ok) {
            alert("Could not create new page.")
        }
        refreshNavigator()
    }
    return (
        <Modal
            onClickAway={props.onClickAway}
            show={props.show}
            heading={navigation}
            footer={
                <Footer
                    onNewPageClick={() => onNewPageClick()}
                    onNewFolderClick={() => onNewFolderClick()}
                    confirmDisabled={props.selected === null}
                    onConfirm={() => onConfirm()}
                />
            }
        >
            <PageNavigator
                onNavigate={
                    (navigation) => onNavigate(navigation)
                }
                onSelect={
                    (thumbProps) => onSelect(thumbProps)
                }
                canSelect={true}
                canRename={props.canRename}
                canDelete={props.canDelete}
                canDrop={props.canDrop}
                externalMostRecentFetch={externalMostRecentFetch}
            />
        </Modal>
    )
}


export default cmsify(PageSelectorModal)