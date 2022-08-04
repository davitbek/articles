import action from "../../store/action_new";
import {
    ARTICLE,
    ARTICLES,
} from "./actions";
const actionsProcessed = action.processMultiple([
    {
        stateName: 'getArticlesRequest',
        action: ARTICLES,
        endPoint: 'articles',
    },
    {
        stateName: 'getArticleRequest',
        action: ARTICLE,
        single:true,
        endPoint: 'articles/{slug}',
    },
]);

export default actionsProcessed
