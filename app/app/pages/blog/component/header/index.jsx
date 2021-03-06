import React from 'react'
import AutoGrowTextArea from '../../../../cmsComponents/abstract/autoGrowTextarea'
import './styles.css'
import { isCMS } from '../../../../misc'

export default function BlogHeader(props) {
    //Getters
    const getPublishedStr = () => {
        const publishedDate = new Date(props.publishedDate)
        const publishedStr = publishedDate.toDateString()
        return publishedStr
    }
    const getModifiedStr = () => {
        const modifiedDate = new Date(props.modifiedDate)
        const modifiedStr = modifiedDate.toDateString()
        return modifiedStr
    }
    //Events
    const onTitleChange = (value) => {
        const newTitle = value
        props.onTitleChange(newTitle)
    }
    //
    return (
        <div className="blux-blog-header">
            <div className="container">
                <h1 className="blux-blog-header__title">
                    {
                        isCMS() ?
                            <AutoGrowTextArea
                                className="blux-blog-header__title-textbox"
                                onChange={(e) => onTitleChange(e.target.value)}
                            >
                                {props.title}
                            </AutoGrowTextArea> :
                            props.title
                    }
                </h1>
                <div className="row blux-blog-header__date-details">
                    <div className="col-sm-6 blux-blog-header__published-col">
                        {
                            props.isDraft ?
                                <span className="blux-blog-header__draft">
                                    Draft
                                </span> :
                                <span className="blux-blog-header__published">
                                    {`Published - ${getPublishedStr()}`}
                                </span>
                        }
                    </div>
                    <div className="col-sm-6 blux-blog-header__modified-col">
                        <span className="blux-blog-header__modified">
                            {`Edited - ${getModifiedStr()}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}