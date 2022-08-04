import action from "../../store/action";
import {
    ARTICLE_COMMENTS, STORE_ARTICLE_COMMENTS,ARTICLE_COMMENTS_ADDED
} from "./actions";

const actionsProcessed = action.processMultiple([
    {
        stateName: 'getArticleCommentsRequest',
        action: ARTICLE_COMMENTS,
        paginate:true,
        endPoint: 'articles/{slug}/comments',
    },
    {
        stateName: 'storeArticleCommentsRequest',
        action: STORE_ARTICLE_COMMENTS,
        method:'post',
        endPoint: 'articles/{slug}/comments',
    },
]);

actionsProcessed.mutations = {
    ...actionsProcessed.mutations,
    [ARTICLE_COMMENTS_ADDED](state, data) {

        let list = state.getArticleCommentsRequest.data.data;
        list.unshift(data);
        state.getArticleCommentsRequest.data.data = [...list];
    },
}

export default actionsProcessed
