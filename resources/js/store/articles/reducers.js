import action from "../../store/action_new";
import {
    ARTICLES,
} from "./actions";
const actionsProcessed = action.processMultiple([
    {
        stateName: 'getArticlesRequest',
        action: ARTICLES,
        endPoint: 'articles',
    },
]);

export default actionsProcessed
