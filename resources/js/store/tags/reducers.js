import action from "../../store/action";
import {
    TAG,
} from "./actions";

const actionsProcessed = action.processMultiple([
    {
        stateName: 'getTagRequest',
        action: TAG,
        single:true,
        endPoint: 'tags/{slug}',
    },
]);

export default actionsProcessed
