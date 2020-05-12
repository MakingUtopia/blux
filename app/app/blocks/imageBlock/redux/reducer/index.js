import IMAGE_BLOCK_ACTION_TYPES from "../actionTypes"
import { newBlockInitialState } from "../../../../block/redux/reducer"

export const newImageBlockInitialState = () => ({
    ...newBlockInitialState("image"),
    src: null,
    alt: null
})

export default function ImageBlockReducer(
    state, action
) {
    switch (action.type) {
        case IMAGE_BLOCK_ACTION_TYPES.UPDATE_SRC:
            const { newSrc } = action.payload
            return {
                ...state,
                src: newSrc
            }
        case IMAGE_BLOCK_ACTION_TYPES.UPDATE_ALT:
            const { newAlt } = action.payload
            return {
                ...state,
                alt: newAlt
            }
        default:
            return state
    }
}